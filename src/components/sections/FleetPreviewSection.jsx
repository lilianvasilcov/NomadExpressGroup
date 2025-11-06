'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { ROUTES, FLEET_TYPES } from '../../utils/constants';

const FleetPreviewSection = () => {
  // Show only 3 fleet types as preview
  const previewFleet = FLEET_TYPES.slice(0, 3);

  return (
    <section className="py-24 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/2 left-1/4 w-72 h-72 bg-red-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-red-500 rounded-full blur-3xl"></div>
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
            <span>Our Fleet</span>
          </motion.div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
            Modern Equipment for
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700">
              Every Need
            </span>
          </h2>
          <p className="text-gray-300 text-xl max-w-3xl mx-auto">
            Over 150 well-maintained trucks and trailers equipped with the latest technology for safety, 
            tracking, and efficiency.
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
          {previewFleet.map((equipment, index) => (
            <motion.div
              key={index}
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
              className="group relative rounded-2xl overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10 hover:border-red-500/50 will-change-transform cursor-pointer"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={equipment.image}
                  alt={equipment.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500 will-change-transform"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                
                {/* Red Accent Bar */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-transparent"></div>
              </div>
              
              <div className="p-6 space-y-3">
                <h3 className="text-2xl font-bold text-white group-hover:text-red-400 transition-colors">
                  {equipment.name}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {equipment.description}
                </p>
                
                {/* Specs */}
                <div className="pt-4 border-t border-white/10 space-y-2">
                  {equipment.specs.slice(0, 2).map((spec, specIndex) => (
                    <div key={specIndex} className="flex items-center gap-2 text-sm text-gray-400">
                      <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center">
          <Link href={ROUTES.fleet}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative overflow-hidden bg-white/10 backdrop-blur-md border-2 border-white/20 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:border-red-500/50 hover:bg-red-500/10"
            >
              <span className="relative z-10 flex items-center gap-2">
                View Full Fleet
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

export default FleetPreviewSection;

