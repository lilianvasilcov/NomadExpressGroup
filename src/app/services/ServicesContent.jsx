'use client';

import { motion } from 'motion/react';
import Navbar from '../../components/ui/Navbar';
import Footer from '../../components/ui/Footer';
import PageHeader from '../../components/ui/PageHeader';
import Container from '../../components/ui/Container';
import Section from '../../components/ui/Section';
import Button from '../../components/ui/Button';
import Link from 'next/link';
import { SERVICE_TYPES } from '../../utils/constants';

export default function ServicesContent() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      {/* Hero Section */}
      <Section background="dark" className="pt-32 pb-20">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-60"
          style={{ backgroundImage: 'url(/logistics.jpg)' }}
        ></div>
        <div className="absolute inset-0 bg-black/70"></div>
        <Container className="relative z-10">
          <PageHeader 
            title="Transportation & Freight Services"
            subtitle="Comprehensive logistics solutions tailored to your needs"
          />
          <p className="text-gray-300 text-lg max-w-3xl mx-auto text-center">
            We specialize in flatbed, step deck, refrigerated, and specialized freight services. 
            Primarily transporting machinery, steel, building materials, and industrial equipment across all 48 states.
          </p>
        </Container>
      </Section>

      {/* Main Content with Animated Background */}
      <div className="bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
        {/* Animated Background Gradient - Whole Background - Optimized */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-0 w-96 h-96 bg-red-500 rounded-full blur-3xl animate-pulse will-change-opacity" style={{ animationDuration: '4s' }}></div>
          <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-red-500 rounded-full blur-3xl animate-pulse will-change-opacity" style={{ animationDelay: '2s', animationDuration: '4s' }}></div>
        </div>

        {/* Services Grid */}
        <section className="py-24 relative">
          <Container className="relative z-10">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
            >
              {SERVICE_TYPES.map((service, index) => (
                <Link key={index} href={`/services/${service.slug}`}>
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: 40, scale: 0.9 },
                      visible: { 
                        opacity: 1, 
                        y: 0, 
                        scale: 1,
                        transition: {
                          duration: 0.6,
                          ease: [0.16, 1, 0.3, 1]
                        }
                      }
                    }}
                    whileHover={{ 
                      y: -8,
                      scale: 1.02,
                      transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
                    }}
                    className="group relative h-[400px] rounded-2xl overflow-hidden cursor-pointer will-change-transform"
                  >
                    {/* Background Image */}
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105 will-change-transform"
                      style={{ backgroundImage: `url(${service.icon})` }}
                    ></div>
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40 group-hover:from-black/80 group-hover:via-black/50 group-hover:to-black/30 transition-all duration-300"></div>
                    
                    {/* Red Accent Border */}
                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-red-500/50 rounded-2xl transition-all duration-300"></div>
                    
                    {/* Content */}
                    <div className="relative z-10 h-full flex flex-col justify-end p-8">
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                        viewport={{ once: true }}
                        className="mb-4"
                      >
                        <div className="w-12 h-12 rounded-lg bg-red-500/20 backdrop-blur-sm flex items-center justify-center mb-4 group-hover:bg-red-500/30 transition-colors">
                          <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </div>
                      </motion.div>
                      
                      <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-red-400 transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-gray-300 mb-6 leading-relaxed">
                        {service.description}
                      </p>
                      
                      <motion.div
                        className="flex items-center gap-2 text-red-400 font-semibold group-hover:text-red-300 transition-colors"
                        whileHover={{ x: 5 }}
                      >
                        Learn More
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </motion.div>
                    </div>

                    {/* Simplified shine effect for performance */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/5 to-transparent will-change-transform"></div>
                  </motion.div>
                </Link>
              ))}
            </motion.div>
          </Container>
        </section>

        {/* CTA Section */}
        <section className="py-24 relative">
          <Container className="relative z-10">
            <div className="text-center bg-gradient-to-r from-red-900/20 to-red-800/20 rounded-lg p-12 border border-red-600/30">
              <h2 className="text-3xl font-bold text-white mb-4">Need a Custom Solution?</h2>
              <p className="text-gray-300 mb-8 text-lg">
                Our team can create a logistics solution tailored to your specific requirements
              </p>
              <Button href="/quote" variant="primary" size="lg">
                Request a Quote
              </Button>
            </div>
          </Container>
        </section>
      </div>

      <Footer />
    </div>
  );
}

