import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { 
  MapPin, Phone, Mail, Globe, Clock, Star, 
  Building2, Calendar, MessageCircle, Share2, X, Plus
} from 'lucide-react'
import ReviewStars from '../components/ReviewStars'

const BusinessProfile = () => {
  const { id } = useParams()
  const [business, setBusiness] = useState(null)
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')
  
  // Review form state
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [reviewForm, setReviewForm] = useState({
    author: '',
    rating: 5,
    comment: ''
  })
  const [submittingReview, setSubmittingReview] = useState(false)

  // Mock business data - now properly mapped by ID
  const mockBusinesses = {
    1: {
      id: 1,
      name: "Liberia Tech Solutions",
      description: "Liberia Tech Solutions is a leading technology consulting and software development company serving businesses across Liberia. We specialize in creating innovative digital solutions that help businesses grow and succeed in the digital age. Our team of experienced developers and consultants work closely with clients to understand their unique needs and deliver customized solutions that drive results.",
      category: "Technology",
      location: "Monrovia, Liberia",
      address: "123 Broad Street, Monrovia, Liberia",
      phone: "+231 123 456 789",
      email: "info@liberiatechsolutions.com",
      website: "https://liberiatechsolutions.com",
      rating: 4.8,
      reviewCount: 24,
      logo: null,
      images: [],
      hours: {
        monday: "9:00 AM - 6:00 PM",
        tuesday: "9:00 AM - 6:00 PM",
        wednesday: "9:00 AM - 6:00 PM",
        thursday: "9:00 AM - 6:00 PM",
        friday: "9:00 AM - 6:00 PM",
        saturday: "10:00 AM - 4:00 PM",
        sunday: "Closed"
      },
      services: [
        "Web Development",
        "Mobile App Development",
        "Software Consulting",
        "Digital Transformation",
        "IT Infrastructure",
        "Cloud Solutions"
      ],
      coordinates: {
        lat: 6.3004,
        lng: -10.7969
      }
    },
    2: {
      id: 2,
      name: "Green Earth Agriculture",
      description: "Green Earth Agriculture is a sustainable farming company dedicated to promoting organic farming practices and supporting local farmers across Liberia. We focus on food security, environmental conservation, and empowering rural communities through innovative agricultural techniques and fair trade practices.",
      category: "Agriculture",
      location: "Gbarnga, Liberia",
      address: "456 Farm Road, Gbarnga, Liberia",
      phone: "+231 987 654 321",
      email: "info@greenearthagri.com",
      website: "https://greenearthagri.com",
      rating: 4.6,
      reviewCount: 18,
      logo: null,
      images: [],
      hours: {
        monday: "7:00 AM - 5:00 PM",
        tuesday: "7:00 AM - 5:00 PM",
        wednesday: "7:00 AM - 5:00 PM",
        thursday: "7:00 AM - 5:00 PM",
        friday: "7:00 AM - 5:00 PM",
        saturday: "8:00 AM - 3:00 PM",
        sunday: "Closed"
      },
      services: [
        "Organic Farming",
        "Agricultural Consulting",
        "Seed Distribution",
        "Sustainable Practices Training",
        "Crop Management",
        "Soil Testing"
      ],
      coordinates: {
        lat: 6.9956,
        lng: -9.4722
      }
    },
    3: {
      id: 3,
      name: "Liberia Express Logistics",
      description: "Liberia Express Logistics is a premier shipping and logistics company connecting Liberia to the global marketplace. We provide reliable, fast, and cost-effective shipping solutions for businesses and individuals, with comprehensive tracking and customer support.",
      category: "Logistics",
      location: "Monrovia, Liberia",
      address: "789 Harbor Street, Monrovia, Liberia",
      phone: "+231 555 123 456",
      email: "info@liberiaexpress.com",
      website: "https://liberiaexpress.com",
      rating: 4.7,
      reviewCount: 31,
      logo: null,
      images: [],
      hours: {
        monday: "8:00 AM - 7:00 PM",
        tuesday: "8:00 AM - 7:00 PM",
        wednesday: "8:00 AM - 7:00 PM",
        thursday: "8:00 AM - 7:00 PM",
        friday: "8:00 AM - 7:00 PM",
        saturday: "9:00 AM - 5:00 PM",
        sunday: "10:00 AM - 3:00 PM"
      },
      services: [
        "International Shipping",
        "Local Delivery",
        "Freight Forwarding",
        "Customs Clearance",
        "Warehousing",
        "Express Services"
      ],
      coordinates: {
        lat: 6.3004,
        lng: -10.7969
      }
    },
    4: {
      id: 4,
      name: "Monrovia Medical Center",
      description: "Monrovia Medical Center is a state-of-the-art healthcare facility providing comprehensive medical services to the people of Liberia. Our team of experienced healthcare professionals is committed to delivering quality care with compassion and excellence.",
      category: "Healthcare",
      location: "Monrovia, Liberia",
      address: "321 Health Avenue, Monrovia, Liberia",
      phone: "+231 777 888 999",
      email: "info@monroviamedical.com",
      website: "https://monroviamedical.com",
      rating: 4.9,
      reviewCount: 42,
      logo: null,
      images: [],
      hours: {
        monday: "24/7",
        tuesday: "24/7",
        wednesday: "24/7",
        thursday: "24/7",
        friday: "24/7",
        saturday: "24/7",
        sunday: "24/7"
      },
      services: [
        "Emergency Care",
        "General Medicine",
        "Surgery",
        "Pediatrics",
        "Laboratory Services",
        "Pharmacy"
      ],
      coordinates: {
        lat: 6.3004,
        lng: -10.7969
      }
    },
    5: {
      id: 5,
      name: "Liberia University Press",
      description: "Liberia University Press is the premier educational publishing house in Liberia, dedicated to supporting academic excellence and knowledge dissemination. We publish textbooks, research papers, and educational resources that empower students and educators.",
      category: "Education",
      location: "Monrovia, Liberia",
      address: "654 Education Street, Monrovia, Liberia",
      phone: "+231 444 333 222",
      email: "info@liberiauniversitypress.com",
      website: "https://liberiauniversitypress.com",
      rating: 4.5,
      reviewCount: 15,
      logo: null,
      images: [],
      hours: {
        monday: "8:00 AM - 6:00 PM",
        tuesday: "8:00 AM - 6:00 PM",
        wednesday: "8:00 AM - 6:00 PM",
        thursday: "8:00 AM - 6:00 PM",
        friday: "8:00 AM - 6:00 PM",
        saturday: "9:00 AM - 2:00 PM",
        sunday: "Closed"
      },
      services: [
        "Textbook Publishing",
        "Academic Journals",
        "Research Publications",
        "Educational Resources",
        "Digital Learning Materials",
        "Author Services"
      ],
      coordinates: {
        lat: 6.3004,
        lng: -10.7969
      }
    },
    6: {
      id: 6,
      name: "Liberia Bank & Trust",
      description: "Liberia Bank & Trust is a trusted financial institution providing comprehensive banking services to individuals and businesses across Liberia. We offer secure, reliable, and innovative financial solutions to help our customers achieve their financial goals.",
      category: "Finance",
      location: "Monrovia, Liberia",
      address: "987 Finance Boulevard, Monrovia, Liberia",
      phone: "+231 666 777 888",
      email: "info@liberiabank.com",
      website: "https://liberiabank.com",
      rating: 4.4,
      reviewCount: 28,
      logo: null,
      images: [],
      hours: {
        monday: "8:30 AM - 4:30 PM",
        tuesday: "8:30 AM - 4:30 PM",
        wednesday: "8:30 AM - 4:30 PM",
        thursday: "8:30 AM - 4:30 PM",
        friday: "8:30 AM - 4:30 PM",
        saturday: "9:00 AM - 1:00 PM",
        sunday: "Closed"
      },
      services: [
        "Personal Banking",
        "Business Banking",
        "Loans & Credit",
        "Investment Services",
        "Online Banking",
        "Mobile Banking"
      ],
      coordinates: {
        lat: 6.3004,
        lng: -10.7969
      }
    }
  }

  // Mock reviews data - mapped by business ID
  const mockReviews = {
    1: [
      {
        id: 1,
        author: "John Doe",
        rating: 5,
        date: "2024-01-15",
        comment: "Excellent service! The team at Liberia Tech Solutions delivered our website ahead of schedule and exceeded our expectations. Highly recommended!"
      },
      {
        id: 2,
        author: "Sarah Johnson",
        rating: 4,
        date: "2024-01-10",
        comment: "Great experience working with this company. They understood our business needs and provided innovative solutions. Will definitely work with them again."
      },
      {
        id: 3,
        author: "Michael Brown",
        rating: 5,
        date: "2024-01-05",
        comment: "Professional team with excellent technical skills. They transformed our business operations with their digital solutions. Very satisfied!"
      }
    ],
    2: [
      {
        id: 4,
        author: "Emma Wilson",
        rating: 5,
        date: "2024-01-12",
        comment: "Green Earth Agriculture has transformed our farming practices. Their sustainable approach and support for local farmers is commendable."
      },
      {
        id: 5,
        author: "David Thompson",
        rating: 4,
        date: "2024-01-08",
        comment: "Great organic products and excellent customer service. They really care about environmental sustainability."
      }
    ],
    3: [
      {
        id: 6,
        author: "Lisa Chen",
        rating: 5,
        date: "2024-01-14",
        comment: "Fast and reliable shipping service. Liberia Express Logistics made our international trade much easier."
      },
      {
        id: 7,
        author: "Robert Davis",
        rating: 4,
        date: "2024-01-06",
        comment: "Professional logistics company with excellent tracking and customer support. Highly recommended for business shipping needs."
      }
    ],
    4: [
      {
        id: 8,
        author: "Maria Garcia",
        rating: 5,
        date: "2024-01-16",
        comment: "Outstanding medical care and professional staff. Monrovia Medical Center provides world-class healthcare services."
      },
      {
        id: 9,
        author: "James Wilson",
        rating: 5,
        date: "2024-01-11",
        comment: "The medical team here is exceptional. They provided excellent care during my emergency and follow-up treatment."
      }
    ],
    5: [
      {
        id: 10,
        author: "Dr. Sarah Miller",
        rating: 4,
        date: "2024-01-13",
        comment: "As an educator, I appreciate the quality of educational materials published by Liberia University Press."
      },
      {
        id: 11,
        author: "Thomas Anderson",
        rating: 5,
        date: "2024-01-07",
        comment: "Excellent academic resources that support our research and teaching needs. Highly recommended for educational institutions."
      }
    ],
    6: [
      {
        id: 12,
        author: "Jennifer Lee",
        rating: 4,
        date: "2024-01-09",
        comment: "Professional banking services with competitive rates. Liberia Bank & Trust has been our financial partner for years."
      },
      {
        id: 13,
        author: "Christopher Brown",
        rating: 4,
        date: "2024-01-04",
        comment: "Reliable banking institution with excellent customer service. They've helped us grow our business with their financial solutions."
      }
    ]
  }

  useEffect(() => {
    // Simulate API call with dynamic business ID
    setTimeout(() => {
      const businessData = mockBusinesses[parseInt(id)]
      const businessReviews = mockReviews[parseInt(id)] || []
      
      if (businessData) {
        setBusiness(businessData)
        setReviews(businessReviews)
      }
      setLoading(false)
    }, 1000)
  }, [id])

  // Review form functions
  const handleReviewSubmit = async (e) => {
    e.preventDefault()
    
    if (!reviewForm.author.trim() || !reviewForm.comment.trim()) {
      alert('Please fill in all fields')
      return
    }

    setSubmittingReview(true)
    
    // Simulate API call delay
    setTimeout(() => {
      const newReview = {
        id: reviews.length + 1,
        author: reviewForm.author.trim(),
        rating: reviewForm.rating,
        date: new Date().toISOString().split('T')[0],
        comment: reviewForm.comment.trim()
      }
      
      // Add new review to the list
      setReviews(prevReviews => [newReview, ...prevReviews])
      
      // Update business rating and review count
      if (business) {
        const totalRating = [...reviews, newReview].reduce((sum, review) => sum + review.rating, 0)
        const newRating = totalRating / (reviews.length + 1)
        const newReviewCount = reviews.length + 1
        
        setBusiness(prevBusiness => ({
          ...prevBusiness,
          rating: Math.round(newRating * 10) / 10,
          reviewCount: newReviewCount
        }))
      }
      
      // Reset form and close modal
      setReviewForm({
        author: '',
        rating: 5,
        comment: ''
      })
      setShowReviewForm(false)
      setSubmittingReview(false)
      
      // Show success message
      alert('Review submitted successfully!')
    }, 1000)
  }

  const handleReviewFormChange = (field, value) => {
    setReviewForm(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const openReviewForm = () => {
    setShowReviewForm(true)
  }

  const closeReviewForm = () => {
    setShowReviewForm(false)
    setReviewForm({
      author: '',
      rating: 5,
      comment: ''
    })
  }

  // Phone call functionality
  const handleCallNow = () => {
    if (business && business.phone) {
      // Format phone number for display
      const formattedPhone = formatPhoneNumber(business.phone)
      // Show confirmation with phone number
      const confirmed = window.confirm(`Call ${business.name} at ${formattedPhone}?`)
      if (confirmed) {
        // Remove any non-numeric characters and format for phone call
        const phoneNumber = business.phone.replace(/[^\d+]/g, '')
        window.open(`tel:${phoneNumber}`, '_self')
      }
    } else {
      alert('Phone number not available for this business')
    }
  }

  // Format phone number for display
  const formatPhoneNumber = (phone) => {
    // Remove all non-numeric characters except +
    const cleaned = phone.replace(/[^\d+]/g, '')
    
    // Format based on length
    if (cleaned.startsWith('+')) {
      // International format: +231 123 456 789
      const countryCode = cleaned.substring(0, 4)
      const areaCode = cleaned.substring(4, 7)
      const firstPart = cleaned.substring(7, 10)
      const secondPart = cleaned.substring(10, 13)
      return `${countryCode} ${areaCode} ${firstPart} ${secondPart}`
    } else if (cleaned.length === 10) {
      // Local format: 123 456 7890
      return `${cleaned.substring(0, 3)} ${cleaned.substring(3, 6)} ${cleaned.substring(6)}`
    } else {
      // Return as is if can't format
      return phone
    }
  }

  // Share functionality
  const handleShare = async () => {
    if (navigator.share) {
      // Use native sharing if available (mobile devices)
      try {
        await navigator.share({
          title: business.name,
          text: `Check out ${business.name} on RiseList - ${business.description.substring(0, 100)}...`,
          url: window.location.href
        })
      } catch (error) {
        console.log('Error sharing:', error)
        // Fallback to clipboard copy
        copyToClipboard()
      }
    } else {
      // Fallback for desktop browsers
      copyToClipboard()
    }
  }

  // Copy to clipboard function
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      alert('Business profile link copied to clipboard! 📋')
    } catch (error) {
      // Fallback: show share options
      showShareOptions()
    }
  }

  // Fallback share options for older browsers
  const showShareOptions = () => {
    const shareUrl = window.location.href
    const shareText = `Check out ${business.name} on RiseList: ${shareUrl}`
    
    // Create a temporary textarea to copy the text
    const textarea = document.createElement('textarea')
    textarea.value = shareText
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    document.body.removeChild(textarea)
    
    alert('Business profile link copied to clipboard! 📋')
  }

  // SMS Message functionality
  const handleSendMessage = () => {
    if (business && business.phone) {
      // Format phone number for SMS
      const phoneNumber = business.phone.replace(/[^\d+]/g, '')
      
      // Create a pre-filled message
      const message = `Hello ${business.name}, I'm interested in your services. Can you provide more information?`
      
      // Try to open SMS app with pre-filled message
      try {
        const smsUrl = `sms:${phoneNumber}?body=${encodeURIComponent(message)}`
        window.open(smsUrl, '_self')
      } catch (error) {
        // Fallback: show the message content for manual copying
        alert(`SMS ready to send to ${business.phone}:\n\n${message}\n\nPlease copy this message and send it manually via SMS.`)
      }
    } else {
      alert('Phone number not available for this business')
    }
  }

  // Report Issue functionality
  const handleReportIssue = () => {
    if (business) {
      // Show a simple prompt for issue reporting
      const issue = prompt(`What issue would you like to report for ${business.name}?\n\nPlease describe the problem:`, '')
      
      if (issue && issue.trim()) {
        // Format the report for SMS
        const reportText = `ISSUE REPORT\nFrom: RiseList User\nBusiness: ${business.name}\n\nIssue: ${issue.trim()}\n\nPlease investigate this matter.`
        
        if (business.phone) {
          // Try to open SMS app with report
          try {
            const phoneNumber = business.phone.replace(/[^\d+]/g, '')
            const smsUrl = `sms:${phoneNumber}?body=${encodeURIComponent(reportText)}`
            window.open(smsUrl, '_self')
          } catch (error) {
            // Fallback: show the report content for manual copying
            alert(`Report ready to send to ${business.phone}:\n\n${reportText}\n\nPlease copy this report and send it manually via SMS.`)
          }
        } else {
          // If no phone, just show confirmation
          alert(`Issue reported: "${issue.trim()}" for ${business.name}.\n\nThank you for your feedback! We'll investigate this matter.`)
        }
      }
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Loading business profile...</p>
        </div>
      </div>
    )
  }

  if (!business) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Business not found</h2>
          <p className="text-gray-500 mb-6">The business you're looking for doesn't exist or has been removed.</p>
          <Link to="/directory" className="btn-primary">
            Back to Directory
          </Link>
        </div>
      </div>
    )
  }

  const workingDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']

  return (
    <>
      <Helmet>
        <title>{business.name} - RiseList</title>
        <meta name="description" content={business.description.substring(0, 160)} />
      </Helmet>

      <div className="min-h-screen bg-light">
        {/* Header */}
        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
              <div className="flex items-start space-x-4 mb-6 lg:mb-0">
                {/* Logo */}
                <div className="flex-shrink-0">
                  {business.logo ? (
                    <img 
                      src={business.logo} 
                      alt={`${business.name} logo`}
                      className="w-20 h-20 rounded-xl object-cover border-2 border-gray-100"
                    />
                  ) : (
                    <div className="w-20 h-20 bg-primary/10 rounded-xl flex items-center justify-center">
                      <Building2 className="w-10 h-10 text-primary" />
                    </div>
                  )}
                </div>

                {/* Business Info */}
                <div className="flex-1">
                  <h1 className="text-3xl md:text-4xl font-bold text-primary font-lato mb-2">
                    {business.name}
                  </h1>
                  <p className="text-lg text-gray-600 mb-3">{business.category}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{business.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <ReviewStars rating={business.rating} size="sm" showNumber />
                      <span>({business.reviewCount} reviews)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button 
                  onClick={handleCallNow}
                  className="btn-primary flex items-center justify-center space-x-2 hover:bg-primary-dark transition-all duration-200 transform hover:scale-105"
                  title={`Call ${business.name} at ${formatPhoneNumber(business.phone)}`}
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Now</span>
                </button>
                <button 
                  onClick={handleShare}
                  className="btn-outline flex items-center justify-center space-x-2 hover:bg-primary hover:text-white transition-all duration-200 transform hover:scale-105"
                  title="Share this business profile"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Tabs */}
              <div className="bg-white rounded-xl shadow-sm mb-6">
                <div className="border-b border-gray-200">
                  <nav className="flex space-x-8 px-6">
                    {[
                      { id: 'overview', label: 'Overview', icon: Building2 },
                      { id: 'reviews', label: 'Reviews', icon: MessageCircle },
                      { id: 'photos', label: 'Photos', icon: Calendar }
                    ].map((tab) => {
                      const Icon = tab.icon
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                            activeTab === tab.id
                              ? 'border-primary text-primary'
                              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          <span>{tab.label}</span>
                        </button>
                      )
                    })}
                  </nav>
                </div>

                <div className="p-6">
                  {/* Overview Tab */}
                  {activeTab === 'overview' && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-primary mb-3">About</h3>
                        <p className="text-gray-700 leading-relaxed">{business.description}</p>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-primary mb-3">Services</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {business.services.map((service, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-secondary rounded-full"></div>
                              <span className="text-gray-700">{service}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Reviews Tab */}
                  {activeTab === 'reviews' && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-primary">Customer Reviews</h3>
                        <button 
                          onClick={openReviewForm}
                          className="btn-primary flex items-center space-x-2"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Write a Review</span>
                        </button>
                      </div>
                      
                      <div className="space-y-4">
                        {reviews.map((review) => (
                          <div key={review.id} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <h4 className="font-medium text-gray-900">{review.author}</h4>
                                <p className="text-sm text-gray-500">
                                  {new Date(review.date).toLocaleDateString()}
                                </p>
                              </div>
                              <ReviewStars rating={review.rating} size="sm" />
                            </div>
                            <p className="text-gray-700">{review.comment}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Photos Tab */}
                  {activeTab === 'photos' && (
                    <div>
                      <h3 className="text-lg font-semibold text-primary mb-3">Photos</h3>
                      <p className="text-gray-500">No photos available yet.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="space-y-6">
                {/* Contact Information */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-primary mb-4">Contact Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-secondary" />
                      <span className="text-gray-700">{business.phone}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-secondary" />
                      <span className="text-gray-700">{business.email}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Globe className="w-5 h-5 text-secondary" />
                      <a 
                        href={business.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary-dark transition-colors duration-200"
                      >
                        Visit Website
                      </a>
                    </div>
                    <div className="flex items-start space-x-3">
                      <MapPin className="w-5 h-5 text-secondary mt-1" />
                      <span className="text-gray-700">{business.address}</span>
                    </div>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-primary mb-4">Business Hours</h3>
                  <div className="space-y-2">
                    {workingDays.map((day) => (
                      <div key={day} className="flex justify-between">
                        <span className="text-gray-700 capitalize">{day}</span>
                        <span className="text-gray-600">{business.hours[day]}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Map Placeholder */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-primary mb-4">Location</h3>
                  <div className="bg-gray-100 rounded-lg h-48 flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <MapPin className="w-12 h-12 mx-auto mb-2" />
                      <p>Map integration coming soon</p>
                      <p className="text-sm">{business.location}</p>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-primary mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <button className="w-full btn-primary">
                      Get Directions
                    </button>
                    <button 
                      onClick={handleSendMessage}
                      className="w-full btn-outline hover:bg-primary hover:text-white transition-all duration-200"
                      title="Send SMS message to this business"
                    >
                      Send Message
                    </button>
                    <button 
                      onClick={handleReportIssue}
                      className="w-full btn-outline hover:bg-primary hover:text-white transition-all duration-200"
                      title="Report an issue with this business"
                    >
                      Report Issue
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Review Form Modal */}
      {showReviewForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-primary">Write a Review</h3>
                <button
                  onClick={closeReviewForm}
                  className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleReviewSubmit} className="space-y-6">
                {/* Author Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    value={reviewForm.author}
                    onChange={(e) => handleReviewFormChange('author', e.target.value)}
                    className="input-field"
                    placeholder="Enter your name"
                    required
                  />
                </div>

                {/* Rating */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rating *
                  </label>
                  <div className="flex items-center space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => handleReviewFormChange('rating', star)}
                        className={`p-1 transition-colors duration-200 ${
                          star <= reviewForm.rating
                            ? 'text-secondary'
                            : 'text-gray-300'
                        }`}
                      >
                        <Star className={`w-8 h-8 ${star <= reviewForm.rating ? 'fill-current' : ''}`} />
                      </button>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    {reviewForm.rating} out of 5 stars
                  </p>
                </div>

                {/* Comment */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Review *
                  </label>
                  <textarea
                    value={reviewForm.comment}
                    onChange={(e) => handleReviewFormChange('comment', e.target.value)}
                    className="input-field min-h-[100px] resize-none"
                    placeholder="Share your experience with this business..."
                    required
                  />
                </div>

                {/* Submit Button */}
                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={closeReviewForm}
                    className="flex-1 btn-outline"
                    disabled={submittingReview}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 btn-primary"
                    disabled={submittingReview}
                  >
                    {submittingReview ? 'Submitting...' : 'Submit Review'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default BusinessProfile
