import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { 
  Building2, MapPin, Phone, Mail, Globe, Clock, 
  Upload, CheckCircle, AlertCircle 
} from 'lucide-react'

const AddListing = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({})
  
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

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Store form data for next step
      setFormData({ ...formData, ...data })
      
      if (currentStep < 3) {
        setCurrentStep(currentStep + 1)
        toast.success('Information saved! Please continue to the next step.')
      } else {
        // Final submission
        toast.success('Your business listing has been submitted successfully! We will review it within 24-48 hours and notify you via email.')
        reset()
        setCurrentStep(1)
        setFormData({})
      }
    } catch (error) {
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
                  <option value="">Open</option>
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
                  <option value="">Close</option>
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
