import { Star } from 'lucide-react'

const ReviewStars = ({ rating, size = 'md', showNumber = false }) => {
  // Helper function for size classes
  const getSizeClass = (size) => {
    switch (size) {
      case 'sm': return 'w-4 h-4'
      case 'md': return 'w-5 h-5'
      case 'lg': return 'w-6 h-6'
      case 'xl': return 'w-8 h-8'
      default: return 'w-5 h-5'
    }
  }

  const stars = []
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 !== 0

  // Add full stars
  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <Star 
        key={`full-${i}`} 
        className={`text-secondary fill-current ${getSizeClass(size)}`} 
      />
    )
  }

  // Add half star if needed
  if (hasHalfStar) {
    stars.push(
      <div key="half" className="relative">
        <Star 
          className={`text-gray-300 ${getSizeClass(size)}`} 
        />
        <div className="absolute inset-0 overflow-hidden">
          <Star 
            className={`text-secondary fill-current ${getSizeClass(size)}`} 
            style={{ clipPath: 'inset(0 50% 0 0)' }}
          />
        </div>
      </div>
    )
  }

  // Add empty stars
  const emptyStars = 5 - Math.ceil(rating)
  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <Star 
        key={`empty-${i}`} 
        className={`text-gray-300 ${getSizeClass(size)}`} 
      />
    )
  }

  return (
    <div className="flex items-center space-x-1">
      <div className="flex">
        {stars}
      </div>
      {showNumber && (
        <span className="ml-2 text-sm font-medium text-gray-700">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  )
}

export default ReviewStars
