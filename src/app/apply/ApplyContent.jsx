'use client';

import { useState } from 'react';
import Navbar from '../../components/ui/Navbar';
import Footer from '../../components/ui/Footer';
import PageHeader from '../../components/ui/PageHeader';
import Container from '../../components/ui/Container';
import Section from '../../components/ui/Section';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import * as motion from 'motion/react-client';

export default function ApplyContent() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    city: "",
    state: "",
    cdlClass: "Class A",
    yearsExperience: "",
    endorsements: [],
    hasTWIC: false,
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleEndorsements = (endorsement) => {
    setFormData((prev) => {
      const exists = prev.endorsements.includes(endorsement);
      return {
        ...prev,
        endorsements: exists
          ? prev.endorsements.filter((e) => e !== endorsement)
          : [...prev.endorsements, endorsement],
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/apply', {
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
            firstName: "",
            lastName: "",
            phone: "",
            email: "",
            city: "",
            state: "",
            cdlClass: "Class A",
            yearsExperience: "",
            endorsements: [],
            hasTWIC: false,
            message: "",
          });
        }, 5000);
      } else {
        alert('Failed to submit application. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting application:', error);
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
          style={{ backgroundImage: 'url(/driver-bg.jpg)' }}
        ></div>
        <div className="absolute inset-0 bg-black/70"></div>
        <Container className="relative z-10">
          <PageHeader 
            title="Driver Application"
            subtitle="Join our team of professional drivers - Competitive pay, excellent equipment, and supportive team"
          />
        </Container>
      </Section>

      {/* Application Form */}
      <Section background="dark">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2">
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
                  <h2 className="text-3xl font-bold text-white mb-4">Application Submitted!</h2>
                  <p className="text-gray-300 text-lg mb-6">
                    Thank you for your interest in joining Nomad Express Group. We will review your 
                    application and contact you soon.
                  </p>
                  <Button href="/careers" variant="primary" size="lg">
                    Back to Careers
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-black/40 border border-white/10 rounded-lg p-8"
                >
                  <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Personal Information */}
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-3">
                        Personal Information
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-white font-medium mb-2">First Name *</label>
                          <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 bg-black/60 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                            placeholder="John"
                          />
                        </div>
                        <div>
                          <label className="block text-white font-medium mb-2">Last Name *</label>
                          <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 bg-black/60 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                            placeholder="Doe"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Contact Information */}
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-3">
                        Contact Information
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-white font-medium mb-2">Phone *</label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 bg-black/60 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                            placeholder="(555) 123-4567"
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
                            className="w-full px-4 py-3 bg-black/60 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                            placeholder="john.doe@email.com"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Location & Licensing */}
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-3">
                        Location & Licensing
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-white font-medium mb-2">City *</label>
                          <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 bg-black/60 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                            placeholder="Dallas"
                          />
                        </div>
                        <div>
                          <label className="block text-white font-medium mb-2">State *</label>
                          <input
                            type="text"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 bg-black/60 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                            placeholder="TX"
                          />
                        </div>
                        <div>
                          <label className="block text-white font-medium mb-2">CDL Class *</label>
                          <select
                            name="cdlClass"
                            value={formData.cdlClass}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-black/60 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                          >
                            <option value="Class A">CDL Class A</option>
                            <option value="Class B">CDL Class B</option>
                            <option value="Non-CDL">Non-CDL</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Experience */}
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-3">
                        Experience & Qualifications
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <label className="block text-white font-medium mb-2">Years of Experience *</label>
                          <input
                            type="number"
                            name="yearsExperience"
                            value={formData.yearsExperience}
                            onChange={handleChange}
                            min="0"
                            required
                            className="w-full px-4 py-3 bg-black/60 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                            placeholder="5"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-white font-medium mb-3">CDL Endorsements</label>
                          <div className="flex flex-wrap gap-4">
                            {['T', 'N', 'H', 'X', 'P'].map((code) => (
                              <label key={code} className="flex items-center cursor-pointer group">
                                <input
                                  type="checkbox"
                                  checked={formData.endorsements.includes(code)}
                                  onChange={() => handleEndorsements(code)}
                                  className="w-5 h-5 rounded border-white/20 bg-black/60 text-red-600 focus:ring-2 focus:ring-red-500 cursor-pointer"
                                />
                                <span className="ml-2 text-white group-hover:text-red-400 transition-colors">
                                  {code}
                                </span>
                              </label>
                            ))}
                            <label className="flex items-center cursor-pointer group">
                              <input
                                type="checkbox"
                                name="hasTWIC"
                                checked={formData.hasTWIC}
                                onChange={handleChange}
                                className="w-5 h-5 rounded border-white/20 bg-black/60 text-red-600 focus:ring-2 focus:ring-red-500 cursor-pointer"
                              />
                              <span className="ml-2 text-white group-hover:text-red-400 transition-colors">
                                TWIC
                              </span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Additional Details */}
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-3">
                        Additional Details
                      </h2>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        placeholder="Tell us about your background, preferred equipment, lanes, availability, etc."
                        className="w-full px-4 py-3 bg-black/60 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
                      />
                    </div>

                    <div className="flex justify-end pt-4">
                      <Button type="submit" variant="primary" size="lg">
                        Submit Application
                      </Button>
                    </div>
                  </form>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              <Card className="bg-black/40 border border-white/10 p-6">
                <h3 className="text-xl font-bold text-white mb-4 border-l-4 pl-3" style={{ borderColor: '#c3002e' }}>
                  Why Drive With Us
                </h3>
                <ul className="text-gray-300 space-y-3">
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">✓</span>
                    <span>Competitive pay and benefits</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">✓</span>
                    <span>Modern, well-maintained equipment</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">✓</span>
                    <span>Excellent home time</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">✓</span>
                    <span>24/7 dispatch support</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">✓</span>
                    <span>Safety bonuses and recognition</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">✓</span>
                    <span>Career advancement opportunities</span>
                  </li>
                </ul>
              </Card>

              <Card className="bg-black/40 border border-white/10 p-6">
                <h3 className="text-xl font-bold text-white mb-4 border-l-4 pl-3" style={{ borderColor: '#c3002e' }}>
                  Application Tips
                </h3>
                <ul className="text-gray-300 space-y-3 text-sm">
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    <span>Keep your phone available for follow-up calls</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    <span>Share your preferred lanes and equipment</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    <span>Include all endorsements and certifications</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    <span>Be specific about your experience</span>
                  </li>
                </ul>
              </Card>

              <Card className="bg-gradient-to-r from-red-900/20 to-red-800/20 border border-red-600/30 p-6">
                <h3 className="text-xl font-bold text-white mb-3">Questions?</h3>
                <p className="text-gray-300 text-sm mb-4">
                  Our recruiting team is here to help. Contact us for more information.
                </p>
                <Button href="/contact" variant="secondary" size="md" className="w-full">
                  Contact Recruiting
                </Button>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      <Footer />
    </div>
  );
}

