// src/data/businesses.js
// Import all your logo images here.
// Note: You must have these files in your businessLogo folder.
import aiistLogo from '../businessLogo/aiist_logo.png';
import greenEarthLogo from '../businessLogo/green_earth_agriculture.png';
// Import other logos as needed

export const mockBusinesses = [
  {
    id: 1,
    name: "AIIST University College",
    description: "AIIST University College offers world-class education with state-of-the-art facilities and experienced faculty.",
    category: "Technology",
    location: "Benson & Newport, Intersection Afropolitant Building, Monrovia, Liberia",
    rating: 4.8,
    reviewCount: 24,
    phone: "+231 123 456 789",
    email: "info@aiist.edu.lr",
    website: "http://www.aiist.edu.lr",
    logo: aiistLogo,
    services: [
      "Computer Science",
      "Information Technology",
      "Business Administration",
      "Cybersecurity"
    ],
    hours: {
      monday: "8:00 AM - 5:00 PM",
      tuesday: "8:00 AM - 5:00 PM",
      wednesday: "8:00 AM - 5:00 PM",
      thursday: "8:00 AM - 5:00 PM",
      friday: "8:00 AM - 5:00 PM",
      saturday: "Closed",
      sunday: "Closed"
    },
    coordinates: { lat: 6.3013, lng: -10.7937 }
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
    email: "contact@greenearth.com",
    website: "http://www.greenearthagri.com",
    logo: greenEarthLogo,
    services: [
      "Organic Farming",
      "Produce Supply",
      "Farmer Training"
    ],
    hours: {
      monday: "9:00 AM - 4:00 PM",
      tuesday: "9:00 AM - 4:00 PM",
      wednesday: "9:00 AM - 4:00 PM",
      thursday: "9:00 AM - 4:00 PM",
      friday: "9:00 AM - 4:00 PM",
      saturday: "9:00 AM - 1:00 PM",
      sunday: "Closed"
    },
    coordinates: { lat: 6.9936, lng: -9.6841 }
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
    email: "info@liberiaexpress.com",
    website: "http://www.liberiaexpress.com",
    logo: null,
    services: [
      "International Shipping",
      "Cargo Handling",
      "Warehousing",
      "Customs Brokerage"
    ],
    hours: {
      monday: "8:00 AM - 6:00 PM",
      tuesday: "8:00 AM - 6:00 PM",
      wednesday: "8:00 AM - 6:00 PM",
      thursday: "8:00 AM - 6:00 PM",
      friday: "8:00 AM - 6:00 PM",
      saturday: "9:00 AM - 3:00 PM",
      sunday: "Closed"
    },
    coordinates: { lat: 6.3105, lng: -10.8037 }
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
    email: "monroviamed@info.org",
    website: null,
    logo: null,
    services: [
      "Emergency Care",
      "General Practice",
      "Pediatrics",
      "Surgery"
    ],
    hours: {
      monday: "24 Hours",
      tuesday: "24 Hours",
      wednesday: "24 Hours",
      thursday: "24 Hours",
      friday: "24 Hours",
      saturday: "24 Hours",
      sunday: "24 Hours"
    },
    coordinates: { lat: 6.3045, lng: -10.7921 }
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
    email: "press@liberiauni.edu",
    website: "http://www.liberiaup.edu.lr",
    logo: null,
    services: [
      "Book Publishing",
      "Academic Journals",
      "Printing Services"
    ],
    hours: {
      monday: "8:30 AM - 4:30 PM",
      tuesday: "8:30 AM - 4:30 PM",
      wednesday: "8:30 AM - 4:30 PM",
      thursday: "8:30 AM - 4:30 PM",
      friday: "8:30 AM - 4:30 PM",
      saturday: "Closed",
      sunday: "Closed"
    },
    coordinates: { lat: 6.3019, lng: -10.8045 }
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
    email: "support@liberiabank.lr",
    website: "http://www.liberiabanktrust.lr",
    logo: null,
    services: [
      "Personal Banking",
      "Business Loans",
      "Savings Accounts",
      "Investments"
    ],
    hours: {
      monday: "9:00 AM - 3:00 PM",
      tuesday: "9:00 AM - 3:00 PM",
      wednesday: "9:00 AM - 3:00 PM",
      thursday: "9:00 AM - 3:00 PM",
      friday: "9:00 AM - 3:00 PM",
      saturday: "Closed",
      sunday: "Closed"
    },
    coordinates: { lat: 6.3082, lng: -10.7993 }
  },
  {
    id: 7,
    name: "Future Solutions",
    description: "Innovative software development company specializing in custom web and mobile applications.",
    category: "Technology",
    location: "Monrovia",
    rating: 4.9,
    reviewCount: 55,
    phone: "+231 111 222 333",
    email: "contact@futuresolutions.net",
    website: "http://www.futuresolutions.net",
    logo: null,
    services: [
      "Web Development",
      "Mobile App Development",
      "UI/UX Design",
      "IT Consulting"
    ],
    hours: {
      monday: "8:00 AM - 5:00 PM",
      tuesday: "8:00 AM - 5:00 PM",
      wednesday: "8:00 AM - 5:00 PM",
      thursday: "8:00 AM - 5:00 PM",
      friday: "8:00 AM - 5:00 PM",
      saturday: "Closed",
      sunday: "Closed"
    },
    coordinates: { lat: 6.3025, lng: -10.7854 }
  },
  {
    id: 8,
    name: "Coastal Construction",
    description: "Building and construction services for residential and commercial projects. Quality and reliability guaranteed.",
    category: "Construction",
    location: "Buchanan",
    rating: 4.2,
    reviewCount: 12,
    phone: "+231 555 666 777",
    email: "info@coastalconstruction.com",
    website: null,
    logo: null,
    services: [
      "Residential Building",
      "Commercial Construction",
      "Renovation Services"
    ],
    hours: {
      monday: "7:00 AM - 6:00 PM",
      tuesday: "7:00 AM - 6:00 PM",
      wednesday: "7:00 AM - 6:00 PM",
      thursday: "7:00 AM - 6:00 PM",
      friday: "7:00 AM - 6:00 PM",
      saturday: "8:00 AM - 1:00 PM",
      sunday: "Closed"
    },
    coordinates: { lat: 5.8821, lng: -10.0487 }
  },
  {
    id: 9,
    name: "Voinjama Arts Center",
    description: "Promoting Liberian arts and culture through workshops, exhibitions, and community events.",
    category: "Tourism",
    location: "Voinjama",
    rating: 4.7,
    reviewCount: 9,
    phone: "+231 333 444 555",
    email: "voinjamaarts@gmail.com",
    website: null,
    logo: null,
    services: [
      "Art Exhibitions",
      "Cultural Workshops",
      "Community Events"
    ],
    hours: {
      monday: "10:00 AM - 5:00 PM",
      tuesday: "10:00 AM - 5:00 PM",
      wednesday: "10:00 AM - 5:00 PM",
      thursday: "10:00 AM - 5:00 PM",
      friday: "10:00 AM - 5:00 PM",
      saturday: "11:00 AM - 4:00 PM",
      sunday: "Closed"
    },
    coordinates: { lat: 8.4102, lng: -9.7423 }
  },
  {
    id: 10,
    name: "Monrovia Supermarket",
    description: "Your one-stop shop for groceries, household items, and fresh produce. Open 24/7.",
    category: "Retail",
    location: "Monrovia",
    rating: 4.3,
    reviewCount: 68,
    phone: "+231 222 333 444",
    email: "info@monroviasuper.com",
    website: null,
    logo: null,
    services: [
      "Grocery",
      "Fresh Produce",
      "Household Items"
    ],
    hours: {
      monday: "24 Hours",
      tuesday: "24 Hours",
      wednesday: "24 Hours",
      thursday: "24 Hours",
      friday: "24 Hours",
      saturday: "24 Hours",
      sunday: "24 Hours"
    },
    coordinates: { lat: 6.3025, lng: -10.7925 }
  },
  {
    id: 11,
    name: "Gbarnga Pharmacy",
    description: "Your trusted source for prescription medications, over-the-counter drugs, and health advice.",
    category: "Healthcare",
    location: "Gbarnga",
    rating: 4.6,
    reviewCount: 30,
    phone: "+231 777 666 555",
    email: "gbarngapharmacy@mail.com",
    website: null,
    logo: null,
    services: [
      "Prescription Medications",
      "Over-the-Counter Drugs",
      "Health Consultations"
    ],
    hours: {
      monday: "7:00 AM - 8:00 PM",
      tuesday: "7:00 AM - 8:00 PM",
      wednesday: "7:00 AM - 8:00 PM",
      thursday: "7:00 AM - 8:00 PM",
      friday: "7:00 AM - 8:00 PM",
      saturday: "8:00 AM - 6:00 PM",
      sunday: "Closed"
    },
    coordinates: { lat: 6.9926, lng: -9.6835 }
  },
  {
    id: 12,
    name: "Sanniquellie E-Services",
    description: "Internet cafe and digital services, offering printing, scanning, and fast internet access.",
    category: "Technology",
    location: "Sanniquellie",
    rating: 4.5,
    reviewCount: 11,
    phone: "+231 999 888 777",
    email: "sanniquellie.eservices@email.com",
    website: null,
    logo: null,
    services: [
      "Internet Access",
      "Printing",
      "Scanning",
      "Computer Repairs"
    ],
    hours: {
      monday: "8:00 AM - 7:00 PM",
      tuesday: "8:00 AM - 7:00 PM",
      wednesday: "8:00 AM - 7:00 PM",
      thursday: "8:00 AM - 7:00 PM",
      friday: "8:00 AM - 7:00 PM",
      saturday: "9:00 AM - 5:00 PM",
      sunday: "Closed"
    },
    coordinates: { lat: 7.3789, lng: -8.7189 }
  }
];

export const categories = [
  "Technology", "Agriculture", "Healthcare", "Education",
  "Finance", "Manufacturing", "Tourism", "Transportation",
  "Retail", "Food & Beverage", "Construction", "Media"
];

export const locations = [
  "Monrovia", "Gbarnga", "Ganta", "Kakata", "Buchanan",
  "Zwedru", "Voinjama", "Harper", "Robertsport", "Sanniquellie"
];

// Add the mock reviews data here
export const mockReviews = [
  {
    id: 1,
    businessId: 1,
    author: 'John Doe',
    rating: 5,
    date: '2023-10-26',
    comment: 'Excellent and professional service. Highly recommend for all your tech needs!'
  },
  {
    id: 2,
    businessId: 1,
    author: 'Jane Smith',
    rating: 4,
    date: '2023-10-25',
    comment: 'Great work, a bit slow on communication at first, but the final product was perfect.'
  },
  {
    id: 3,
    businessId: 2,
    author: 'Peter O.',
    rating: 5,
    date: '2023-10-20',
    comment: 'Fresh produce and very reliable. The quality is consistently high.'
  },
  {
    id: 4,
    businessId: 3,
    author: 'Sarah K.',
    rating: 4.5,
    date: '2023-10-18',
    comment: 'Excellent logistics service, very timely and efficient.'
  },
  {
    id: 5,
    businessId: 4,
    author: 'Michael B.',
    rating: 4.9,
    date: '2023-10-28',
    comment: 'The best medical care in Monrovia. The staff is very caring and professional.'
  },
  {
    id: 6,
    businessId: 5,
    author: 'Linda T.',
    rating: 4.5,
    date: '2023-10-21',
    comment: 'Their publications are very informative and well-researched.'
  },
  {
    id: 7,
    businessId: 6,
    author: 'David L.',
    rating: 4.4,
    date: '2023-10-15',
    comment: 'Trustworthy bank with great customer service.'
  },
  {
    id: 8,
    businessId: 7,
    author: 'Grace M.',
    rating: 4.9,
    date: '2023-10-27',
    comment: 'Future Solutions delivered an outstanding app. They are truly innovative.'
  },
  {
    id: 9,
    businessId: 8,
    author: 'Kwame A.',
    rating: 4.2,
    date: '2023-10-19',
    comment: 'High-quality construction work. They finished the project ahead of schedule.'
  },
  {
    id: 10,
    businessId: 9,
    author: 'Fatima G.',
    rating: 4.7,
    date: '2023-10-23',
    comment: 'A wonderful place to learn about Liberian culture and art.'
  },
  {
    id: 11,
    businessId: 10,
    author: 'James C.',
    rating: 4.3,
    date: '2023-10-24',
    comment: 'Great selection of products, but the checkout lines can be long.'
  },
  {
    id: 12,
    businessId: 11,
    author: 'Hassan D.',
    rating: 4.6,
    date: '2023-10-25',
    comment: 'Knowledgeable and friendly pharmacists. They always have what I need.'
  },
  {
    id: 13,
    businessId: 12,
    author: 'Sophia R.',
    rating: 4.5,
    date: '2023-10-22',
    comment: 'Fast and reliable internet service. A lifesaver in Sanniquellie!'
  }
];