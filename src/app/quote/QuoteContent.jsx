'use client';

import { useState } from 'react';
import Navbar from '../../components/ui/Navbar';
import Footer from '../../components/ui/Footer';
import PageHeader from '../../components/ui/PageHeader';
import Container from '../../components/ui/Container';
import Section from '../../components/ui/Section';
import Button from '../../components/ui/Button';
import * as motion from 'motion/react-client';

export default function QuoteContent() {
  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
    phone: '',
    email: '',
    freightType: '',
    pickupLocation: '',
    deliveryLocation: '',
    weight: '',
    dimensions: '',
    pickupDate: '',
    notes: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        setIsSubmitted(true);
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({
            name: '',
            companyName: '',
            phone: '',
            email: '',
            freightType: '',
            pickupLocation: '',
            deliveryLocation: '',
            weight: '',
            dimensions: '',
            pickupDate: '',
            notes: ''
          });
        }, 5000);
      } else {
        alert('Failed to submit quote request. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting quote:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      {/* Hero Section */}
      <Section background="dark" className="pt-32 pb-20">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: 'url(/truck0.jpg)' }}
        ></div>
        <div className="absolute inset-0 bg-black/70"></div>
        <Container className="relative z-10">
          <PageHeader 
            title="Request a Quote"
            subtitle="Get a free shipping quote for your freight - Fast, accurate, and competitive pricing"
          />
        </Container>
      </Section>

      {/* Quote Form */}
      <Section background="dark">
        <Container>
          <div className="max-w-4xl mx-auto">
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-black/40 border border-white/10 rounded-lg p-12 text-center"
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">Quote Request Received!</h2>
                <p className="text-gray-300 text-lg mb-6">
                  Thank you for your request. Our team will review your information and get back to you 
                  within 24 hours with a competitive quote.
                </p>
                <Button href="/contact" variant="primary" size="lg">
                  Contact Us
                </Button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-black/40 border border-white/10 rounded-lg p-8"
              >
                <h2 className="text-2xl font-bold text-white mb-6">Shipping Details</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white font-medium mb-2">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 bg-black/60 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>
                    <div>
                      <label className="block text-white font-medium mb-2">Company Name</label>
                      <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-black/60 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white font-medium mb-2">Phone *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 bg-black/60 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>
                    <div>
                      <label className="block text-white font-medium mb-2">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 bg-black/60 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Freight Type *</label>
                    <select
                      name="freightType"
                      value={formData.freightType}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 bg-black/60 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      <option value="">Select freight type</option>
                      <option value="flatbed">Flatbed</option>
                      <option value="refrigerated">Refrigerated</option>
                      <option value="dry-van">Dry Van</option>
                      <option value="ltl">LTL</option>
                      <option value="expedited">Expedited</option>
                      <option value="heavy-haul">Heavy Haul</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white font-medium mb-2">Pickup Location *</label>
                      <input
                        type="text"
                        name="pickupLocation"
                        value={formData.pickupLocation}
                        onChange={handleChange}
                        required
                        placeholder="City, State or ZIP"
                        className="w-full px-4 py-2 bg-black/60 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>
                    <div>
                      <label className="block text-white font-medium mb-2">Delivery Location *</label>
                      <input
                        type="text"
                        name="deliveryLocation"
                        value={formData.deliveryLocation}
                        onChange={handleChange}
                        required
                        placeholder="City, State or ZIP"
                        className="w-full px-4 py-2 bg-black/60 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white font-medium mb-2">Weight (lbs)</label>
                      <input
                        type="text"
                        name="weight"
                        value={formData.weight}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-black/60 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>
                    <div>
                      <label className="block text-white font-medium mb-2">Dimensions (L x W x H)</label>
                      <input
                        type="text"
                        name="dimensions"
                        value={formData.dimensions}
                        onChange={handleChange}
                        placeholder="e.g., 48x48x48"
                        className="w-full px-4 py-2 bg-black/60 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Preferred Pickup Date</label>
                    <input
                      type="date"
                      name="pickupDate"
                      value={formData.pickupDate}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-black/60 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Special Requirements / Notes</label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-2 bg-black/60 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>

                  <Button type="submit" variant="primary" size="lg" className="w-full">
                    Request Quote
                  </Button>
                </form>
              </motion.div>
            )}
          </div>
        </Container>
      </Section>

      <Footer />
    </div>
  );
}

