import { Routes, Route } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Directory from './pages/Directory'
import BusinessProfile from './pages/BusinessProfile'
import AddListing from './pages/AddListing'
import About from './pages/About'
import Contact from './pages/Contact'
import AdminDashboard from './pages/AdminDashboard'
import Pricing from './pages/Pricing'
import UserDashboard from './pages/UserDashboard'

function App() {
  return (
    <>
      <Helmet>
        <title>RiseList - Connecting Liberia's Businesses to the Digital World</title>
        <meta name="description" content="RiseList - Connecting Liberia's businesses to the digital world. Find and discover local businesses, services, and opportunities." />
      </Helmet>
      
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/directory" element={<Directory />} />
            <Route path="/business/:id" element={<BusinessProfile />} />
            <Route path="/add-listing" element={<AddListing />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/dashboard" element={<UserDashboard />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </>
  )
}

export default App
