import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  CreditCard, 
  Calendar, 
  Download, 
  Settings, 
  Crown, 
  Star, 
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Users,
  BarChart3
} from 'lucide-react';
import toast from 'react-hot-toast';

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState('subscription');
  const [subscription, setSubscription] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpgrading, setIsUpgrading] = useState(false);

  // Mock data for demonstration
  const mockSubscription = {
    id: 1,
    userId: 1,
    tier: 'basic',
    status: 'trial',
    trialStart: '2024-01-01',
    trialEnd: '2024-02-01',
    nextBilling: null,
    autoRenew: false
  };

  const mockTransactions = [
    {
      id: 1,
      userId: 1,
      amount: 0,
      currency: 'USD',
      type: 'trial_start',
      status: 'completed',
      timestamp: '2024-01-01T00:00:00Z',
      description: 'Free Trial Started'
    }
  ];

  useEffect(() => {
    // Simulate loading with mock data
    setTimeout(() => {
      setSubscription(mockSubscription);
      setTransactions(mockTransactions);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleUpgrade = async (newTier) => {
    if (subscription?.tier === newTier) {
      toast.error(`You are already on the ${newTier} plan`);
      return;
    }

    setIsUpgrading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const updatedSubscription = {
        ...mockSubscription,
        tier: newTier,
        status: 'active',
        trialEnd: null,
        nextBilling: '2024-02-01',
        autoRenew: true
      };
      
      setSubscription(updatedSubscription);
      toast.success(`Successfully upgraded to ${newTier} plan`);
      setIsUpgrading(false);
    }, 1500);
  };

  const handleCancelSubscription = async () => {
    if (!subscription) return;

    try {
      // Simulate API call
      setTimeout(() => {
        const updatedSubscription = {
          ...subscription,
          status: 'cancelled',
          autoRenew: false
        };
        
        setSubscription(updatedSubscription);
        toast.success('Subscription cancelled successfully');
      }, 1000);
    } catch (error) {
      console.error('Error cancelling subscription:', error);
      toast.error('Failed to cancel subscription');
    }
  };

  const handleReactivateSubscription = async () => {
    if (!subscription) return;

    try {
      // Simulate API call
      setTimeout(() => {
        const updatedSubscription = {
          ...subscription,
          status: 'active',
          autoRenew: true
        };
        
        setSubscription(updatedSubscription);
        toast.success('Subscription reactivated successfully');
      }, 1000);
    } catch (error) {
      console.error('Error reactivating subscription:', error);
      toast.error('Failed to reactivate subscription');
    }
  };

  const getTierIcon = (tier) => {
    switch (tier) {
      case 'basic': return Clock;
      case 'standard': return Star;
      case 'premium': return Crown;
      default: return Clock;
    }
  };

  const getTierColor = (tier) => {
    switch (tier) {
      case 'basic': return 'text-gray-600';
      case 'standard': return 'text-secondary';
      case 'premium': return 'text-primary';
      default: return 'text-gray-600';
    }
  };

  const getStatusBadge = (status, cancelAtPeriodEnd) => {
    if (cancelAtPeriodEnd) {
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
          <AlertCircle className="w-4 h-4 mr-1" />
          Cancelling
        </span>
      );
    }

    switch (status) {
      case 'trial':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
            <Clock className="w-4 h-4 mr-1" />
            Trial
          </span>
        );
      case 'active':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
            <CheckCircle className="w-4 h-4 mr-1" />
            Active
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
            Unknown
          </span>
        );
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount / 100);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-light flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Dashboard - RiseList</title>
        <meta name="description" content="Manage your RiseList subscription, billing, and business profile from your personal dashboard." />
      </Helmet>

      <div className="min-h-screen bg-light">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-2">Manage your subscription and business profile</p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <nav className="bg-white rounded-xl shadow-sm p-6">
                <div className="space-y-2">
                  <button
                    onClick={() => setActiveTab('subscription')}
                    className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                      activeTab === 'subscription'
                        ? 'bg-primary text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 inline mr-3" />
                    Subscription
                  </button>
                  <button
                    onClick={() => setActiveTab('billing')}
                    className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                      activeTab === 'billing'
                        ? 'bg-primary text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Calendar className="w-5 h-5 inline mr-3" />
                    Billing History
                  </button>
                  <button
                    onClick={() => setActiveTab('profile')}
                    className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                      activeTab === 'profile'
                        ? 'bg-primary text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Settings className="w-5 h-5 inline mr-3" />
                    Profile Settings
                  </button>
                </div>
              </nav>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Subscription Tab */}
              {activeTab === 'subscription' && (
                <div className="space-y-6">
                  {/* Current Plan */}
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold text-gray-900">Current Plan</h2>
                      {getStatusBadge(subscription?.status, subscription?.cancelAtPeriodEnd)}
                    </div>

                    {subscription ? (
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <div className="flex items-center mb-4">
                            {(() => {
                              const IconComponent = getTierIcon(subscription.tier);
                              return <IconComponent className={`w-8 h-8 mr-3 ${getTierColor(subscription.tier)}`} />;
                            })()}
                            <div>
                              <h3 className="text-xl font-semibold text-gray-900 capitalize">
                                {subscription.tier} Plan
                              </h3>
                              <p className="text-gray-600">
                                {subscription.status === 'trial' ? 'Free Trial' : 
                                 subscription.tier === 'standard' ? '$6.25/month' : 
                                 subscription.tier === 'premium' ? '$12.50/month' : 'Free'}
                              </p>
                            </div>
                          </div>

                          <div className="space-y-3 text-sm text-gray-600">
                            <div className="flex justify-between">
                              <span>Status:</span>
                              <span className="font-medium capitalize">{subscription.status}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Current Period:</span>
                              <span className="font-medium">
                                {formatDate(subscription.currentPeriodStart)} - {formatDate(subscription.currentPeriodEnd)}
                              </span>
                            </div>
                            {subscription.status === 'trial' && (
                              <div className="flex justify-between">
                                <span>Trial Ends:</span>
                                <span className="font-medium">{formatDate(subscription.trialEndDate)}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h4 className="font-semibold text-gray-900">Plan Features</h4>
                          <div className="space-y-2">
                            {subscription.tier === 'basic' && (
                              <>
                                <div className="flex items-center text-sm text-gray-600">
                                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                                  Basic business profile
                                </div>
                                <div className="flex items-center text-sm text-gray-600">
                                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                                  Standard listing placement
                                </div>
                                <div className="flex items-center text-sm text-gray-600">
                                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                                  Email support
                                </div>
                              </>
                            )}
                            {subscription.tier === 'standard' && (
                              <>
                                <div className="flex items-center text-sm text-gray-600">
                                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                                  Enhanced business profile
                                </div>
                                <div className="flex items-center text-sm text-gray-600">
                                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                                  Photo gallery (up to 10 images)
                                </div>
                                <div className="flex items-center text-sm text-gray-600">
                                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                                  Priority listing placement
                                </div>
                                <div className="flex items-center text-sm text-gray-600">
                                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                                  Advanced analytics
                                </div>
                              </>
                            )}
                            {subscription.tier === 'premium' && (
                              <>
                                <div className="flex items-center text-sm text-gray-600">
                                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                                  Featured placement
                                </div>
                                <div className="flex items-center text-sm text-gray-600">
                                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                                  Unlimited photo gallery
                                </div>
                                <div className="flex items-center text-sm text-gray-600">
                                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                                  Video content support
                                </div>
                                <div className="flex items-center text-sm text-gray-600">
                                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                                  Comprehensive analytics
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Clock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Active Subscription</h3>
                        <p className="text-gray-600 mb-4">Start with a free trial to get access to enhanced features</p>
                        <Link
                          to="/pricing"
                          className="btn-primary inline-block"
                        >
                          View Plans
                        </Link>
                      </div>
                    )}
                  </div>

                  {/* Upgrade Options */}
                  {subscription && (
                    <div className="bg-white rounded-xl shadow-sm p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Upgrade Your Plan</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {subscription.tier !== 'standard' && (
                          <button
                            onClick={() => handleUpgrade('standard')}
                            disabled={isUpgrading}
                            className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-secondary hover:bg-secondary/5 transition-colors"
                          >
                            <div className="flex items-center">
                              <Star className="w-6 h-6 text-secondary mr-3" />
                              <div className="text-left">
                                <h4 className="font-semibold text-gray-900">Standard Plan</h4>
                                <p className="text-sm text-gray-600">$6.25/month</p>
                              </div>
                            </div>
                            <span className="text-secondary font-medium">Upgrade</span>
                          </button>
                        )}
                        
                        {subscription.tier !== 'premium' && (
                          <button
                            onClick={() => handleUpgrade('premium')}
                            disabled={isUpgrading}
                            className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors"
                          >
                            <div className="flex items-center">
                              <Crown className="w-6 h-6 text-primary mr-3" />
                              <div className="text-left">
                                <h4 className="font-semibold text-gray-900">Premium Plan</h4>
                                <p className="text-sm text-gray-600">$12.50/month</p>
                              </div>
                            </div>
                            <span className="text-primary font-medium">Upgrade</span>
                          </button>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Subscription Actions */}
                  {subscription && (
                    <div className="bg-white rounded-xl shadow-sm p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Subscription Actions</h3>
                      <div className="flex flex-wrap gap-4">
                        {subscription.cancelAtPeriodEnd ? (
                          <button
                            onClick={handleReactivateSubscription}
                            className="btn-secondary"
                          >
                            Reactivate Subscription
                          </button>
                        ) : (
                          <button
                            onClick={handleCancelSubscription}
                            className="btn-outline border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                          >
                            Cancel Subscription
                          </button>
                        )}
                        <Link
                          to="/pricing"
                          className="btn-outline"
                        >
                          View All Plans
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Billing History Tab */}
              {activeTab === 'billing' && (
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Billing History</h2>
                    <button className="btn-outline">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </button>
                  </div>

                  {transactions.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="text-left py-3 px-4 font-semibold text-gray-900">Date</th>
                            <th className="text-left py-3 px-4 font-semibold text-gray-900">Description</th>
                            <th className="text-left py-3 px-4 font-semibold text-gray-900">Amount</th>
                            <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {transactions.map((transaction) => (
                            <tr key={transaction.id} className="hover:bg-gray-50">
                              <td className="py-3 px-4 text-sm text-gray-600">
                                {formatDate(transaction.createdAt)}
                              </td>
                              <td className="py-3 px-4 text-sm text-gray-900">
                                {transaction.paymentMethod === 'stripe' ? 'Stripe Payment' : 'Payment'}
                              </td>
                              <td className="py-3 px-4 text-sm font-medium text-gray-900">
                                {formatCurrency(transaction.amount)}
                              </td>
                              <td className="py-3 px-4">
                                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                  transaction.status === 'succeeded' 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-red-100 text-red-800'
                                }`}>
                                  {transaction.status === 'succeeded' ? 'Paid' : 'Failed'}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">No Billing History</h3>
                      <p className="text-gray-600">Your billing history will appear here once you have transactions</p>
                    </div>
                  )}
                </div>
              )}

              {/* Profile Settings Tab */}
              {activeTab === 'profile' && (
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile Settings</h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                          <input
                            type="email"
                            value="user@example.com"
                            disabled
                            className="input-field bg-gray-50"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                          <input
                            type="text"
                            value="John Doe"
                            className="input-field"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h3>
                      <div className="space-y-3">
                        <label className="flex items-center">
                          <input type="checkbox" defaultChecked className="rounded border-gray-300 text-primary focus:ring-primary" />
                          <span className="ml-2 text-sm text-gray-700">Email notifications for billing</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" defaultChecked className="rounded border-gray-300 text-primary focus:ring-primary" />
                          <span className="ml-2 text-sm text-gray-700">Trial expiration reminders</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" />
                          <span className="ml-2 text-sm text-gray-700">Marketing communications</span>
                        </label>
                      </div>
                    </div>

                    <div className="pt-4">
                      <button className="btn-primary">
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
