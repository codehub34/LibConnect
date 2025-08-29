import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight, Building2, Users, Globe, Award, Star, Clock, Crown } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import BusinessCard from '../components/BusinessCard';
// Import the data from the businesses.js file
import { mockBusinesses, categories } from '/src/data/businesses.js'; 

const Home = () => {
    // This is where you should pull the featured businesses from your mock data
    // Use .slice(0, 3) to get the first three businesses from the imported array.
    const featuredBusinesses = mockBusinesses.slice(0, 3);
  
    // Assuming the 'categories' data is also now imported from the same file.
    // If not, you should import it as well.
    
    const handleSearch = (searchParams) => {
        console.log('Search params:', searchParams);
    };

    return (
        <>
            <Helmet>
                <title>RiseList - Connecting Liberia's Businesses to the Digital World</title>
                <meta name="description" content="Discover and connect with Liberia's best businesses. From technology to agriculture, find the services you need on RiseList." />
            </Helmet>

            {/* Hero Section */}
            <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold font-lato mb-6">
                        Connecting Liberia's Businesses to the
                        <span className="text-secondary block">Digital World</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
                        Discover, connect, and grow with Liberia's vibrant business community.
                        Find the services you need and showcase your business to the world.
                    </p>
                    
                    {/* Search Bar */}
                    <div className="mb-8">
                        <SearchBar onSearch={handleSearch} />
                    </div>
                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/directory"
                            className="btn-secondary text-lg px-8 py-4 inline-flex items-center space-x-2"
                        >
                            <span>Explore Businesses</span>
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                        <Link
                            to="/add-listing"
                            className="btn-outline text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-primary"
                        >
                            Add Your Business
                        </Link>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-light">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
                        <div className="space-y-2">
                            <div className="text-4xl font-bold text-primary">500+</div>
                            <div className="text-gray-600">Businesses Listed</div>
                        </div>
                        <div className="space-y-2">
                            <div className="text-4xl font-bold text-primary">25+</div>
                            <div className="text-gray-600">Categories</div>
                        </div>
                        <div className="space-y-2">
                            <div className="text-4xl font-bold text-primary">15+</div>
                            <div className="text-gray-600">Cities Covered</div>
                        </div>
                        <div className="space-y-2">
                            <div className="text-4xl font-bold text-primary">10K+</div>
                            <div className="text-gray-600">Monthly Visitors</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Businesses */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-primary font-lato mb-4">
                            Featured Businesses
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Discover some of Liberia's most trusted and innovative businesses
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuredBusinesses.map((business) => (
                            <BusinessCard key={business.id} business={business} />
                        ))}
                    </div>
                    
                    <div className="text-center mt-12">
                        <Link
                            to="/directory"
                            className="btn-primary text-lg px-8 py-4 inline-flex items-center space-x-2"
                        >
                            <span>View All Businesses</span>
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="py-16 bg-light">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-primary font-lato mb-4">
                            Browse by Category
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Find businesses in your industry or discover new opportunities
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {categories.map((category) => (
                            <Link
                                key={category.name}
                                to={`/directory?category=${encodeURIComponent(category.name)}`}
                                className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-all duration-200 group"
                            >
                                <div className="text-4xl mb-3">{category.icon}</div>
                                <h3 className="text-lg font-semibold text-primary mb-2 group-hover:text-secondary transition-colors duration-200">
                                    {category.name}
                                </h3>
                                <p className="text-gray-600">{category.count} businesses</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
            
            {/* Why Choose RiseList */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-primary font-lato mb-4">
                            Why Choose RiseList?
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            We're building the future of business connectivity in Liberia
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Building2 className="w-8 h-8 text-primary" />
                            </div>
                            <h3 className="text-xl font-semibold text-primary mb-2">Verified Businesses</h3>
                            <p className="text-gray-600">All listings are verified and reviewed for quality</p>
                        </div>
                        
                        <div className="text-center">
                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Users className="w-8 h-8 text-primary" />
                            </div>
                            <h3 className="text-xl font-semibold text-primary mb-2">Community Driven</h3>
                            <p className="text-gray-600">Built by and for the Liberian business community</p>
                        </div>
                        
                        <div className="text-center">
                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Globe className="w-8 h-8 text-primary" />
                            </div>
                            <h3 className="text-xl font-semibold text-primary mb-2">Global Reach</h3>
                            <p className="text-gray-600">Connect with customers and partners worldwide</p>
                        </div>
                        
                        <div className="text-center">
                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Award className="w-8 h-8 text-primary" />
                            </div>
                            <h3 className="text-xl font-semibold text-primary mb-2">Quality Assured</h3>
                            <p className="text-gray-600">Maintaining high standards for all listings</p>
                        </div>
                    </div>
                </div>
            </section>
            {/* Pricing CTA Section */}
            <section className="py-20 bg-gradient-to-r from-secondary to-secondary-light">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-primary font-lato mb-4">
                            Choose Your Growth Plan
                        </h2>
                        <p className="text-xl text-primary/80 max-w-2xl mx-auto">
                            Start with a free trial and unlock powerful features to grow your business
                        </p>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-8 mb-8">
                        <div className="bg-white rounded-xl p-6 text-center">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Clock className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="text-xl font-semibold text-primary mb-2">Basic</h3>
                            <p className="text-2xl font-bold text-primary mb-2">Free Trial</p>
                            <p className="text-gray-600 mb-4">1 month with full Standard features</p>
                            <ul className="text-sm text-gray-600 space-y-2 mb-6">
                                <li>✓ Basic business profile</li>
                                <li>✓ Standard listing placement</li>
                                <li>✓ Email support</li>
                            </ul>
                        </div>
                        
                        <div className="bg-white rounded-xl p-6 text-center border-2 border-primary">
                            <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                                <Star className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="text-xl font-semibold text-primary mb-2">Standard</h3>
                            <p className="text-2xl font-bold text-primary mb-2">$1.25/month</p>
                            <p className="text-gray-600 mb-4">Enhanced features for growing businesses</p>
                            <ul className="text-sm text-gray-600 space-y-2 mb-6">
                                <li>✓ Enhanced business profile</li>
                                <li>✓ Photo gallery (up to 10 images)</li>
                                <li>✓ Priority listing placement</li>
                                <li>✓ Advanced analytics</li>
                            </ul>
                        </div>
                        
                        <div className="bg-white rounded-xl p-6 text-center">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Crown className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="text-xl font-semibold text-primary mb-2">Premium</h3>
                            <p className="text-2xl font-bold text-primary mb-2">$2.50/month</p>
                            <p className="text-gray-600 mb-4">Maximum visibility and premium features</p>
                            <ul className="text-sm text-gray-600 space-y-2 mb-6">
                                <li>✓ Featured placement</li>
                                <li>✓ Unlimited photo gallery</li>
                                <li>✓ Video content support</li>
                                <li>✓ Comprehensive analytics</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div className="text-center">
                        <Link
                            to="/pricing"
                            className="btn-primary text-lg px-8 py-4"
                        >
                            View All Plans & Features
                        </Link>
                    </div>
                </div>
            </section>
            {/* CTA Section */}
            <section className="py-20 bg-primary text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold font-lato mb-6">
                        Ready to Grow Your Business?
                    </h2>
                    <p className="text-xl text-gray-200 mb-8">
                        Join hundreds of businesses already listed on RiseList and start connecting with customers today.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/add-listing"
                            className="btn-secondary text-lg px-8 py-4"
                        >
                            List Your Business
                        </Link>
                        <Link
                            to="/contact"
                            className="btn-outline text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-primary"
                        >
                            Get in Touch
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;