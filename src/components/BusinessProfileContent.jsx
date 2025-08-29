// src/components/BusinessProfileContent.jsx
import { MapPin, Phone, Mail, Globe, Building2, Calendar, MessageCircle, Share2, Plus } from 'lucide-react';
import ReviewStars from './ReviewStars';

const formatPhoneNumber = (phone) => {
    const cleaned = phone.replace(/[^\d+]/g, '');
    if (cleaned.startsWith('+')) {
        return cleaned;
    } else if (cleaned.length === 10) {
        return `(${cleaned.substring(0, 3)}) ${cleaned.substring(3, 6)}-${cleaned.substring(6)}`;
    } else {
        return phone;
    }
};

const BusinessProfileContent = ({ business, reviews, activeTab, setActiveTab, handlers }) => {
    const { handleCallNow, handleShare, handleSendMessage, handleReportIssue, handleGetDirections, openReviewForm } = handlers;
    const workingDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

    return (
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
                            <button onClick={handleCallNow} className="btn-primary flex items-center justify-center space-x-2">
                                <Phone className="w-4 h-4" />
                                <span>Call Now</span>
                            </button>
                            <button onClick={handleShare} className="btn-outline flex items-center justify-center space-x-2">
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
                        <div className="bg-white rounded-xl shadow-sm mb-6">
                            <div className="border-b border-gray-200">
                                <nav className="flex space-x-8 px-6">
                                    {[
                                        { id: 'overview', label: 'Overview', icon: Building2 },
                                        { id: 'reviews', label: 'Reviews', icon: MessageCircle },
                                        { id: 'photos', label: 'Photos', icon: Calendar }
                                    ].map((tab) => {
                                        const Icon = tab.icon;
                                        return (
                                            <button
                                                key={tab.id}
                                                onClick={() => setActiveTab(tab.id)}
                                                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                                                    activeTab === tab.id ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                                }`}
                                            >
                                                <Icon className="w-4 h-4" />
                                                <span>{tab.label}</span>
                                            </button>
                                        );
                                    })}
                                </nav>
                            </div>
                            <div className="p-6">
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
                                {activeTab === 'reviews' && (
                                    <div className="space-y-6">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-lg font-semibold text-primary">Customer Reviews</h3>
                                            <button onClick={openReviewForm} className="btn-primary flex items-center space-x-2">
                                                <Plus className="w-4 h-4" />
                                                <span>Write a Review</span>
                                            </button>
                                        </div>
                                        <div className="space-y-4">
                                            {reviews.length > 0 ? (
                                                reviews.map((review) => (
                                                    <div key={review.id} className="border border-gray-200 rounded-lg p-4">
                                                        <div className="flex items-start justify-between mb-3">
                                                            <div>
                                                                <h4 className="font-medium text-gray-900">{review.author}</h4>
                                                                <p className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</p>
                                                            </div>
                                                            <ReviewStars rating={review.rating} size="sm" />
                                                        </div>
                                                        <p className="text-gray-700">{review.comment}</p>
                                                    </div>
                                                ))
                                            ) : (
                                                <p className="text-gray-500 text-center">No reviews yet. Be the first to leave one!</p>
                                            )}
                                        </div>
                                    </div>
                                )}
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
                                    {business.phone && (
                                        <div className="flex items-center space-x-3">
                                            <Phone className="w-5 h-5 text-secondary" />
                                            <span className="text-gray-700">{formatPhoneNumber(business.phone)}</span>
                                        </div>
                                    )}
                                    {business.email && (
                                        <div className="flex items-center space-x-3">
                                            <Mail className="w-5 h-5 text-secondary" />
                                            <span className="text-gray-700">{business.email}</span>
                                        </div>
                                    )}
                                    {business.website && (
                                        <div className="flex items-center space-x-3">
                                            <Globe className="w-5 h-5 text-secondary" />
                                            <a href={business.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-dark transition-colors duration-200">
                                                Visit Website
                                            </a>
                                        </div>
                                    )}
                                    {business.address && (
                                        <div className="flex items-start space-x-3">
                                            <MapPin className="w-5 h-5 text-secondary mt-1" />
                                            <span className="text-gray-700">{business.address}</span>
                                        </div>
                                    )}
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
                            {/* Dynamic Map */}
                            <div className="bg-white rounded-xl shadow-sm p-6">
                                <h3 className="text-lg font-semibold text-primary mb-4">Location</h3>
                                <div className="bg-gray-100 rounded-lg h-48 overflow-hidden">
                                    {business.coordinates ? (
                                        <iframe
                                            title={`${business.name} location`}
                                            src={`https://maps.google.com/maps?q=${business.coordinates.lat},${business.coordinates.lng}&z=15&output=embed`}
                                            width="100%"
                                            height="100%"
                                            style={{ border: 0 }}
                                            allowFullScreen=""
                                            loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade"
                                        ></iframe>
                                    ) : (
                                        <div className="h-full w-full flex items-center justify-center text-center text-gray-500 p-4">
                                            Map location not available.
                                        </div>
                                    )}
                                </div>
                            </div>
                            {/* Quick Actions */}
                            <div className="bg-white rounded-xl shadow-sm p-6">
                                <h3 className="text-lg font-semibold text-primary mb-4">Quick Actions</h3>
                                <div className="space-y-3">
                                    <button className="w-full btn-primary" onClick={handleGetDirections}>
                                        Get Directions
                                    </button>
                                    <button onClick={handleSendMessage} className="w-full btn-outline hover:bg-primary hover:text-white transition-all duration-200">
                                        Send Message
                                    </button>
                                    <button onClick={handleReportIssue} className="w-full btn-outline hover:bg-primary hover:text-white transition-all duration-200">
                                        Report Issue
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BusinessProfileContent;