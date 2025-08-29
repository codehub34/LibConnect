// src/components/ReviewForm.jsx
import { useState } from 'react';
import { Star, X } from 'lucide-react';

const ReviewForm = ({ reviewForm, setReviewForm, handleReviewSubmit, submittingReview, closeReviewForm }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg mx-4 p-6 relative animate-fade-in-up">
                <button 
                    onClick={closeReviewForm}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                    disabled={submittingReview}
                >
                    <X className="w-6 h-6" />
                </button>
                <h2 className="text-2xl font-bold text-primary mb-4 font-lato">Write a Review</h2>
                <form onSubmit={handleReviewSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                        <input
                            type="text"
                            id="author"
                            value={reviewForm.author}
                            onChange={(e) => setReviewForm({ ...reviewForm, author: e.target.value })}
                            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                            placeholder="e.g., Jane Doe"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-1">Your Rating</label>
                        <div className="flex space-x-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                    key={star}
                                    className={`w-8 h-8 cursor-pointer transition-colors ${
                                        star <= reviewForm.rating ? 'text-yellow-400' : 'text-gray-300'
                                    }`}
                                    onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                                />
                            ))}
                        </div>
                    </div>
                    <div>
                        <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">Your Comment</label>
                        <textarea
                            id="comment"
                            value={reviewForm.comment}
                            onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                            rows="4"
                            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                            placeholder="Share your experience..."
                            required
                        ></textarea>
                    </div>
                    <button 
                        type="submit"
                        className="w-full btn-primary"
                        disabled={submittingReview}
                    >
                        {submittingReview ? 'Submitting...' : 'Submit Review'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ReviewForm;