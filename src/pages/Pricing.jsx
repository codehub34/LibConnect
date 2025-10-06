// import { Helmet } from 'react-helmet-async';
// import { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { Check, Star, Zap, Crown, Clock, Shield, Users, BarChart3 } from 'lucide-react';
// import toast from 'react-hot-toast';

// const Pricing = () => {
//   const [selectedTier, setSelectedTier] = useState('standard');
//   const [isLoading, setIsLoading] = useState(false);

//   const subscriptionTiers = [
//     {
//       id: 'basic',
//       name: 'Basic',
//       price: 'Free Trial',
//       duration: '1 Month',
//       description: 'Perfect for getting started with RiseList',
//       features: [
//         'Basic business profile',
//         'Contact information display',
//         'Standard listing in directory',
//         'Email support',
//         'Basic analytics'
//       ],
//       icon: Clock,
//       popular: false,
//       trialDays: 30
//     },
//     {
//       id: 'standard',
//       name: 'Standard',
//       price: '$1.25',
//       duration: 'per month',
//       description: 'Enhanced features for growing businesses',
//       features: [
//         'Everything in Basic',
//         'Enhanced business profile',
//         'Photo gallery (up to 10 images)',
//         'Business hours & services',
//         'Customer reviews & ratings',
//         'Priority listing placement',
//         'Priority email support',
//         'Advanced analytics dashboard'
//       ],
//       icon: Star,
//       popular: true,
//       priceId: 'price_standard'
//     },
//     {
//       id: 'premium',
//       name: 'Premium',
//       price: '$2.50',
//       duration: 'per month',
//       description: 'Maximum visibility and premium features',
//       features: [
//         'Everything in Standard',
//         'Featured placement in directory',
//         'Unlimited photo gallery',
//         'Video content support',
//         'Custom business branding',
//         'Advanced SEO optimization',
//         'Priority customer support',
//         'Comprehensive analytics',
//         'Business insights & reports',
//         'API access for integrations'
//       ],
//       icon: Crown,
//       popular: false,
//       priceId: 'price_premium'
//     }
//   ];

//   const handleUpgrade = async (tier) => {
//     if (tier.id === 'basic') {
//       toast.success('You are already on the Basic plan!');
//       return;
//     }

//     setIsLoading(true);
    
//     try {
//       // Mock checkout session creation
//       setTimeout(() => {
//         if (tier.id === 'standard') {
//           toast.success('Redirecting to Standard plan checkout...');
//           // In production, this would redirect to Stripe checkout
//           // For now, just show a success message
//         } else if (tier.id === 'premium') {
//           toast.success('Redirecting to Premium plan checkout...');
//           // In production, this would redirect to Stripe checkout
//           // For now, just show a success message
//         }
//         setIsLoading(false);
//       }, 1500);
//     } catch (error) {
//       console.error('Error creating checkout session:', error);
//       toast.error('Something went wrong. Please try again.');
//       setIsLoading(false);
//     }
//   };

//   const getTrialCountdown = () => {
//     const trialEnd = new Date();
//     trialEnd.setDate(trialEnd.getDate() + 30);
//     const now = new Date();
//     const diffTime = trialEnd - now;
//     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//     return diffDays;
//   };

//   return (
//     <>
//       <Helmet>
//         <title>Pricing - RiseList</title>
//         <meta name="description" content="Choose the perfect subscription plan for your business on RiseList. Start with a free trial and upgrade when you're ready." />
//       </Helmet>

//       <div className="min-h-screen bg-light">
//         {/* Hero Section */}
//         <div className="bg-gradient-to-br from-primary to-primary-dark text-white py-20">
//           <div className="container mx-auto px-4 text-center">
//             <h1 className="text-4xl md:text-6xl font-bold mb-6">
//               Choose Your Plan
//             </h1>
//             <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
//               Start with a free trial and unlock powerful features to grow your business
//             </p>
            
//             {/* Trial Countdown */}
//             <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-md mx-auto">
//               <div className="flex items-center justify-center space-x-2 mb-3">
//                 <Clock className="w-6 h-6" />
//                 <span className="text-lg font-semibold">Free Trial Available</span>
//               </div>
//               <p className="text-sm opacity-90">
//                 Start your {getTrialCountdown()}-day free trial today with full Standard features
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Pricing Cards */}
//         <div className="container mx-auto px-4 py-20">
//           <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
//             {subscriptionTiers.map((tier) => {
//               const IconComponent = tier.icon;
//               return (
//                 <div
//                   key={tier.id}
//                   className={`relative bg-white rounded-2xl shadow-xl p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${
//                     tier.popular
//                       ? 'ring-4 ring-secondary scale-105'
//                       : 'hover:ring-2 hover:ring-primary/20'
//                   }`}
//                 >
//                   {tier.popular && (
//                     <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
//                       <span className="bg-secondary text-primary px-4 py-2 rounded-full text-sm font-bold">
//                         Most Popular
//                       </span>
//                     </div>
//                   )}

//                   <div className="text-center mb-8">
//                     <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
//                       <IconComponent className="w-8 h-8 text-primary" />
//                     </div>
//                     <h3 className="text-2xl font-bold text-gray-900 mb-2">{tier.name}</h3>
//                     <div className="mb-4">
//                       <span className="text-4xl font-bold text-primary">{tier.price}</span>
//                       {tier.duration && (
//                         <span className="text-gray-600 ml-2">{tier.duration}</span>
//                       )}
//                     </div>
//                     <p className="text-gray-600">{tier.description}</p>
//                   </div>

//                   <ul className="space-y-4 mb-8">
//                     {tier.features.map((feature, index) => (
//                       <li key={index} className="flex items-start space-x-3">
//                         <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
//                         <span className="text-gray-700">{feature}</span>
//                       </li>
//                     ))}
//                   </ul>

//                   <button
//                     onClick={() => handleUpgrade(tier)}
//                     disabled={isLoading}
//                     className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-200 ${
//                       tier.popular
//                         ? 'bg-secondary text-primary hover:bg-secondary-light'
//                         : tier.id === 'basic'
//                         ? 'bg-gray-100 text-gray-700 cursor-default'
//                         : 'bg-primary text-white hover:bg-primary-light'
//                     }`}
//                   >
//                     {isLoading ? (
//                       'Processing...'
//                     ) : tier.id === 'basic' ? (
//                       'Start Free Trial'
//                     ) : (
//                       'Upgrade Now'
//                     )}
//                   </button>
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         {/* Features Comparison */}
//         <div className="bg-white py-20">
//           <div className="container mx-auto px-4">
//             <div className="text-center mb-16">
//               <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
//                 Compare All Features
//               </h2>
//               <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//                 See exactly what each plan includes to make the best choice for your business
//               </p>
//             </div>

//             <div className="max-w-4xl mx-auto">
//               <div className="overflow-x-auto">
//                 <table className="w-full">
//                   <thead>
//                     <tr className="border-b-2 border-gray-200">
//                       <th className="text-left py-4 px-6 text-lg font-semibold text-gray-900">Feature</th>
//                       <th className="text-center py-4 px-6 text-lg font-semibold text-gray-900">Basic</th>
//                       <th className="text-center py-4 px-6 text-lg font-semibold text-gray-900">Standard</th>
//                       <th className="text-center py-4 px-6 text-lg font-semibold text-gray-900">Premium</th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-gray-200">
//                     <tr>
//                       <td className="py-4 px-6 font-medium">Business Profile</td>
//                       <td className="text-center py-4 px-6">Basic</td>
//                       <td className="text-center py-4 px-6">Enhanced</td>
//                       <td className="text-center py-4 px-6">Premium</td>
//                     </tr>
//                     <tr>
//                       <td className="py-4 px-6 font-medium">Photo Gallery</td>
//                       <td className="text-center py-4 px-6">-</td>
//                       <td className="text-center py-4 px-6">Up to 10</td>
//                       <td className="text-center py-4 px-6">Unlimited</td>
//                     </tr>
//                     <tr>
//                       <td className="py-4 px-6 font-medium">Directory Placement</td>
//                       <td className="text-center py-4 px-6">Standard</td>
//                       <td className="text-center py-4 px-6">Priority</td>
//                       <td className="text-center py-4 px-6">Featured</td>
//                     </tr>
//                     <tr>
//                       <td className="py-4 px-6 font-medium">Customer Support</td>
//                       <td className="text-center py-4 px-6">Email</td>
//                       <td className="text-center py-4 px-6">Priority Email</td>
//                       <td className="text-center py-4 px-6">Priority Phone</td>
//                     </tr>
//                     <tr>
//                       <td className="py-4 px-6 font-medium">Analytics</td>
//                       <td className="text-center py-4 px-6">Basic</td>
//                       <td className="text-center py-4 px-6">Advanced</td>
//                       <td className="text-center py-4 px-6">Comprehensive</td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* CTA Section */}
//         <div className="bg-gradient-to-r from-primary to-primary-dark text-white py-20">
//           <div className="container mx-auto px-4 text-center">
//             <h2 className="text-3xl md:text-4xl font-bold mb-6">
//               Ready to Grow Your Business?
//             </h2>
//             <p className="text-xl mb-8 max-w-2xl mx-auto">
//               Join thousands of businesses already using RiseList to connect with customers and grow their online presence
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <Link
//                 to="/add-listing"
//                 className="bg-secondary text-primary px-8 py-4 rounded-xl font-semibold hover:bg-secondary-light transition-colors duration-200"
//               >
//                 Start Free Trial
//               </Link>
//               <Link
//                 to="/contact"
//                 className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-primary transition-colors duration-200"
//               >
//                 Contact Sales
//               </Link>
//             </div>
//           </div>
//         </div>

//         {/* FAQ Section */}
//         <div className="bg-white py-20">
//           <div className="container mx-auto px-4">
//             <div className="text-center mb-16">
//               <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
//                 Frequently Asked Questions
//               </h2>
//             </div>

//             <div className="max-w-3xl mx-auto space-y-8">
//               <div className="border-b border-gray-200 pb-6">
//                 <h3 className="text-lg font-semibold text-gray-900 mb-3">
//                   Can I cancel my subscription at any time?
//                 </h3>
//                 <p className="text-gray-600">
//                   Yes, you can cancel your subscription at any time. Your access will continue until the end of your current billing period.
//                 </p>
//               </div>

//               <div className="border-b border-gray-200 pb-6">
//                 <h3 className="text-lg font-semibold text-gray-900 mb-3">
//                   What happens after my free trial ends?
//                 </h3>
//                 <p className="text-gray-600">
//                   After your 30-day free trial, you'll need to choose a paid plan to continue accessing enhanced features. Your basic profile will remain visible.
//                 </p>
//               </div>

//               <div className="border-b border-gray-200 pb-6">
//                 <h3 className="text-lg font-semibold text-gray-900 mb-3">
//                   Can I upgrade or downgrade my plan?
//                 </h3>
//                 <p className="text-gray-600">
//                   Yes, you can upgrade to a higher tier at any time. Downgrades will take effect at the end of your current billing period.
//                 </p>
//               </div>

//               <div className="border-b border-gray-200 pb-6">
//                 <h3 className="text-lg font-semibold text-gray-900 mb-3">
//                   Is there a setup fee?
//                 </h3>
//                 <p className="text-gray-600">
//                   No, there are no setup fees. You only pay the monthly subscription fee for your chosen plan.
//                 </p>
//               </div>

//               <div>
//                 <h3 className="text-lg font-semibold text-gray-900 mb-3">
//                   Do you offer refunds?
//                 </h3>
//                 <p className="text-gray-600">
//                   We offer a 30-day money-back guarantee. If you're not satisfied with your subscription, contact us for a full refund.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Pricing;
