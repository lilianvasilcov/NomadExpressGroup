'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { ROUTES } from '../../utils/constants';

const QuickAboutSection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-black via-black to-gray-900 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-red-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-500 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ 
              duration: 0.7, 
              ease: [0.16, 1, 0.3, 1],
              staggerChildren: 0.1
            }}
            viewport={{ once: true, margin: '-100px' }}
            className="space-y-6 will-change-transform"
          >
            {/* Section Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1]
              }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium mb-4"
            >
              <span>About Us</span>
            </motion.div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Your Trusted Partner in
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700">
                Freight Transportation
              </span>
            </h2>
            
            <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
              <p>
                Nomad Express Group has been your trusted partner in freight transportation for over a decade. 
                We specialize in providing reliable, professional freight services while building lasting relationships 
                with both drivers and customers.
              </p>
              <p>
                With a fleet of over <span className="text-red-500 font-semibold">50 trucks</span> serving clients across all 
                <span className="text-red-500 font-semibold"> 48 contiguous states</span>, we're recognized as 
                one of the top for-hire carriers in the industry.
              </p>
            </div>

            {/* Feature List */}
            <motion.div 
              className="grid grid-cols-2 gap-4 my-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.08,
                    delayChildren: 0.2
                  }
                }
              }}
            >
              {[
                { icon: '🚚', text: '50+ Trucks' },
                { icon: '📌', text: '48 States' },
                { icon: '⭐️', text: 'Top Rated' },
                { icon: '🕣', text: '24/7 Support' }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 15, scale: 0.9 },
                    visible: { 
                      opacity: 1, 
                      y: 0, 
                      scale: 1,
                      transition: {
                        duration: 0.4,
                        ease: [0.16, 1, 0.3, 1]
                      }
                    }
                  }}
                  whileHover={{ 
                    y: -3,
                    scale: 1.02,
                    transition: { duration: 0.2 }
                  }}
                  className="flex items-center gap-3 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all will-change-transform"
                >
                  <span className="text-2xl">{feature.icon}</span>
                  <span className="text-white font-medium">{feature.text}</span>
                </motion.div>
              ))}
            </motion.div>

            <Link href={ROUTES.about}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative overflow-hidden bg-gradient-to-r from-[#c3002e] to-[#a40025] text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-red-500/30"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Learn More About Us
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </motion.button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ 
              duration: 0.7, 
              ease: [0.16, 1, 0.3, 1]
            }}
            viewport={{ once: true, margin: '-100px' }}
            className="relative group will-change-transform"
          >
            {/* Simplified decorative border for performance */}
            
            <div className="relative h-[500px] rounded-2xl overflow-hidden border border-white/10">
              <Image
                src="/truck0.jpg"
                alt="Nomad Express Group Fleet"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500 will-change-transform"
                priority={false}
                loading="lazy"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              
              {/* Floating Card */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                viewport={{ once: true }}
                className="absolute bottom-6 left-6 right-6 p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 will-change-transform"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-bold text-lg">Industry Leader</p>
                    <p className="text-gray-300 text-sm">Top-rated carrier since 2018</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default QuickAboutSection;

