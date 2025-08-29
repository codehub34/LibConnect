// src/pages/Directory.jsx

import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSearchParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Filter, MapPin, Building2 } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import BusinessCard from '../components/BusinessCard';
import { mockBusinesses, categories, locations } from '../data/businesses.js';
import { useBusinessFilter } from '../hooks/useBusinessFilter.js';

const Directory = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [businesses, setBusinesses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [showFilters, setShowFilters] = useState(false);

    const businessesPerPage = 12;

    const filteredAndSortedBusinesses = useBusinessFilter(businesses);

    // Initial data loading
    useEffect(() => {
        setTimeout(() => {
            setBusinesses(mockBusinesses);
            setLoading(false);
        }, 1000);
    }, []);

    // Reset page to 1 whenever filters/sort change
    useEffect(() => {
        setCurrentPage(1);
    }, [filteredAndSortedBusinesses, searchParams]);

    // Handler functions
    const handleSearch = (searchData) => {
        const newParams = new URLSearchParams(searchParams);
        
        if (newParams.has('search') || newParams.has('category') || newParams.has('location')) {
            newParams.delete('search');
            newParams.delete('category');
            newParams.delete('location');
        }

        if (searchData.searchTerm) newParams.set('search', searchData.searchTerm);
        if (searchData.category) newParams.set('category', searchData.category);
        if (searchData.location) newParams.set('location', searchData.location);
        
        setSearchParams(newParams);
    };

    const handleSortChange = (e) => {
        const [field, order] = e.target.value.split('-');
        const newParams = new URLSearchParams(searchParams);
        newParams.set('sortBy', field);
        newParams.set('sortOrder', order);
        setSearchParams(newParams);
    };

    const handleClearFilters = () => {
        const newParams = new URLSearchParams();
        setSearchParams(newParams);
        setShowFilters(false);
    };

    // Pagination logic
    const totalPages = Math.ceil(filteredAndSortedBusinesses.length / businessesPerPage);
    const startIndex = (currentPage - 1) * businessesPerPage;
    const endIndex = startIndex + businessesPerPage;
    const currentBusinesses = filteredAndSortedBusinesses.slice(startIndex, endIndex);

    // Render the component
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
                    <p className="mt-4 text-lg text-gray-600">Loading businesses...</p>
                </div>
            </div>
        );
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
                            Discover {filteredAndSortedBusinesses.length} businesses across Liberia
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
                                Showing {startIndex + 1}-{Math.min(endIndex, filteredAndSortedBusinesses.length)} of {filteredAndSortedBusinesses.length} businesses
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
                                value={`${searchParams.get('sortBy') || 'name'}-${searchParams.get('sortOrder') || 'asc'}`}
                                onChange={handleSortChange}
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
                                            const params = new URLSearchParams(searchParams);
                                            if (e.target.value) {
                                                params.set('category', e.target.value);
                                            } else {
                                                params.delete('category');
                                            }
                                            setSearchParams(params);
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
                                            const params = new URLSearchParams(searchParams);
                                            if (e.target.value) {
                                                params.set('location', e.target.value);
                                            } else {
                                                params.delete('location');
                                            }
                                            setSearchParams(params);
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
                                        onClick={handleClearFilters}
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
    );
};

export default Directory;