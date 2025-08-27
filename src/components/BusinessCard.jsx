import { Link } from 'react-router-dom'
import { MapPin, Phone, Star, Building2 } from 'lucide-react'

const BusinessCard = ({ business }) => {
  const { id, name, description, category, location, rating, reviewCount, phone, logo } = business

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
              <p className="text-sm text-gray-600 mt-1">{category}</p>
            </div>
            
            {/* Rating */}
            <div className="flex items-center space-x-1 ml-4">
              <Star className="w-4 h-4 text-secondary fill-current" />
              <span className="text-sm font-medium text-gray-700">{rating}</span>
              <span className="text-xs text-gray-500">({reviewCount})</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm mt-2 line-clamp-2">
            {description}
          </p>

          {/* Location and Contact */}
          <div className="flex items-center space-x-4 mt-3 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4" />
              <span>{location}</span>
            </div>
            {phone && (
              <div className="flex items-center space-x-1">
                <Phone className="w-4 h-4" />
                <span>{phone}</span>
              </div>
            )}
          </div>

          {/* Action Button */}
          <div className="mt-4">
            <Link
              to={`/business/${id}`}
              className="inline-flex items-center px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-light transition-colors duration-200"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BusinessCard
