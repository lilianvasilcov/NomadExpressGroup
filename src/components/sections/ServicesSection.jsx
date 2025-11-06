'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { ROUTES, SERVICE_TYPES } from '../../utils/constants';

const ServicesSection = () => {
  // Show only 3 key services as featured
  const featuredServices = SERVICE_TYPES.slice(0, 3);

  return (
    <section id="services" className="py-24 bg-gradient-to-b from-gray-900 via-black to-black relative overflow-hidden">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-red-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-red-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.7, 
            ease: [0.16, 1, 0.3, 1],
            staggerChildren: 0.1
          }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-16 will-change-transform"
        >
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: 0.5,
              ease: [0.16, 1, 0.3, 1]
            }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium mb-6"
          >
            <span>Our Services</span>
          </motion.div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
            Comprehensive
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700">
              Transportation Solutions
            </span>
          </h2>
          <p className="text-gray-300 text-xl max-w-3xl mx-auto">
            Tailored freight services designed to meet your unique business needs
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
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
          {featuredServices.map((service, index) => (
            <Link key={index} href={`${ROUTES.services}/${service.slug}`}>
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

        <div className="text-center">
          <Link href={ROUTES.services}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative overflow-hidden bg-white/10 backdrop-blur-md border-2 border-white/20 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:border-red-500/50 hover:bg-red-500/10"
            >
              <span className="relative z-10 flex items-center gap-2">
                View All Services
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;