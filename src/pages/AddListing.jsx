import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { createClient } from '@supabase/supabase-js'
import { 
  Building2, MapPin, Phone, Mail, Globe, Clock, 
  Upload, CheckCircle, AlertCircle, Map
} from 'lucide-react'

// Initialize Supabase client - using fallback for development
const supabaseUrl = import.meta.env?.VITE_SUPABASE_URL || window.ENV?.REACT_APP_SUPABASE_URL || 'YOUR_SUPABASE_URL'
const supabaseKey = import.meta.env?.VITE_SUPABASE_ANON_KEY || window.ENV?.REACT_APP_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY'

// Only initialize Supabase if we have valid credentials
let supabase = null
if (supabaseUrl !== 'YOUR_SUPABASE_URL' && supabaseKey !== 'YOUR_SUPABASE_ANON_KEY') {
  supabase = createClient(supabaseUrl, supabaseKey)
}

// Google Maps API key - using fallback for development
const GOOGLE_MAPS_API_KEY = import.meta.env?.VITE_GOOGLE_MAPS_API_KEY || window.ENV?.REACT_APP_GOOGLE_MAPS_API_KEY || null

const AddListing = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({})
  const [mapCenter, setMapCenter] = useState({ lat: 6.3106, lng: -10.8047 }) // Monrovia coordinates
  const [selectedLocation, setSelectedLocation] = useState(null)
  const [map, setMap] = useState(null)
  const [geocoder, setGeocoder] = useState(null)
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset
  } = useForm()

  const categories = [
    "Technology", "Agriculture", "Healthcare", "Education", 
    "Finance", "Manufacturing", "Tourism", "Transportation",
    "Retail", "Food & Beverage", "Construction", "Media",
    "Real Estate", "Legal Services", "Consulting", "Other"
  ]

  const locations = [
    "Monrovia", "Gbarnga", "Ganta", "Kakata", "Buchanan",
    "Zwedru", "Voinjama", "Harper", "Robertsport", "Sanniquellie"
  ]

  const workingDays = [
    { key: 'monday', label: 'Monday' },
    { key: 'tuesday', label: 'Tuesday' },
    { key: 'wednesday', label: 'Wednesday' },
    { key: 'thursday', label: 'Thursday' },
    { key: 'friday', label: 'Friday' },
    { key: 'saturday', label: 'Saturday' },
    { key: 'sunday', label: 'Sunday' }
  ]

  // Initialize Google Maps
  useEffect(() => {
    if (!window.google && GOOGLE_MAPS_API_KEY) {
      const script = document.createElement('script')
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places,geometry`
      script.async = true
      script.defer = true
      script.onload = initMap
      document.head.appendChild(script)
    } else if (window.google) {
      initMap()
    }
  }, [currentStep])

  const initMap = () => {
    if (currentStep === 2 && window.google) {
      const mapElement = document.getElementById('map')
      if (mapElement) {
        const newMap = new window.google.maps.Map(mapElement, {
          center: mapCenter,
          zoom: 12,
          mapTypeControl: false,
          streetViewControl: false,
        })

        const newGeocoder = new window.google.maps.Geocoder()
        setGeocoder(newGeocoder)

        // Add click listener to map
        newMap.addListener('click', (event) => {
          const lat = event.latLng.lat()
          const lng = event.latLng.lng()
          
          // Clear previous markers
          if (window.currentMarker) {
            window.currentMarker.setMap(null)
          }

          // Add new marker
          const marker = new window.google.maps.Marker({
            position: { lat, lng },
            map: newMap,
            title: 'Selected Location'
          })

          window.currentMarker = marker
          setSelectedLocation({ lat, lng })

          // Reverse geocode to get address
          newGeocoder.geocode({ location: { lat, lng } }, (results, status) => {
            if (status === 'OK' && results[0]) {
              setValue('address', results[0].formatted_address)
            }
          })
        })

        setMap(newMap)
      }
    }
  }

  // Upload file to Supabase Storage
  const uploadFile = async (file) => {
    if (!supabase) {
      console.warn('Supabase not initialized. File upload skipped.')
      return null
    }

    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random()}.${fileExt}`
    const filePath = `logos/${fileName}`

    const { data, error } = await supabase.storage
      .from('business-assets')
      .upload(filePath, file)

    if (error) {
      throw error
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('business-assets')
      .getPublicUrl(filePath)

    return publicUrl
  }

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    
    try {
      // Store form data for next step
      const updatedFormData = { ...formData, ...data }
      
      if (selectedLocation) {
        updatedFormData.coordinates = selectedLocation
      }

      setFormData(updatedFormData)
      
      if (currentStep < 3) {
        setCurrentStep(currentStep + 1)
        toast.success('Information saved! Please continue to the next step.')
      } else {
        // Final submission to Supabase
        let logoUrl = null
        
        // Upload logo if provided and Supabase is available
        if (data.logo && data.logo instanceof File) {
          try {
            logoUrl = await uploadFile(data.logo)
          } catch (error) {
            console.error('Logo upload failed:', error)
            toast.error('Failed to upload logo, but listing will be saved without it.')
          }
        }

        // Prepare business hours data
        const businessHours = {}
        workingDays.forEach(day => {
          const openTime = updatedFormData.hours?.[day.key]?.open
          const closeTime = updatedFormData.hours?.[day.key]?.close
          if (openTime && closeTime) {
            businessHours[day.key] = {
              open: openTime,
              close: closeTime,
              isOpen: true
            }
          } else {
            businessHours[day.key] = {
              isOpen: false
            }
          }
        })

        // Insert into Supabase if available, otherwise simulate success
        if (supabase) {
          const { data: insertData, error } = await supabase
            .from('business_listings')
            .insert([
              {
                business_name: updatedFormData.businessName,
                category: updatedFormData.category,
                description: updatedFormData.description,
                phone: updatedFormData.phone,
                email: updatedFormData.email,
                website: updatedFormData.website || null,
                location: updatedFormData.location,
                address: updatedFormData.address,
                coordinates: selectedLocation,
                business_hours: businessHours,
                services: updatedFormData.services || null,
                notes: updatedFormData.notes || null,
                logo_url: logoUrl,
                status: 'pending', // Will be reviewed
                created_at: new Date().toISOString()
              }
            ])

          if (error) {
            throw error
          }
        } else {
          // Simulate successful submission for development
          console.log('Demo mode - would save:', {
            business_name: updatedFormData.businessName,
            category: updatedFormData.category,
            description: updatedFormData.description,
            phone: updatedFormData.phone,
            email: updatedFormData.email,
            website: updatedFormData.website || null,
            location: updatedFormData.location,
            address: updatedFormData.address,
            coordinates: selectedLocation,
            business_hours: businessHours,
            services: updatedFormData.services || null,
            notes: updatedFormData.notes || null,
            logo_url: logoUrl
          })
        }

        toast.success('Your business listing has been submitted successfully! We will review it within 24-48 hours and notify you via email.')
        reset()
        setCurrentStep(1)
        setFormData({})
        setSelectedLocation(null)
        if (window.currentMarker) {
          window.currentMarker.setMap(null)
        }
      }
    } catch (error) {
      console.error('Submission error:', error)
      toast.error('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error('File size must be less than 5MB')
        return
      }
      setValue('logo', file)
      toast.success('Logo uploaded successfully!')
    }
  }

  const handleLocationSelect = (location) => {
    if (geocoder && map) {
      geocoder.geocode({ address: location + ', Liberia' }, (results, status) => {
        if (status === 'OK' && results[0]) {
          const location = results[0].geometry.location
          map.setCenter(location)
          map.setZoom(13)
          
          // Clear previous markers
          if (window.currentMarker) {
            window.currentMarker.setMap(null)
          }

          // Add marker for the selected city
          const marker = new window.google.maps.Marker({
            position: location,
            map: map,
            title: results[0].formatted_address
          })

          window.currentMarker = marker
          setSelectedLocation({ 
            lat: location.lat(), 
            lng: location.lng() 
          })
          setValue('address', results[0].formatted_address)
        }
      })
    }
  }

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3].map((step) => (
        <div key={step} className="flex items-center">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
            currentStep >= step 
              ? 'border-primary bg-primary text-white' 
              : 'border-gray-300 text-gray-500'
          }`}>
            {currentStep > step ? (
              <CheckCircle className="w-6 h-6" />
            ) : (
              step
            )}
          </div>
          {step < 3 && (
            <div className={`w-16 h-1 mx-2 ${
              currentStep > step ? 'bg-primary' : 'bg-gray-300'
            }`} />
          )}
        </div>
      ))}
    </div>
  )

  const renderStep1 = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-primary mb-4">Basic Information</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Business Name *
          </label>
          <input
            type="text"
            {...register('businessName', { required: 'Business name is required' })}
            className="input-field"
            placeholder="Enter your business name"
          />
          {errors.businessName && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.businessName.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category *
          </label>
          <select
            {...register('category', { required: 'Category is required' })}
            className="input-field"
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.category.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Business Description *
          </label>
          <textarea
            {...register('description', { 
              required: 'Description is required',
              minLength: { value: 50, message: 'Description must be at least 50 characters' }
            })}
            rows={4}
            className="input-field"
            placeholder="Describe your business, services, and what makes you unique..."
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.description.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Business Logo
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600 mb-2">
              Upload your business logo (optional)
            </p>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
              id="logo-upload"
            />
            <label
              htmlFor="logo-upload"
              className="btn-outline cursor-pointer"
            >
              Choose File
            </label>
            <p className="text-xs text-gray-500 mt-2">
              PNG, JPG up to 5MB
            </p>
          </div>
        </div>
      </div>
    </div>
  )

  const renderStep2 = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-primary mb-4">Contact & Location</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            {...register('phone', { required: 'Phone number is required' })}
            className="input-field"
            placeholder="+231 XXX XXX XXX"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.phone.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            {...register('email', { 
              required: 'Email is required',
              pattern: { 
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              }
            })}
            className="input-field"
            placeholder="your@email.com"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Website (optional)
          </label>
          <input
            type="url"
            {...register('website')}
            className="input-field"
            placeholder="https://yourwebsite.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            City/Location *
          </label>
          <select
            {...register('location', { required: 'Location is required' })}
            className="input-field"
            onChange={(e) => {
              handleLocationSelect(e.target.value)
            }}
          >
            <option value="">Select a location</option>
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
          {errors.location && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.location.message}
            </p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Address *
          </label>
          <input
            type="text"
            {...register('address', { required: 'Address is required' })}
            className="input-field"
            placeholder="Street address, city, postal code"
          />
          {errors.address && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.address.message}
            </p>
          )}
        </div>

        {/* Google Maps Integration */}
        {GOOGLE_MAPS_API_KEY && (
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Map className="w-4 h-4 inline mr-1" />
              Select Your Exact Location (Optional)
            </label>
            <div className="border rounded-lg overflow-hidden">
              <div 
                id="map" 
                style={{ height: '300px', width: '100%' }}
                className="bg-gray-100"
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Click on the map to pinpoint your exact business location. This helps customers find you more easily.
            </p>
            {selectedLocation && (
              <p className="text-sm text-green-600 mt-2 flex items-center">
                <CheckCircle className="w-4 h-4 mr-1" />
                Location selected: {selectedLocation.lat.toFixed(6)}, {selectedLocation.lng.toFixed(6)}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )

  const renderStep3 = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-primary mb-4">Business Hours & Services</h3>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-4">
            Business Hours
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {workingDays.map((day) => (
              <div key={day.key} className="flex items-center space-x-3">
                <div className="w-20 text-sm font-medium text-gray-700">
                  {day.label}
                </div>
                <select
                  {...register(`hours.${day.key}.open`)}
                  className="input-field flex-1"
                >
                  <option value="">Closed</option>
                  {Array.from({ length: 24 }, (_, i) => {
                    const hour = i === 0 ? 12 : i > 12 ? i - 12 : i
                    const ampm = i >= 12 ? 'PM' : 'AM'
                    return (
                      <option key={i} value={`${i.toString().padStart(2, '0')}:00`}>
                        {hour}:00 {ampm}
                      </option>
                    )
                  })}
                </select>
                <span className="text-gray-500">to</span>
                <select
                  {...register(`hours.${day.key}.close`)}
                  className="input-field flex-1"
                >
                  <option value="">Closed</option>
                  {Array.from({ length: 24 }, (_, i) => {
                    const hour = i === 0 ? 12 : i > 12 ? i - 12 : i
                    const ampm = i >= 12 ? 'PM' : 'AM'
                    return (
                      <option key={i} value={`${i.toString().padStart(2, '0')}:00`}>
                        {hour}:00 {ampm}
                      </option>
                    )
                  })}
                </select>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Services Offered (optional)
          </label>
          <textarea
            {...register('services')}
            rows={3}
            className="input-field"
            placeholder="List your main services, one per line..."
          />
          <p className="text-xs text-gray-500 mt-1">
            Enter each service on a new line
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Additional Notes (optional)
          </label>
          <textarea
            {...register('notes')}
            rows={3}
            className="input-field"
            placeholder="Any additional information about your business..."
          />
        </div>
      </div>
    </div>
  )

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return 'Basic Information'
      case 2: return 'Contact & Location'
      case 3: return 'Business Hours & Services'
      default: return 'Add Your Business'
    }
  }

  const getStepDescription = () => {
    switch (currentStep) {
      case 1: return 'Tell us about your business and what you do'
      case 2: return 'How can customers reach you and where are you located?'
      case 3: return 'When are you open and what services do you offer?'
      default: return 'Get your business listed on RiseList'
    }
  }

  return (
    <>
      <Helmet>
        <title>Add Your Business - RiseList</title>
        <meta name="description" content="List your business on RiseList and connect with customers across Liberia. Simple, fast, and free business listing." />
      </Helmet>

      <div className="min-h-screen bg-light py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-primary font-lato mb-4">
              Add Your Business to RiseList
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get discovered by customers across Liberia. It only takes a few minutes to list your business.
            </p>
          </div>

          {/* Step Indicator */}
          {renderStepIndicator()}

          {/* Form */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-primary mb-2">
                {getStepTitle()}
              </h2>
              <p className="text-gray-600">{getStepDescription()}</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {currentStep === 1 && renderStep1()}
              {currentStep === 2 && renderStep2()}
              {currentStep === 3 && renderStep3()}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6 border-t border-gray-200">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="btn-outline"
                  >
                    Previous
                  </button>
                )}
                
                <div className="ml-auto">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Processing...</span>
                      </div>
                    ) : currentStep === 3 ? (
                      'Submit Listing'
                    ) : (
                      'Continue'
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Info Box */}
          <div className="mt-8 bg-primary/5 border border-primary/20 rounded-xl p-6">
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-6 h-6 text-primary mt-1" />
              <div>
                <h3 className="font-semibold text-primary mb-2">What happens next?</h3>
                <ul className="text-gray-700 space-y-1 text-sm">
                  <li>• We'll review your submission within 24-48 hours</li>
                  <li>• You'll receive an email confirmation once approved</li>
                  <li>• Your business will appear in our directory</li>
                  <li>• You can update your information anytime</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddListing