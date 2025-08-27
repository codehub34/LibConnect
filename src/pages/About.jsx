import { Helmet } from 'react-helmet-async'
import { 
  Building2, Users, Globe, Award, Target, 
  Heart, TrendingUp, Lightbulb 
} from 'lucide-react'

const About = () => {
  const stats = [
    { icon: Building2, value: "500+", label: "Businesses Listed" },
    { icon: Users, value: "10K+", label: "Monthly Visitors" },
    { icon: Globe, value: "15+", label: "Cities Covered" },
    { icon: Award, value: "25+", label: "Business Categories" }
  ]

  const values = [
    {
      icon: Target,
      title: "Community First",
      description: "We believe in putting the Liberian business community first, creating opportunities for growth and connection."
    },
    {
      icon: Heart,
      title: "Trust & Quality",
      description: "Every business listed on RiseList is verified and reviewed to ensure quality and reliability for our users."
    },
    {
      icon: TrendingUp,
      title: "Growth & Innovation",
      description: "We're committed to helping businesses grow through digital transformation and innovative solutions."
    },
    {
      icon: Lightbulb,
      title: "Local Expertise",
      description: "Built by Liberians, for Liberians, with deep understanding of local business needs and culture."
    }
  ]

  const team = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      bio: "Former tech executive with 15+ years experience in digital transformation and business development.",
      image: null
    },
    {
      name: "Michael Chen",
      role: "Head of Technology",
      bio: "Software engineer and entrepreneur passionate about building scalable solutions for emerging markets.",
      image: null
    },
    {
      name: "Aisha Kamara",
      role: "Community Manager",
      bio: "Local business advocate with extensive network across Liberia's business community.",
      image: null
    }
  ]

  return (
    <>
      <Helmet>
        <title>About RiseList - Our Mission & Story</title>
        <meta name="description" content="Learn about RiseList's mission to connect Liberia's businesses to the digital world. Part of the Softrise Group, we're building a stronger business community." />
      </Helmet>

      <div className="min-h-screen bg-light">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold font-lato mb-6">
              About RiseList
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto">
              We're on a mission to connect Liberia's businesses to the digital world, 
              building a stronger, more connected business community.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-primary font-lato mb-6">
                  Our Mission
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  RiseList was born from a simple belief: every business in Liberia deserves to be discovered, 
                  connected, and empowered to grow. In today's digital age, being online isn't just an option—it's essential.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  We're building the bridge between traditional Liberian businesses and the digital opportunities 
                  that can transform their growth potential. Whether you're a small shop in Monrovia or a 
                  growing enterprise in Gbarnga, RiseList connects you with customers who need what you offer.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Our platform isn't just a directory—it's a community where businesses support each other, 
                  share knowledge, and grow together.
                </p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="text-center">
                  <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Target className="w-12 h-12 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-primary mb-4">What We Do</h3>
                  <ul className="text-left space-y-3 text-gray-700">
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                      <span>Connect businesses with customers</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                      <span>Provide digital presence for local businesses</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                      <span>Build a trusted business community</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                      <span>Support economic growth in Liberia</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-primary font-lato mb-4">
                Our Impact
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Since our launch, we've helped hundreds of businesses connect with thousands of customers
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                    <div className="text-gray-600">{stat.label}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Softrise Connection */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-primary to-primary-dark rounded-xl p-8 text-white">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold font-lato mb-6">
                    Part of the Softrise Group
                  </h2>
                  <p className="text-lg text-gray-200 leading-relaxed mb-6">
                    RiseList is proud to be part of the Softrise Group, a leading technology and business 
                    services company committed to driving digital transformation across Africa.
                  </p>
                  <p className="text-lg text-gray-200 leading-relaxed mb-6">
                    With Softrise's backing, we have access to world-class technology, expertise, and resources 
                    that enable us to build robust, scalable solutions for the Liberian market.
                  </p>
                  <p className="text-lg text-gray-200 leading-relaxed">
                    This partnership allows us to focus on what matters most: serving our local business 
                    community with the best possible platform and support.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Building2 className="w-16 h-16 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Softrise Group</h3>
                  <p className="text-gray-200">
                    Empowering businesses through technology and innovation
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-primary font-lato mb-4">
                Our Values
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                The principles that guide everything we do at RiseList
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => {
                const Icon = value.icon
                return (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-primary mb-3">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-primary font-lato mb-4">
                Meet Our Team
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                The passionate people behind RiseList who are committed to serving Liberia's business community
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center">
                  <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-12 h-12 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-primary mb-2">{member.name}</h3>
                  <p className="text-secondary font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-lato mb-6">
              Join the RiseList Community
            </h2>
            <p className="text-xl text-gray-200 mb-8">
              Whether you're a business owner looking to grow or a customer seeking quality services, 
              RiseList is here to connect you with the best of Liberia's business community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/add-listing" className="btn-secondary text-lg px-8 py-4">
                List Your Business
              </a>
              <a href="/directory" className="btn-outline text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-primary">
                Explore Businesses
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default About
