// src/pages/BusinessProfile.jsx
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { mockBusinesses, mockReviews } from '../data/businesses.js';
import BusinessProfileContent from '../components/BusinessProfileContent';
import ReviewForm from '../components/ReviewForm';


const BusinessProfile = () => {
    const { id } = useParams();
    const [business, setBusiness] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');
    
    // Review form state
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [reviewForm, setReviewForm] = useState({
        author: '',
        rating: 5,
        comment: ''
    });
    const [submittingReview, setSubmittingReview] = useState(false);

    useEffect(() => {
        // Simulate API call with dynamic business ID
        setTimeout(() => {
            // FIX 1: Use unary plus (+) to convert the string ID to a number.
            // This is more reliable and direct than parseInt().
            const businessData = mockBusinesses.find(b => b.id === +id);

            // FIX 2: Find all reviews that match the business ID.
            // Assuming mockReviews is an array of review objects, each with a `businessId` property.
            const businessReviews = mockReviews.filter(r => r.businessId === +id);
            
            if (businessData) {
                setBusiness(businessData);
                setReviews(businessReviews);
            }
            setLoading(false);
        }, 1000);
    }, [id]);

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        
        if (!reviewForm.author.trim() || !reviewForm.comment.trim()) {
            alert('Please fill in all fields');
            return;
        }

        setSubmittingReview(true);
        
        setTimeout(() => {
            const newReview = {
                id: reviews.length + 1 + Date.now(),
                businessId: +id, // Assign the correct businessId to the new review
                author: reviewForm.author.trim(),
                rating: reviewForm.rating,
                date: new Date().toISOString().split('T')[0],
                comment: reviewForm.comment.trim()
            };
            
            setReviews(prevReviews => [newReview, ...prevReviews]);
            
            if (business) {
                const totalRating = [...reviews, newReview].reduce((sum, review) => sum + review.rating, 0);
                const newRating = totalRating / (reviews.length + 1);
                const newReviewCount = reviews.length + 1;
                
                setBusiness(prevBusiness => ({
                    ...prevBusiness,
                    rating: Math.round(newRating * 10) / 10,
                    reviewCount: newReviewCount
                }));
            }
            
            setReviewForm({
                author: '',
                rating: 5,
                comment: ''
            });
            setShowReviewForm(false);
            setSubmittingReview(false);
            
            alert('Review submitted successfully! Your feedback is live. 🚀');
        }, 1000);
    };

    const handleCallNow = () => {
        if (business && business.phone) {
            const confirmed = window.confirm(`Call ${business.name} at ${business.phone}?`);
            if (confirmed) {
                const phoneNumber = business.phone.replace(/[^\d+]/g, '');
                window.open(`tel:${phoneNumber}`, '_self');
            }
        } else {
            alert('Phone number not available for this business');
        }
    };
    
    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: business.name,
                    text: `Check out ${business.name} on RiseList - ${business.description.substring(0, 100)}...`,
                    url: window.location.href
                });
            } catch (error) {
                console.error('Error sharing:', error);
                copyToClipboard();
            }
        } else {
            copyToClipboard();
        }
    };

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            alert('Business profile link copied to clipboard! 📋');
        } catch (error) {
            alert('Failed to copy. Please copy the URL from your browser address bar.');
        }
    };

    const handleSendMessage = () => {
        if (business && business.phone) {
            const phoneNumber = business.phone.replace(/[^\d+]/g, '');
            const message = `Hello ${business.name}, I'm interested in your services. Can you provide more information?`;
            
            try {
                const smsUrl = `sms:${phoneNumber}?body=${encodeURIComponent(message)}`;
                window.open(smsUrl, '_self');
            } catch (error) {
                alert(`SMS ready to send to ${business.phone}:\n\n${message}\n\nPlease copy this message and send it manually via SMS.`);
            }
        } else {
            alert('Phone number not available for this business');
        }
    };

    const handleReportIssue = () => {
        if (business) {
            const issue = prompt(`What issue would you like to report for ${business.name}?\n\nPlease describe the problem:`, '');
            
            if (issue && issue.trim()) {
                const reportText = `ISSUE REPORT\nFrom: RiseList User\nBusiness: ${business.name}\n\nIssue: ${issue.trim()}\n\nPlease investigate this matter.`;
                
                if (business.phone) {
                    try {
                        const phoneNumber = business.phone.replace(/[^\d+]/g, '');
                        const smsUrl = `sms:${phoneNumber}?body=${encodeURIComponent(reportText)}`;
                        window.open(smsUrl, '_self');
                    } catch (error) {
                        alert(`Report ready to send to ${business.phone}:\n\n${reportText}\n\nPlease copy this report and send it manually via SMS.`);
                    }
                } else {
                    alert(`Issue reported: "${issue.trim()}" for ${business.name}.\n\nThank you for your feedback! We'll investigate this matter.`);
                }
            }
        }
    };

    const handleGetDirections = () => {
        if (business && business.address) {
            const encodedAddress = encodeURIComponent(business.address);
            const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
            window.open(googleMapsUrl, '_blank');
        } else {
            alert('Business address not available for directions.');
        }
    };

    const openReviewForm = () => setShowReviewForm(true);
    const closeReviewForm = () => {
        setShowReviewForm(false);
        setReviewForm({ author: '', rating: 5, comment: '' });
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
                    <p className="mt-4 text-lg text-gray-600">Loading business profile...</p>
                </div>
            </div>
        );
    }

    if (!business) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center p-8 bg-white rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold text-red-500 mb-4">Business Not Found</h2>
                    <p className="text-gray-600">The business you are looking for does not exist.</p>
                    <Link to="/directory" className="mt-4 inline-block btn-primary">
                        Back to Directory
                    </Link>
                </div>
            </div>
        );
    }

    const handlers = {
        handleCallNow,
        handleShare,
        handleSendMessage,
        handleReportIssue,
        handleGetDirections,
        openReviewForm
    };

    return (
        <>
            <Helmet>
                <title>{business.name} - RiseList</title>
                <meta name="description" content={business.description.substring(0, 160)} />
            </Helmet>
            <BusinessProfileContent 
                business={business}
                reviews={reviews}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                handlers={handlers}
            />
            {showReviewForm && (
                <ReviewForm
                    reviewForm={{ ...reviewForm, businessName: business.name }}
                    setReviewForm={setReviewForm}
                    handleReviewSubmit={handleReviewSubmit}
                    submittingReview={submittingReview}
                    closeReviewForm={closeReviewForm}
                />
            )}
        </>
    );
};

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

export default BusinessProfile;