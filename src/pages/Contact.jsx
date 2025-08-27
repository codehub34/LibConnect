import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { 
  Mail, Phone, MapPin, Clock, Send, 
  Building2, MessageCircle, AlertCircle 
} from 'lucide-react'

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm()

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      toast.success('Thank you for your message! We will get back to you within 24 hours.')
      reset()
    } catch (error) {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "info@riselist.com",
      description: "Send us an email anytime",
      action: "mailto:info@riselist.com"
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+231 XXX XXX XXX",
      description: "Mon-Fri from 8am to 6pm",
      action: "tel:+231XXXXXXXXX"
    },
    {
      icon: MapPin,
      title: "Office",
      value: "Monrovia, Liberia",
      description: "Visit us in person",
      action: "#"
    },
    {
      icon: Clock,
      title: "Business Hours",
      value: "Mon-Fri: 8AM-6PM",
      description: "Liberia Time (GMT+0)",
      action: "#"
    }
  ]

  const faqs = [
    {
      question: "How do I list my business on RiseList?",
      answer: "Simply visit our Add Listing page and fill out the form. We'll review your submission within 24-48 hours and notify you via email once approved."
    },
    {
      question: "Is listing my business on RiseList free?",
      answer: "Yes! Basic business listings are completely free. We also offer premium features for businesses looking for enhanced visibility and additional tools."
    },
    {
      question: "How do you verify businesses on your platform?",
      answer: "We manually review each business submission, verify contact information, and ensure the business meets our quality standards before approval."
    },
    {
      question: "Can I update my business information after listing?",
      answer: "Absolutely! Business owners can update their information anytime by contacting our support team or using the business dashboard."
    }
  ]

  return (
    <>
      <Helmet>
        <title>Contact Us - RiseList</title>
        <meta name="description" content="Get in touch with the RiseList team. We're here to help with questions, support, and business listing inquiries." />
      </Helmet>

      <div className="min-h-screen bg-light">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold font-lato mb-6">
              Get in Touch
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto">
              Have questions about RiseList? Want to list your business? 
              We're here to help and would love to hear from you.
            </p>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <h2 className="text-2xl font-bold text-primary mb-6">Send us a Message</h2>
                  
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          First Name *
                        </label>
                        <input
                          type="text"
                          {...register('firstName', { required: 'First name is required' })}
                          className="input-field"
                          placeholder="Your first name"
                        />
                        {errors.firstName && (
                          <p className="text-red-500 text-sm mt-1 flex items-center">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            {errors.firstName.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          {...register('lastName', { required: 'Last name is required' })}
                          className="input-field"
                          placeholder="Your last name"
                        />
                        {errors.lastName && (
                          <p className="text-red-500 text-sm mt-1 flex items-center">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            {errors.lastName.message}
                          </p>
                        )}
                      </div>
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
                        Subject *
                      </label>
                      <select
                        {...register('subject', { required: 'Subject is required' })}
                        className="input-field"
                      >
                        <option value="">Select a subject</option>
                        <option value="general">General Inquiry</option>
                        <option value="business-listing">Business Listing</option>
                        <option value="support">Technical Support</option>
                        <option value="partnership">Partnership Opportunity</option>
                        <option value="feedback">Feedback & Suggestions</option>
                        <option value="other">Other</option>
                      </select>
                      {errors.subject && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.subject.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Message *
                      </label>
                      <textarea
                        {...register('message', { 
                          required: 'Message is required',
                          minLength: { value: 20, message: 'Message must be at least 20 characters' }
                        })}
                        rows={5}
                        className="input-field"
                        placeholder="Tell us how we can help you..."
                      />
                      {errors.message && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.message.message}
                        </p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full btn-primary flex items-center justify-center space-x-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-primary mb-6">Contact Information</h2>
                  <div className="space-y-4">
                    {contactInfo.map((info, index) => {
                      const Icon = info.icon
                      return (
                        <div key={index} className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Icon className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-primary">{info.title}</h3>
                            <a 
                              href={info.action}
                              className="text-lg text-gray-700 hover:text-primary transition-colors duration-200"
                            >
                              {info.value}
                            </a>
                            <p className="text-gray-600 text-sm">{info.description}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Office Location */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-primary mb-4">Our Office</h3>
                  <div className="bg-gray-100 rounded-lg h-48 flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <MapPin className="w-12 h-12 mx-auto mb-2" />
                      <p>Map integration coming soon</p>
                      <p className="text-sm">Monrovia, Liberia</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-primary font-lato mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Find answers to common questions about RiseList
              </p>
            </div>
            
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-light rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-primary mb-3 flex items-center">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    {faq.question}
                  </h3>
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-lato mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-200 mb-8">
              Whether you want to list your business or have questions about our platform, 
              we're here to help you succeed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/add-listing" className="btn-secondary text-lg px-8 py-4">
                List Your Business
              </a>
              <a href="/directory" className="btn-outline text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-primary">
                Explore Directory
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default Contact
