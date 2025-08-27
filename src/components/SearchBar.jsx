import { useState } from 'react'
import { Search, Filter, MapPin, Building2 } from 'lucide-react'

const SearchBar = ({ onSearch, categories = [], locations = [] }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  const handleSearch = (e) => {
    e.preventDefault()
    onSearch({
      searchTerm,
      category: selectedCategory,
      location: selectedLocation
    })
  }

  const handleReset = () => {
    setSearchTerm('')
    setSelectedCategory('')
    setSelectedLocation('')
    onSearch({ searchTerm: '', category: '', location: '' })
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSearch} className="space-y-4">
        {/* Main Search Input */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for businesses, services, or keywords..."
            className="input-field pl-10 text-lg"
          />
          <button
            type="submit"
            className="absolute inset-y-0 right-0 px-6 bg-secondary text-primary font-medium rounded-r-lg hover:bg-secondary-light transition-colors duration-200"
          >
            Search
          </button>
        </div>

        {/* Filter Toggle */}
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 text-primary hover:text-primary-dark transition-colors duration-200"
          >
            <Filter className="w-5 h-5" />
            <span className="font-medium">
              {showFilters ? 'Hide' : 'Show'} Filters
            </span>
          </button>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 bg-gray-50 rounded-xl">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Building2 className="w-4 h-4 inline mr-2" />
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="input-field"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Location Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="w-4 h-4 inline mr-2" />
                Location
              </label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="input-field"
              >
                <option value="">All Locations</option>
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>

            {/* Reset Button */}
            <div className="flex items-end">
              <button
                type="button"
                onClick={handleReset}
                className="w-full btn-outline"
              >
                Reset Filters
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  )
}

export default SearchBar
