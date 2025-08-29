// src/components/BusinessCard.jsx
import { Link } from 'react-router-dom';
import { MapPin, Phone, Building2 } from 'lucide-react';
import ReviewStars from './ReviewStars';

const BusinessCard = ({ business }) => {
  const { id, name, description, category, location, rating, reviewCount, phone, logo } = business;

  // Utility function to format phone numbers for consistent display
  const formatPhoneNumber = (phoneNumber) => {
    if (!phoneNumber) return '';
    const cleaned = ('' + phoneNumber).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return phoneNumber; // Return original if it doesn't match the format
  };

  return (
    <div className="card hover:shadow-xl transition-all duration-300 group">
      <div className="flex items-start space-x-4">
        {/* Logo */}
        <div className="flex-shrink-0">
          {logo ? (
            <img 
              src={logo}
              alt={`${name} logo`}
              className="w-16 h-16 rounded-lg object-cover border-2 border-gray-100"
            />
          ) : (
            <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
              <Building2 className="w-8 h-8 text-primary" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <Link 
                to={`/business/${id}`}
                className="text-lg font-semibold text-primary hover:text-primary-dark transition-colors duration-200 group-hover:text-secondary"
              >
                {name}
              </Link>
              {category && <p className="text-sm text-gray-600 mt-1">{category}</p>}
            </div>
            
            {/* Use the ReviewStars component here */}
            {rating && (
              <div className="flex items-center space-x-1 ml-4">
                <ReviewStars rating={rating} size="sm" showNumber />
                {reviewCount > 0 && (
                  <span className="text-xs text-gray-500">({reviewCount})</span>
                )}
              </div>
            )}
          </div>

          {/* Description */}
          {description && (
            <p className="text-gray-600 text-sm mt-2 line-clamp-2">
              {description}
            </p>
          )}

          {/* Location and Contact */}
          <div className="flex items-center space-x-4 mt-3 text-sm text-gray-500">
            {location && (
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4" />
                {/* FIX: Remove dangerouslySetInnerHTML for security */}
                <span>{location}</span>
              </div>
            )}
            {phone && (
              <div className="flex items-center space-x-1">
                <Phone className="w-4 h-4" />
                {/* FIX: Use the formatPhoneNumber utility function */}
                <span>{formatPhoneNumber(phone)}</span>
              </div>
            )}
          </div>

          {/* Action Button */}
          <div className="mt-4">
            <Link
              to={`/business/${id}`}
              className="inline-flex items-center px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-dark transition-colors duration-200"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessCard;