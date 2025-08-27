import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Crown, Star, Clock } from 'lucide-react';

const SubscriptionGuard = ({ 
  children, 
  requiredTier = 'basic', 
  fallback = null,
  showUpgradePrompt = true 
}) => {
  const [subscription, setSubscription] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    checkSubscription();
  }, [requiredTier]);

  const checkSubscription = async () => {
    try {
      // In production, this would check JWT token and get actual user ID
      const response = await fetch('/api/subscriptions?userId=1');
      const data = await response.json();
      
      if (data.success) {
        setSubscription(data.data);
        setHasAccess(checkAccess(data.data, requiredTier));
      } else {
        setHasAccess(requiredTier === 'basic');
      }
    } catch (error) {
      console.error('Error checking subscription:', error);
      setHasAccess(requiredTier === 'basic');
    } finally {
      setIsLoading(false);
    }
  };

  const checkAccess = (userSubscription, tier) => {
    if (!userSubscription) return tier === 'basic';
    
    const tierHierarchy = { basic: 1, standard: 2, premium: 3 };
    const userTier = userSubscription.status === 'trial' ? 'standard' : userSubscription.tier;
    
    return tierHierarchy[userTier] >= tierHierarchy[tier];
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (hasAccess) {
    return children;
  }

  if (fallback) {
    return fallback;
  }

  if (!showUpgradePrompt) {
    return null;
  }

  // Show upgrade prompt
  return (
    <div className="bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl p-8 text-center">
      <div className="max-w-md mx-auto">
        {(() => {
          const IconComponent = getTierIcon(requiredTier);
          return (
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
              <IconComponent className={`w-8 h-8 ${getTierColor(requiredTier)}`} />
            </div>
          );
        })()}
        
        <h3 className="text-2xl font-bold mb-4">
          {requiredTier === 'premium' ? 'Premium Feature' : 'Enhanced Feature'}
        </h3>
        
        <p className="text-lg mb-6 opacity-90">
          {requiredTier === 'premium' 
            ? 'This feature is available exclusively to Premium subscribers.'
            : 'This feature requires a Standard or Premium subscription.'
          }
        </p>

        <div className="space-y-4">
          <Link
            to="/pricing"
            className="inline-block bg-secondary text-primary px-8 py-3 rounded-lg font-semibold hover:bg-secondary-light transition-colors duration-200"
          >
            View Plans
          </Link>
          
          {subscription && (
            <Link
              to="/dashboard"
              className="block text-white/80 hover:text-white transition-colors duration-200"
            >
              Manage Subscription
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionGuard;
