'use client';

import { useState } from 'react';
import Navbar from '../../components/ui/Navbar';
import Footer from '../../components/ui/Footer';
import PageHeader from '../../components/ui/PageHeader';
import Container from '../../components/ui/Container';
import Section from '../../components/ui/Section';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { COMPANY_INFO } from '../../utils/constants';

export default function ContactContent() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
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
      const response = await fetch('/api/contact', {
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
            email: '',
            phone: '',
            subject: '',
            message: ''
          });
        }, 5000);
      } else {
        alert('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error sending message:', error);
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
            title="Contact Us"
            subtitle="Get in touch with our team - We're here to help"
          />
        </Container>
      </Section>

      {/* Contact Info */}
      <Section background="dark">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="bg-black/40 border border-white/10 p-6 text-center">
              <div className="text-4xl mb-4">📞</div>
              <h3 className="text-xl font-bold text-white mb-2">Transportation Services</h3>
              <a 
                href={`tel:${COMPANY_INFO.phone.transportation.replace(/[()-\s]/g, '')}`}
                className="text-red-400 hover:text-red-300 text-lg font-semibold"
              >
                {COMPANY_INFO.phone.transportation}
              </a>
            </Card>
            <Card className="bg-black/40 border border-white/10 p-6 text-center">
              <div className="text-4xl mb-4">🚛</div>
              <h3 className="text-xl font-bold text-white mb-2">Driver Employment</h3>
              <a 
                href={`tel:${COMPANY_INFO.phone.employment.replace(/[()-\s]/g, '')}`}
                className="text-red-400 hover:text-red-300 text-lg font-semibold"
              >
                {COMPANY_INFO.phone.employment}
              </a>
            </Card>
            <Card className="bg-black/40 border border-white/10 p-6 text-center">
              <div className="text-4xl mb-4">✉️</div>
              <h3 className="text-xl font-bold text-white mb-2">Email</h3>
              <a 
                href={`mailto:${COMPANY_INFO.email}`}
                className="text-red-400 hover:text-red-300 text-lg font-semibold"
              >
                {COMPANY_INFO.email}
              </a>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="bg-black/40 border border-white/10 p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Send Us a Message</h2>
              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                  <p className="text-gray-300">We'll get back to you as soon as possible.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-white font-medium mb-2">Name</label>
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
                    <label className="block text-white font-medium mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 bg-black/60 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-black/60 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 bg-black/60 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-2 bg-black/60 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                  <Button type="submit" variant="primary" size="lg" className="w-full">
                    Send Message
                  </Button>
                </form>
              )}
            </Card>

            {/* Office Info */}
            <div className="space-y-6">
              <Card className="bg-black/40 border border-white/10 p-6">
                <h3 className="text-xl font-bold text-white mb-4">Office Address</h3>
                <div className="text-gray-300 space-y-2">
                  <p>{COMPANY_INFO.address.street}</p>
                  <p>{COMPANY_INFO.address.city}, {COMPANY_INFO.address.state} {COMPANY_INFO.address.zip}</p>
                </div>
              </Card>

              <Card className="bg-black/40 border border-white/10 p-6">
                <h3 className="text-xl font-bold text-white mb-4">Hours of Operation</h3>
                <div className="text-gray-300 space-y-2">
                  <p>{COMPANY_INFO.hours.weekdays}</p>
                  <p>{COMPANY_INFO.hours.saturday}</p>
                  <p>{COMPANY_INFO.hours.sunday}</p>
                </div>
              </Card>

              <Card className="bg-black/40 border border-white/10 p-6">
                <h3 className="text-xl font-bold text-white mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Button href="/quote" variant="primary" className="w-full">
                    Request a Quote
                  </Button>
                  <Button href="/careers" variant="secondary" className="w-full">
                    Driver Application
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      {/* Map Placeholder */}
      <Section background="dark" className="pb-20">
        <Container>
          <Card className="bg-black/40 border border-white/10 p-8">
            <h3 className="text-xl font-bold text-white mb-4">Location Map</h3>
            <div className="bg-gray-900 h-96 rounded-lg flex items-center justify-center">
              <p className="text-gray-400">Map integration can be added here (Google Maps, Mapbox, etc.)</p>
            </div>
          </Card>
        </Container>
      </Section>

      <Footer />
    </div>
  );
}

