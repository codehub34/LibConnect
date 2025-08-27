import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { 
  Building2, Users, Eye, CheckCircle, XCircle, 
  TrendingUp, BarChart3, Settings, Filter,
  Search, Calendar, MapPin, Star, CreditCard
} from 'lucide-react'

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [pendingBusinesses, setPendingBusinesses] = useState([])
  const [approvedBusinesses, setApprovedBusinesses] = useState([])
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)


  // Mock data for pending businesses
  const mockPendingBusinesses = [
    {
      id: 1,
      name: "Liberia Fresh Foods",
      category: "Food & Beverage",
      location: "Monrovia",
      submittedBy: "john.doe@email.com",
      submittedDate: "2024-01-20",
      description: "Fresh produce and organic foods supplier serving Monrovia and surrounding areas."
    },
    {
      id: 2,
      name: "Tech Solutions Liberia",
      category: "Technology",
      location: "Gbarnga",
      submittedBy: "sarah.tech@email.com",
      submittedDate: "2024-01-19",
      description: "IT consulting and software development services for businesses across Liberia."
    },
    {
      id: 3,
      name: "Liberia Construction Co.",
      category: "Construction",
      location: "Monrovia",
      submittedBy: "mike.build@email.com",
      submittedDate: "2024-01-18",
      description: "Professional construction and renovation services for residential and commercial projects."
    }
  ]

  // Mock data for approved businesses
  const mockApprovedBusinesses = [
    {
      id: 101,
      name: "Liberia Tech Solutions",
      category: "Technology",
      location: "Monrovia",
      approvedDate: "2024-01-15",
      views: 245,
      rating: 4.8,
      status: "active"
    },
    {
      id: 102,
      name: "Green Earth Agriculture",
      category: "Agriculture",
      location: "Gbarnga",
      approvedDate: "2024-01-14",
      views: 189,
      rating: 4.6,
      status: "active"
    }
  ]

  // Mock data for users
  const mockUsers = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@email.com",
      role: "business_owner",
      joinDate: "2024-01-10",
      status: "active",
      businesses: 2
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      role: "business_owner",
      joinDate: "2024-01-08",
      status: "active",
      businesses: 1
    }
  ]

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setPendingBusinesses(mockPendingBusinesses)
      setApprovedBusinesses(mockApprovedBusinesses)
      setUsers(mockUsers)
      setLoading(false)
    }, 1000)
  }, [])

  const handleApprove = (businessId) => {
    setPendingBusinesses(prev => prev.filter(b => b.id !== businessId))
    toast.success('Business approved successfully!')
  }

  const handleReject = (businessId) => {
    setPendingBusinesses(prev => prev.filter(b => b.id !== businessId))
    toast.success('Business rejected and removed from queue.')
  }

  const stats = [
    { label: "Total Businesses", value: "500+", icon: Building2, color: "text-blue-600" },
    { label: "Pending Approvals", value: pendingBusinesses.length, icon: Eye, color: "text-yellow-600" },
    { label: "Active Users", value: "2,500+", icon: Users, color: "text-green-600" },
    { label: "Monthly Views", value: "15K+", icon: TrendingUp, color: "text-purple-600" }
  ]

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - RiseList</title>
        <meta name="description" content="Admin dashboard for managing RiseList business directory, approvals, and analytics." />
      </Helmet>

      <div className="min-h-screen bg-light">
        {/* Header */}
        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl md:text-4xl font-bold text-primary font-lato mb-2">
              Admin Dashboard
            </h1>
            <p className="text-xl text-gray-600">
              Manage RiseList business directory, approvals, and platform analytics
            </p>
          </div>
        </div>

        {/* Stats Overview */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <div key={index} className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                        <p className="text-2xl font-bold text-primary">{stat.value}</p>
                      </div>
                      <div className={`w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center`}>
                        <Icon className={`w-6 h-6 ${stat.color}`} />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-sm mb-6">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  {[
                    { id: 'overview', label: 'Overview', icon: BarChart3 },
                    { id: 'pending', label: 'Pending Approvals', icon: Eye },
                    { id: 'businesses', label: 'All Businesses', icon: Building2 },
                    { id: 'users', label: 'Users', icon: Users },
                    { id: 'subscriptions', label: 'Subscriptions', icon: CreditCard },
                    { id: 'settings', label: 'Settings', icon: Settings }
                  ].map((tab) => {
                    const Icon = tab.icon
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                          activeTab === tab.id
                            ? 'border-primary text-primary'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{tab.label}</span>
                      </button>
                    )
                  })}
                </nav>
              </div>

              <div className="p-6">
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-primary mb-4">Platform Overview</h3>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="bg-light rounded-lg p-6">
                        <h4 className="font-semibold text-primary mb-4">Recent Activity</h4>
                        <div className="space-y-3">
                          <div className="flex items-center space-x-3 text-sm">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span>3 new business submissions today</span>
                          </div>
                          <div className="flex items-center space-x-3 text-sm">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span>15 businesses approved this week</span>
                          </div>
                          <div className="flex items-center space-x-3 text-sm">
                            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                            <span>2,500+ page views yesterday</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-light rounded-lg p-6">
                        <h4 className="font-semibold text-primary mb-4">Quick Actions</h4>
                        <div className="space-y-3">
                          <button className="w-full btn-primary text-sm py-2">
                            Review Pending Businesses
                          </button>
                          <button className="w-full btn-outline text-sm py-2">
                            View Analytics Report
                          </button>
                          <button className="w-full btn-outline text-sm py-2">
                            Manage Users
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Pending Approvals Tab */}
                {activeTab === 'pending' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-primary">
                        Pending Business Approvals ({pendingBusinesses.length})
                      </h3>
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <input
                            type="text"
                            placeholder="Search businesses..."
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          />
                        </div>
                        <button className="flex items-center space-x-2 text-primary hover:text-primary-dark">
                          <Filter className="w-4 h-4" />
                          <span>Filter</span>
                        </button>
                      </div>
                    </div>
                    
                    {pendingBusinesses.length > 0 ? (
                      <div className="space-y-4">
                        {pendingBusinesses.map((business) => (
                          <div key={business.id} className="border border-gray-200 rounded-lg p-6">
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex-1">
                                <h4 className="text-lg font-semibold text-primary mb-2">{business.name}</h4>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                                  <div className="flex items-center space-x-2">
                                    <Building2 className="w-4 h-4" />
                                    <span>{business.category}</span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <MapPin className="w-4 h-4" />
                                    <span>{business.location}</span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <Calendar className="w-4 h-4" />
                                    <span>{business.submittedDate}</span>
                                  </div>
                                </div>
                                <p className="text-gray-700 mt-3">{business.description}</p>
                                <p className="text-sm text-gray-500 mt-2">
                                  Submitted by: {business.submittedBy}
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-3">
                              <button
                                onClick={() => handleApprove(business.id)}
                                className="btn-primary flex items-center space-x-2"
                              >
                                <CheckCircle className="w-4 h-4" />
                                <span>Approve</span>
                              </button>
                              <button
                                onClick={() => handleReject(business.id)}
                                className="btn-outline text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
                              >
                                <XCircle className="w-4 h-4" />
                                <span>Reject</span>
                              </button>
                              <button className="btn-outline">
                                <Eye className="w-4 h-4" />
                                <span>View Details</span>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <CheckCircle className="w-8 h-8 text-green-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">All caught up!</h3>
                        <p className="text-gray-500">No pending business approvals at the moment.</p>
                      </div>
                    )}
                  </div>
                )}

                {/* All Businesses Tab */}
                {activeTab === 'businesses' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-primary">
                        All Businesses ({approvedBusinesses.length})
                      </h3>
                      <div className="flex items-center space-x-3">
                        <input
                          type="text"
                          placeholder="Search businesses..."
                          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                          <option>All Categories</option>
                          <option>Technology</option>
                          <option>Agriculture</option>
                          <option>Healthcare</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      {approvedBusinesses.map((business) => (
                        <div key={business.id} className="border border-gray-200 rounded-lg p-6">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <h4 className="text-lg font-semibold text-primary mb-2">{business.name}</h4>
                              <div className="flex items-center space-x-6 text-sm text-gray-600">
                                <span>{business.category}</span>
                                <span>{business.location}</span>
                                <span>Approved: {business.approvedDate}</span>
                                <span className="flex items-center space-x-1">
                                  <Star className="w-4 h-4 text-secondary" />
                                  <span>{business.rating}</span>
                                </span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-primary">{business.views}</div>
                              <div className="text-sm text-gray-500">views</div>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-3 mt-4">
                            <button className="btn-outline text-sm py-2">
                              <Eye className="w-4 h-4 mr-2" />
                              View
                            </button>
                            <button className="btn-outline text-sm py-2">
                              <Settings className="w-4 h-4 mr-2" />
                              Edit
                            </button>
                            <button className="btn-outline text-red-600 border-red-600 text-sm py-2">
                              <XCircle className="w-4 h-4 mr-2" />
                              Suspend
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Users Tab */}
                {activeTab === 'users' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-primary">
                        Platform Users ({users.length})
                      </h3>
                      <button className="btn-primary">
                        <Users className="w-4 h-4 mr-2" />
                        Add User
                      </button>
                    </div>
                    
                    <div className="space-y-4">
                      {users.map((user) => (
                        <div key={user.id} className="border border-gray-200 rounded-lg p-6">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <h4 className="text-lg font-semibold text-primary mb-2">{user.name}</h4>
                              <div className="flex items-center space-x-6 text-sm text-gray-600">
                                <span>{user.email}</span>
                                <span className="capitalize">{user.role.replace('_', ' ')}</span>
                                <span>Joined: {user.joinDate}</span>
                                <span>{user.businesses} businesses</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                user.status === 'active' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {user.status}
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-3 mt-4">
                            <button className="btn-outline text-sm py-2">
                              <Eye className="w-4 h-4 mr-2" />
                              View Profile
                            </button>
                            <button className="btn-outline text-sm py-2">
                              <Settings className="w-4 h-4 mr-2" />
                              Edit
                            </button>
                            <button className="btn-outline text-red-600 border-red-600 text-sm py-2">
                              <XCircle className="w-4 h-4 mr-2" />
                              Suspend
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Subscriptions Tab */}
                {activeTab === 'subscriptions' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-primary">
                        Subscription Management
                      </h3>
                      <button className="btn-primary">
                        <CreditCard className="w-4 h-4 mr-2" />
                        Export Data
                      </button>
                    </div>
                    
                    {/* Subscription Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      <div className="bg-white rounded-lg p-6 border border-gray-200">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-600">Total Subscribers</p>
                            <p className="text-2xl font-bold text-primary">1,247</p>
                          </div>
                          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <CreditCard className="w-6 h-6 text-blue-600" />
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-white rounded-lg p-6 border border-gray-200">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-600">Trial Users</p>
                            <p className="text-2xl font-bold text-yellow-600">89</p>
                          </div>
                          <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                            <Clock className="w-6 h-6 text-yellow-600" />
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-white rounded-lg p-6 border border-gray-200">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
                            <p className="text-2xl font-bold text-green-600">23.4%</p>
                          </div>
                          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                            <TrendingUp className="w-6 h-6 text-green-600" />
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-white rounded-lg p-6 border border-gray-200">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                            <p className="text-2xl font-bold text-purple-600">$8,450</p>
                          </div>
                          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                            <BarChart3 className="w-6 h-6 text-purple-600" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Trial Users */}
                    <div className="bg-white rounded-lg border border-gray-200">
                      <div className="px-6 py-4 border-b border-gray-200">
                        <h4 className="text-lg font-semibold text-primary">Trial Users (Expiring Soon)</h4>
                      </div>
                      <div className="p-6">
                        <div className="space-y-4">
                          {[
                            {
                              id: 1,
                              name: "John Doe",
                              email: "john.doe@email.com",
                              business: "Liberia Tech Solutions",
                              trialEnds: "2024-02-01",
                              daysLeft: 3
                            },
                            {
                              id: 2,
                              name: "Sarah Johnson",
                              email: "sarah.johnson@email.com",
                              business: "Green Earth Agriculture",
                              trialEnds: "2024-02-03",
                              daysLeft: 5
                            }
                          ].map((user) => (
                            <div key={user.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                              <div className="flex-1">
                                <h5 className="font-semibold text-gray-900">{user.name}</h5>
                                <p className="text-sm text-gray-600">{user.email}</p>
                                <p className="text-sm text-gray-600">{user.business}</p>
                              </div>
                              <div className="text-right">
                                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                                  user.daysLeft <= 3 ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                  {user.daysLeft} days left
                                </div>
                                <p className="text-sm text-gray-600 mt-1">Expires: {user.trialEnds}</p>
                              </div>
                              <div className="ml-4 space-x-2">
                                <button className="btn-outline text-sm py-2">
                                  <Eye className="w-4 h-4 mr-2" />
                                  View
                                </button>
                                <button className="btn-primary text-sm py-2">
                                  <CreditCard className="w-4 h-4 mr-2" />
                                  Contact
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Billing Issues */}
                    <div className="bg-white rounded-lg border border-gray-200">
                      <div className="px-6 py-4 border-b border-gray-200">
                        <h4 className="text-lg font-semibold text-primary">Billing Issues</h4>
                      </div>
                      <div className="p-6">
                        <div className="space-y-4">
                          {[
                            {
                              id: 1,
                              name: "Mike Wilson",
                              email: "mike.wilson@email.com",
                              business: "Liberia Construction Co.",
                              issue: "Payment failed",
                              lastAttempt: "2024-01-20"
                            }
                          ].map((user) => (
                            <div key={user.id} className="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-red-50">
                              <div className="flex-1">
                                <h5 className="font-semibold text-gray-900">{user.name}</h5>
                                <p className="text-sm text-gray-600">{user.email}</p>
                                <p className="text-sm text-gray-600">{user.business}</p>
                                <p className="text-sm text-red-600 font-medium">{user.issue}</p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm text-gray-600">Last attempt: {user.lastAttempt}</p>
                              </div>
                              <div className="ml-4 space-x-2">
                                <button className="btn-outline text-sm py-2">
                                  <Eye className="w-4 h-4 mr-2" />
                                  View
                                </button>
                                <button className="btn-primary text-sm py-2">
                                  <CreditCard className="w-4 h-4 mr-2" />
                                  Resolve
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Settings Tab */}
                {activeTab === 'settings' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-primary mb-4">Platform Settings</h3>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="bg-light rounded-lg p-6">
                        <h4 className="font-semibold text-primary mb-4">General Settings</h4>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Auto-approve businesses
                            </label>
                            <select className="input-field">
                              <option>Disabled</option>
                              <option>Enabled</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Review period (days)
                            </label>
                            <input type="number" className="input-field" defaultValue="2" />
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-light rounded-lg p-6">
                        <h4 className="font-semibold text-primary mb-4">Email Notifications</h4>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-700">New business submissions</span>
                            <input type="checkbox" className="rounded" defaultChecked />
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-700">Weekly reports</span>
                            <input type="checkbox" className="rounded" />
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-700">System alerts</span>
                            <input type="checkbox" className="rounded" defaultChecked />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <button className="btn-primary">Save Settings</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default AdminDashboard
