import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useSearchParams } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Filter, MapPin, Building2 } from 'lucide-react'
import SearchBar from '../components/SearchBar'
import BusinessCard from '../components/BusinessCard'

const Directory = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [businesses, setBusinesses] = useState([])
  const [filteredBusinesses, setFilteredBusinesses] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState('name')
  const [sortOrder, setSortOrder] = useState('asc')
  
  const businessesPerPage = 12

  // Mock data for businesses
  const mockBusinesses = [
    {
      id: 1,
      name: "Liberia Tech Solutions",
      description: "Leading technology consulting and software development company serving businesses across Liberia with innovative digital solutions.",
      category: "Technology",
      location: "Monrovia",
      rating: 4.8,
      reviewCount: 24,
      phone: "+231 123 456 789",
      logo: null
    },
    {
      id: 2,
      name: "Green Earth Agriculture",
      description: "Sustainable farming practices and organic produce supplier, supporting local farmers and promoting food security in Liberia.",
      category: "Agriculture",
      location: "Gbarnga",
      rating: 4.6,
      reviewCount: 18,
      phone: "+231 987 654 321",
      logo: null
    },
    {
      id: 3,
      name: "Liberia Express Logistics",
      description: "Reliable shipping and logistics services connecting Liberia to the world, with fast delivery and competitive rates.",
      category: "Logistics",
      location: "Monrovia",
      rating: 4.7,
      reviewCount: 31,
      phone: "+231 555 123 456",
      logo: null
    },
    {
      id: 4,
      name: "Monrovia Medical Center",
      description: "Comprehensive healthcare services with modern facilities and experienced medical professionals.",
      category: "Healthcare",
      location: "Monrovia",
      rating: 4.9,
      reviewCount: 42,
      phone: "+231 777 888 999",
      logo: null
    },
    {
      id: 5,
      name: "Liberia University Press",
      description: "Educational publishing and academic resources supporting students and educators across Liberia.",
      category: "Education",
      location: "Monrovia",
      rating: 4.5,
      reviewCount: 15,
      phone: "+231 444 333 222",
      logo: null
    },
    {
      id: 6,
      name: "Liberia Bank & Trust",
      description: "Trusted financial services including loans, savings, and investment opportunities for individuals and businesses.",
      category: "Finance",
      location: "Monrovia",
      rating: 4.4,
      reviewCount: 28,
      phone: "+231 666 777 888",
      logo: null
    }
  ]

  const categories = [
    "Technology", "Agriculture", "Healthcare", "Education", 
    "Finance", "Manufacturing", "Tourism", "Transportation",
    "Retail", "Food & Beverage", "Construction", "Media"
  ]

  const locations = [
    "Monrovia", "Gbarnga", "Ganta", "Kakata", "Buchanan",
    "Zwedru", "Voinjama", "Harper", "Robertsport", "Sanniquellie"
  ]

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setBusinesses(mockBusinesses)
      setFilteredBusinesses(mockBusinesses)
      setLoading(false)
    }, 1000)
  }, [])

  useEffect(() => {
    // Get URL parameters
    const category = searchParams.get('category')
    const location = searchParams.get('location')
    const search = searchParams.get('search')

    if (category || location || search) {
      filterBusinesses({ category, location, search })
    }
  }, [searchParams])

  const filterBusinesses = (filters) => {
    let filtered = [...businesses]

    if (filters.search) {
      filtered = filtered.filter(business =>
        business.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        business.description.toLowerCase().includes(filters.search.toLowerCase()) ||
        business.category.toLowerCase().includes(filters.search.toLowerCase())
      )
    }

    if (filters.category) {
      filtered = filtered.filter(business =>
        business.category === filters.category
      )
    }

    if (filters.location) {
      filtered = filtered.filter(business =>
        business.location === filters.location
      )
    }

    setFilteredBusinesses(filtered)
    setCurrentPage(1)
  }

  const handleSearch = (searchParams) => {
    const params = new URLSearchParams()
    if (searchParams.searchTerm) params.set('search', searchParams.searchTerm)
    if (searchParams.category) params.set('category', searchParams.category)
    if (searchParams.location) params.set('location', searchParams.location)
    
    setSearchParams(params)
  }

  const sortBusinesses = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(field)
      setSortOrder('asc')
    }
  }

  const getSortedBusinesses = () => {
    return [...filteredBusinesses].sort((a, b) => {
      let aVal = a[sortBy]
      let bVal = b[sortBy]
      
      if (sortBy === 'rating') {
        aVal = parseFloat(aVal)
        bVal = parseFloat(bVal)
      }
      
      if (sortOrder === 'asc') {
        return aVal > bVal ? 1 : -1
      } else {
        return aVal < bVal ? 1 : -1
      }
    })
  }

  const sortedBusinesses = getSortedBusinesses()
  const totalPages = Math.ceil(sortedBusinesses.length / businessesPerPage)
  const startIndex = (currentPage - 1) * businessesPerPage
  const endIndex = startIndex + businessesPerPage
  const currentBusinesses = sortedBusinesses.slice(startIndex, endIndex)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Loading businesses...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>Business Directory - RiseList</title>
        <meta name="description" content="Browse and search through Liberia's comprehensive business directory. Find the services and companies you need." />
      </Helmet>

      <div className="min-h-screen bg-light">
        {/* Header */}
        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl md:text-4xl font-bold text-primary font-lato mb-4">
              Business Directory
            </h1>
            <p className="text-xl text-gray-600">
              Discover {filteredBusinesses.length} businesses across Liberia
            </p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <SearchBar 
            onSearch={handleSearch}
            categories={categories}
            locations={locations}
          />
        </div>

        {/* Results and Sorting */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <div className="mb-4 sm:mb-0">
              <p className="text-gray-600">
                Showing {startIndex + 1}-{Math.min(endIndex, filteredBusinesses.length)} of {filteredBusinesses.length} businesses
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 text-primary hover:text-primary-dark transition-colors duration-200"
              >
                <Filter className="w-5 h-5" />
                <span className="font-medium">
                  {showFilters ? 'Hide' : 'Show'} Advanced Filters
                </span>
              </button>
              
              <select
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => {
                  const [field, order] = e.target.value.split('-')
                  setSortBy(field)
                  setSortOrder(order)
                }}
                className="input-field max-w-xs"
              >
                <option value="name-asc">Name A-Z</option>
                <option value="name-desc">Name Z-A</option>
                <option value="rating-desc">Highest Rated</option>
                <option value="rating-asc">Lowest Rated</option>
                <option value="reviewCount-desc">Most Reviews</option>
              </select>
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
              <h3 className="text-lg font-semibold text-primary mb-4">Advanced Filters</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Building2 className="w-4 h-4 inline mr-2" />
                    Category
                  </label>
                  <select
                    value={searchParams.get('category') || ''}
                    onChange={(e) => {
                      const params = new URLSearchParams(searchParams)
                      if (e.target.value) {
                        params.set('category', e.target.value)
                      } else {
                        params.delete('category')
                      }
                      setSearchParams(params)
                    }}
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

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="w-4 h-4 inline mr-2" />
                    Location
                  </label>
                  <select
                    value={searchParams.get('location') || ''}
                    onChange={(e) => {
                      const params = new URLSearchParams(searchParams)
                      if (e.target.value) {
                        params.set('location', e.target.value)
                      } else {
                        params.delete('location')
                      }
                      setSearchParams(params)
                    }}
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

                <div className="flex items-end">
                  <button
                    onClick={() => {
                      setSearchParams({})
                      setShowFilters(false)
                    }}
                    className="w-full btn-outline"
                  >
                    Clear All Filters
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Business Listings */}
          {currentBusinesses.length > 0 ? (
            <div className="space-y-6">
              {currentBusinesses.map((business) => (
                <BusinessCard key={business.id} business={business} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No businesses found</h3>
              <p className="text-gray-500 mb-6">
                Try adjusting your search criteria or browse all categories
              </p>
              <button
                onClick={() => setSearchParams({})}
                className="btn-primary"
              >
                View All Businesses
              </button>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2 mt-12">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-2 rounded-lg border ${
                    currentPage === page
                      ? 'border-primary bg-primary text-white'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}
              
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Directory
