'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

// Counter animation component
const Counter = ({ end, duration = 2 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime;
    const startCount = 0;
    const endCount = end;

    const updateCount = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const currentCount = Math.floor(progress * (endCount - startCount) + startCount);
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      }
    };

    requestAnimationFrame(updateCount);
  }, [end, duration]);

  return <span>{count}</span>;
};

// Navbar Component
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-black/80 backdrop-blur-md border-b border-white/10' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex-shrink-0 flex items-center space-x-3"
            >
              <img
                src="/logo.jpg"
                alt="Nomad Express Group Logo"
                className="h-8 w-auto"
              />
              <span className="text-white font-bold text-lg hidden sm:block">Nomad Express Group</span>
            </motion.div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {[
                  { name: 'About Us', href: '#' },
                  { name: 'Services', action: () => scrollToSection('services') },
                  { name: 'Our Team', action: () => scrollToSection('team') },
                  { name: 'Careers', action: () => scrollToSection('careers') },
                  { name: 'Contact Us', action: () => scrollToSection('contact') }
                ].map((item) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    onClick={item.action ? (e) => { e.preventDefault(); item.action(); } : undefined}
                    className="text-white hover:text-red-500 px-3 py-2 text-sm font-medium transition-colors duration-200 relative group cursor-pointer"
                    whileHover={{ y: -2 }}
                  >
                    {item.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Desktop CTA Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('quote-form')}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
              >
                Get a Quote
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('careers')}
                className="border border-white text-white hover:bg-white hover:text-black px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
              >
                Drive With Us
              </motion.button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-white hover:text-red-500 focus:outline-none focus:text-red-500 transition-colors duration-200"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsMobileMenuOpen(false)}></div>
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 20 }}
            className="fixed top-0 right-0 h-full w-64 bg-black/90 backdrop-blur-md border-l border-white/10 pt-16"
          >
            <div className="p-6">
              <div className="space-y-4">
                {[
                  { name: 'About Us', href: '#' },
                  { name: 'Services', action: () => scrollToSection('services') },
                  { name: 'Our Team', action: () => scrollToSection('team') },
                  { name: 'Careers', action: () => scrollToSection('careers') },
                  { name: 'Contact Us', action: () => scrollToSection('contact') }
                ].map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={item.action ? (e) => { e.preventDefault(); item.action(); } : () => setIsMobileMenuOpen(false)}
                    className="block text-white hover:text-red-500 py-2 text-base font-medium transition-colors duration-200"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="mt-8 space-y-3">
                <button
                  onClick={() => scrollToSection('quote-form')}
                  className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg font-medium transition-colors duration-200"
                >
                  Get a Quote
                </button>
                <button
                  onClick={() => scrollToSection('careers')}
                  className="w-full border border-white text-white hover:bg-white hover:text-black px-4 py-3 rounded-lg font-medium"
                >
                  Drive With Us
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

// Hero Section Component
const HeroSection = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Image Background */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/truck0.jpg)' }}
      ></div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Hero Content */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold uppercase tracking-wider mb-6"
        >
          YOUR TRUSTED<br />
          <span className="text-red-500">FLATBED</span><br />
          TRUCKING COMPANY
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-lg sm:text-xl md:text-2xl mb-8 max-w-3xl mx-auto font-light"
        >
          Reliable freight transportation with professional drivers and modern fleet.
          Your cargo, our commitment.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full text-base font-semibold shadow-lg hover:shadow-xl"
        >
          GET A QUOTE
        </motion.button>
      </div>
    </section>
  );
};

// Stats Section Component
const StatsSection = () => {
  const stats = [
    { number: 25, suffix: '+', label: 'Years of Experience' },
    { number: 150, suffix: '+', label: 'Fleet Size' },
    { number: 200, suffix: '+', label: 'Professional Drivers' },
    { number: 1000, suffix: '+', label: 'Satisfied Clients' },
  ];

  return (
    <section className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="text-gray-300 text-lg">
            Our numbers speak for our commitment to excellence
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-4xl sm:text-5xl font-bold text-red-500 mb-2">
                <Counter end={stat.number} />
                {stat.suffix}
              </div>
              <div className="text-white text-sm sm:text-base font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Services Section Component
const ServicesSection = () => {
  const services = [
    {
      icon: '/truck1.jpg',
      title: 'Flatbed & Step Deck Freight',
      description: 'Secure transportation for oversized and specialized cargo including machinery, steel, and building materials.',
      features: ['Nationwide coverage', 'Specialized equipment', 'Expert drivers']
    },
    {
      icon: '/truck2.jpg',
      title: 'Refrigerated Services',
      description: 'Temperature-controlled transportation for perishable goods and food products.',
      features: ['24/7 monitoring', 'Temperature control', 'Fast delivery']
    },
    {
      icon: '/truck3.jpg',
      title: 'Heavy Haul & Specialized',
      description: 'Expert handling of heavy machinery, equipment, and oversized loads.',
      features: ['Permit assistance', 'Route planning', 'Safety protocols']
    },
    {
      icon: '/truck4.jpg',
      title: 'Logistics Solutions',
      description: 'Comprehensive supply chain management and 3PL services.',
      features: ['Warehousing', 'Distribution', 'Inventory management']
    },
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Transportation & Freight Services
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            We specialize in flatbed, step deck, refrigerated, and specialized freight services. 
            Primarily transporting machinery, steel, building materials, and industrial equipment across all 48 states.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl border border-gray-100"
            >
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <img
                    src={service.icon}
                    alt={service.title}
                    className="w-10 h-10 object-cover rounded-full"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {service.description}
                  </p>
                  <ul className="space-y-1">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="text-sm text-gray-500 flex items-center">
                        <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                        {feature}
          </li>
                    ))}
                  </ul>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-4 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                  >
                    Request Quote
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Team Section Component
const TeamSection = () => {
  const team = [
    {
      name: 'Marcus Rodriguez',
      position: 'CEO & Founder',
      image: '/team1.jpg',
      bio: 'Marcus brings over 15 years of experience in the trucking industry. He founded Nomad Express Group with a vision of providing reliable, professional freight services while building lasting relationships with drivers and customers.'
    },
    {
      name: 'Sarah Chen',
      position: 'Director of Operations',
      image: '/team2.jpg',
      bio: 'Sarah oversees daily operations and ensures our fleet runs efficiently. With her background in logistics and supply chain management, she has been instrumental in our growth and operational excellence.'
    },
    {
      name: 'David Thompson',
      position: 'Safety Director',
      image: '/team3.jpg',
      bio: 'David is responsible for maintaining our excellent safety record. His no-compromise approach to safety protocols and driver training has made Nomad Express Group one of the safest carriers in the industry.'
    },
    {
      name: 'Jennifer Martinez',
      position: 'Director of Driver Relations',
      image: '/team4.jpg',
      bio: 'Jennifer focuses on driver recruitment, retention, and satisfaction. Her commitment to driver welfare and career development has helped us build one of the most satisfied driver fleets in the business.'
    }
  ];

  return (
    <section id="team" className="py-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Our Leadership Team
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Meet the experienced professionals who drive our success and commitment to excellence.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-start space-x-6">
                <div className="w-24 h-24 bg-gray-300 rounded-full flex-shrink-0 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-red-600 font-medium mb-3">
                    {member.position}
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Driver Recruitment Section Component
const DriverSection = () => {
  return (
    <section id="careers" className="py-20 bg-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"></div>
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(/driver-bg.jpg)' }}
      ></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              What Is It Like to Drive for Nomad Express Group?
            </h2>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              We think you&apos;ll appreciate the way we do business at Nomad Express Group. In the world of truck driving jobs, 
              it&apos;s not hard to find a mega carrier who will promise you everything while delivering very little. But that&apos;s not us.
            </p>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              Today, we have grown to a fleet of over 150 trucks, and have been recognized by multiple sources as one of the 
              top for hire companies in the industry. We have worked to build a company of professionals with decades of 
              experience in transportation, and the most satisfied fleet of professional drivers in the business.
            </p>
            
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-red-500 mb-2">
                  <Counter end={150} />+
                </div>
                <div className="text-white text-sm">Trucks in Fleet</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-500 mb-2">
                  <Counter end={200} />+
                </div>
                <div className="text-white text-sm">Professional Drivers</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
              >
                Drive with Us
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 rounded-lg font-semibold transition-all duration-200"
              >
                Learn More
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:text-right"
          >
            <div className="inline-block relative">
              <div className="bg-black/50 rounded-lg p-8 backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-white mb-6">Why Drive With Us?</h3>
                <ul className="space-y-4 text-left">
                  {[
                    'Competitive pay and benefits',
                    'Modern, well-maintained equipment',
                    'Excellent home time',
                    'Supportive dispatch team',
                    'Career advancement opportunities',
                    'Safety bonuses and recognition'
                  ].map((benefit, index) => (
                    <li key={index} className="text-gray-300 flex items-center">
                      <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                      {benefit}
                    </li>
                  ))}
                </ul>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full mt-6 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
                >
                  Apply Now
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Quote Form Section Component
const QuoteFormSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: '24/09/2025',
    zip: '',
    weight: '',
    org: '',
    truck: '',
    commodity: '',
    message: '',
    trucktype: 'TL (Truck Load)',
    scales: false
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        phone: '',
        email: '',
        date: '24/09/2025',
        zip: '',
        weight: '',
        org: '',
        truck: '',
        commodity: '',
        message: '',
        trucktype: 'TL (Truck Load)',
        scales: false
      });
    }, 3000);
  };

  return (
    <section id="quote-form" className="py-20 relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(/truck0.jpg)' }}
      ></div>
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/70"></div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-left mb-8"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Request a Shipping Quote
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-4xl"
        >
          {isSubmitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Application sent successfully!</h3>
              <p className="text-gray-600">Our manager will contact you shortly to clarify the details of cooperation.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* First Row - 4 columns */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your name"
                  required
                  className="w-full px-3 py-2.5 bg-white border-0 rounded text-gray-900 placeholder-gray-500 text-sm focus:outline-none focus:ring-1 focus:ring-red-500"
                />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Phone number"
                  required
                  className="w-full px-3 py-2.5 bg-white border-0 rounded text-gray-900 placeholder-gray-500 text-sm focus:outline-none focus:ring-1 focus:ring-red-500"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="E-mail"
                  required
                  className="w-full px-3 py-2.5 bg-white border-0 rounded text-gray-900 placeholder-gray-500 text-sm focus:outline-none focus:ring-1 focus:ring-red-500"
                />
                <input
                  type="text"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  placeholder="24/09/2025"
                  required
                  className="w-full px-3 py-2.5 bg-white border-0 rounded text-gray-900 placeholder-gray-500 text-sm focus:outline-none focus:ring-1 focus:ring-red-500"
                />
              </div>

              {/* Second Row - 4 columns */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <input
                  type="text"
                  name="zip"
                  value={formData.zip}
                  onChange={handleInputChange}
                  placeholder="Origin ZIP code"
                  required
                  className="w-full px-3 py-2.5 bg-white border-0 rounded text-gray-900 placeholder-gray-500 text-sm focus:outline-none focus:ring-1 focus:ring-red-500"
                />
                <input
                  type="text"
                  name="weight"
                  value={formData.weight}
                  onChange={handleInputChange}
                  placeholder="Weight"
                  required
                  className="w-full px-3 py-2.5 bg-white border-0 rounded text-gray-900 placeholder-gray-500 text-sm focus:outline-none focus:ring-1 focus:ring-red-500"
                />
                <input
                  type="text"
                  name="org"
                  value={formData.org}
                  onChange={handleInputChange}
                  placeholder="org"
                  required
                  className="w-full px-3 py-2.5 bg-white border-0 rounded text-gray-900 placeholder-gray-500 text-sm focus:outline-none focus:ring-1 focus:ring-red-500"
                />
                <select
                  name="truck"
                  value={formData.truck}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2.5 bg-white border-0 rounded text-gray-900 text-sm focus:outline-none focus:ring-1 focus:ring-red-500"
                >
                  <option value="" disabled>Trailer Style Request</option>
                  <option value="Local / Regional">Local / Regional</option>
                  <option value="Full Load">Full Load</option>
                  <option value="Flatbed">Flatbed</option>
                  <option value="Refrigerated">Refrigerated</option>
                  <option value="Step Deck / Specialized">Step Deck / Specialized</option>
                  <option value="TL (Truck Load)">TL (Truck Load)</option>
                  <option value="LTL (Less Than Truck Load)">LTL (Less Than Truck Load)</option>
                </select>
              </div>

              {/* Third Row - 3 columns with button */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <input
                  type="text"
                  name="commodity"
                  value={formData.commodity}
                  onChange={handleInputChange}
                  placeholder="Commodity"
                  required
                  className="w-full px-3 py-2.5 bg-white border-0 rounded text-gray-900 placeholder-gray-500 text-sm focus:outline-none focus:ring-1 focus:ring-red-500"
                />
                <input
                  type="text"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Special instructions"
                  required
                  className="w-full px-3 py-2.5 bg-white border-0 rounded text-gray-900 placeholder-gray-500 text-sm focus:outline-none focus:ring-1 focus:ring-red-500"
                />
                <select
                  name="trucktype"
                  value={formData.trucktype}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 bg-white border-0 rounded text-gray-900 text-sm focus:outline-none focus:ring-1 focus:ring-red-500"
                >
                  <option value="TL (Truck Load)">TL (Truck Load)</option>
                  <option value="LTL (Less Than Truck Load)">LTL (Less Than Truck Load)</option>
                </select>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-2.5 px-4 rounded font-semibold text-sm"
                >
                  Request a Quote
                </motion.button>
              </div>

              {/* Consent Checkbox */}
              <div className="pt-2">
                <div className="flex items-start space-x-2">
                  <input
                    type="checkbox"
                    id="scales"
                    name="scales"
                    checked={formData.scales}
                    onChange={handleInputChange}
                    required
                    className="mt-0.5 w-3 h-3 text-red-600 bg-white border-gray-300 rounded focus:ring-red-500"
                  />
                  <label htmlFor="scales" className="text-xs text-white leading-relaxed">
                    I consent to receive SMS from AFC TRANSPORT. Reply STOP to opt-out; Reply HELP; Message and data rates apply; Messaging frequency may vary. 
                    <a href="#" className="text-white hover:text-gray-300 underline ml-1">Privacy Policy</a>
                    <span className="mx-1"></span>
                    <a href="#" className="text-white hover:text-gray-300 underline">Terms & conditions</a>
                  </label>
                </div>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

// Contact Section Component
const ContactSection = () => {
  return (
    <section id="contact" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Get In Touch
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Ready to ship your freight? Contact our team for reliable transportation solutions.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="text-center">
              <div className="text-red-500 text-2xl font-bold mb-2">(555) 123-4567</div>
              <div className="text-gray-300 text-sm">Transportation Services</div>
            </div>
            <div className="text-center">
              <div className="text-red-500 text-2xl font-bold mb-2">(555) 987-6543</div>
              <div className="text-gray-300 text-sm">Driver Employment</div>
            </div>
            <div className="text-center">
              <div className="text-red-500 text-2xl font-bold mb-2">info@nomadexpress.com</div>
              <div className="text-gray-300 text-sm">General Inquiries</div>
            </div>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg text-base font-semibold shadow-lg hover:shadow-xl"
          >
            GET FREE QUOTE
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-black py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <img
                src="/logo.jpg"
                alt="Nomad Express Group Logo"
                className="h-8 w-auto"
              />
              <span className="text-white font-bold text-lg">Nomad Express Group</span>
            </div>
            <p className="text-gray-400 text-sm">
              Your trusted partner in freight transportation for over 25 years.
            </p>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>Flatbed Transport</li>
              <li>Heavy Haul</li>
              <li>Expedited Delivery</li>
              <li>Logistics Solutions</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>About Us</li>
              <li>Careers</li>
              <li>Driver Portal</li>
              <li>Blog</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>Phone: (555) 123-4567</li>
              <li>Email: info@truckingld.com</li>
              <li>24/7 Support Available</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 Nomad Express Group. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

// Enhanced Footer Component
const EnhancedFooter = () => {
  return (
    <footer className="bg-black py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img
                src="/logo.jpg"
                alt="Nomad Express Group Logo"
                className="h-8 w-auto"
              />
              <span className="text-white font-bold text-lg">Nomad Express Group</span>
            </div>
            <p className="text-gray-400 text-sm mb-6">
              Your trusted partner in freight transportation for over 10 years. Professional service, reliable delivery.
            </p>
            <div className="space-y-2">
              <div className="text-gray-400 text-sm">
                <span className="font-semibold text-white">Transportation Services:</span><br />
                Call (555) 123-4567
              </div>
              <div className="text-gray-400 text-sm">
                <span className="font-semibold text-white">Driver Employment:</span><br />
                Call (555) 987-6543
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Flatbed Transport</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Refrigerated Services</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Heavy Haul</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Logistics Solutions</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Our Team</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Driver Portal</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <motion.a
                href="tel:5551234567"
                whileHover={{ scale: 1.05 }}
                className="block bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm font-medium text-center transition-colors duration-200"
              >
                CALL NOW
              </motion.a>
              <motion.a
                href="#quote-form"
                whileHover={{ scale: 1.05 }}
                className="block border border-white text-white hover:bg-white hover:text-black px-4 py-2 rounded text-sm font-medium text-center"
              >
                Get Quote
              </motion.a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 Nomad Express Group. All rights reserved.
          </p>
        </div>
      </div>
      </footer>
  );
};

// Main Page Component
export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <TeamSection />
      <DriverSection />
      <QuoteFormSection />
      <ContactSection />
      <EnhancedFooter />
    </div>
  );
}