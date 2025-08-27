# RiseList - Liberia's Business Directory

> Connecting Liberia's businesses to the digital world

RiseList is a comprehensive business directory platform designed to help businesses in Liberia establish their digital presence and connect with customers. Built as part of the Softrise Group, we're committed to building a stronger, more connected business community.

## 🌟 Features

- **Business Directory**: Comprehensive listing of verified businesses across Liberia
- **Advanced Search**: Filter by category, location, and keywords
- **Business Profiles**: Detailed business information with reviews and ratings
- **Add Listings**: Simple form for business owners to submit their information
- **Admin Dashboard**: Complete management system for approvals and analytics
- **Responsive Design**: Mobile-first approach for all devices
- **SEO Optimized**: Built with search engine optimization in mind

## 🚀 Tech Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **React Hook Form** - Form handling and validation
- **React Query** - Data fetching and caching
- **Lucide React** - Beautiful icons

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **Express Validator** - Input validation
- **CORS** - Cross-origin resource sharing
- **Helmet** - Security headers
- **Morgan** - HTTP request logger
- **Rate Limiting** - API protection

## 📁 Project Structure

```
riselist/
├── src/                    # Frontend source code
│   ├── components/         # Reusable UI components
│   ├── pages/             # Page components
│   ├── App.jsx            # Main app component
│   ├── main.jsx           # App entry point
│   └── index.css          # Global styles
├── server/                 # Backend source code
│   ├── routes/            # API route handlers
│   ├── middleware/        # Custom middleware
│   └── index.js           # Server entry point
├── public/                 # Static assets
├── package.json            # Frontend dependencies
├── server/package.json     # Backend dependencies
└── README.md              # This file
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 16+ 
- npm or yarn

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/riselist.git
cd riselist
```

### 2. Install Frontend Dependencies
```bash
npm install
```

### 3. Install Backend Dependencies
```bash
cd server
npm install
cd ..
```

### 4. Environment Setup
```bash
# Copy environment variables
cp env.example .env

# Edit .env file with your configuration
nano .env
```

### 5. Start Development Servers

#### Frontend (Port 3000)
```bash
npm run dev
```

#### Backend (Port 5000)
```bash
cd server
npm run dev
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- API Health Check: http://localhost:5000/api/health

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=7d

# Email Configuration (for production)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

# Security
CORS_ORIGIN=http://localhost:3000
```

### Tailwind CSS Configuration

The project uses Tailwind CSS with custom colors matching the RiseList brand:

- **Primary**: Deep teal (#002B36)
- **Secondary**: Warm amber (#FFB347)
- **Light**: Light gray (#F9F9F9)

## 📱 Available Scripts

### Frontend
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Backend
```bash
cd server
npm run dev          # Start development server with nodemon
npm start            # Start production server
npm test             # Run tests
```

## 🏗️ Building for Production

### 1. Build Frontend
```bash
npm run build
```

### 2. Deploy Backend
```bash
cd server
npm start
```

### 3. Environment Variables
Ensure all production environment variables are set:
- Database connection strings
- JWT secrets
- Email service credentials
- API keys for external services

## 🚀 Deployment Options

### Vercel (Frontend)
1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Deploy

### Netlify (Frontend)
1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy

### Railway/Heroku (Backend)
1. Connect your GitHub repository
2. Set environment variables
3. Deploy

## 🗄️ Database Integration

The current version uses mock data. For production, integrate with:

- **Supabase** - PostgreSQL with real-time features
- **Firebase** - NoSQL database with authentication
- **MongoDB** - Document database
- **PostgreSQL** - Relational database

## 📧 Email Integration

For production email functionality:

1. **Nodemailer** - SMTP email sending
2. **SendGrid** - Transactional email service
3. **Mailgun** - Email delivery service

## 🔐 Security Features

- **Helmet.js** - Security headers
- **CORS** - Cross-origin protection
- **Rate Limiting** - API abuse prevention
- **Input Validation** - XSS and injection protection
- **JWT Authentication** - Secure user sessions

## 📊 Admin Features

- **Business Approval System** - Review and approve new listings
- **User Management** - Manage platform users
- **Analytics Dashboard** - Platform statistics and insights
- **Content Moderation** - Review and manage business content

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Email**: info@riselist.com
- **Documentation**: [docs.riselist.com](https://docs.riselist.com)
- **Issues**: [GitHub Issues](https://github.com/your-username/riselist/issues)

## 🙏 Acknowledgments

- **Softrise Group** - For supporting this initiative
- **Liberia Business Community** - For inspiring this platform
- **Open Source Community** - For the amazing tools and libraries

---

**Built with ❤️ for Liberia's business community**

*RiseList - Connecting Liberia's businesses to the digital world*
