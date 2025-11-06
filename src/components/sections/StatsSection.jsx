'use client';

import { motion } from 'motion/react';
import Counter from '../ui/Counter';
import { stats } from '../../data/statsData';

const StatsSection = () => {
  return (
    <section className="py-24 relative overflow-hidden" style={{ backgroundColor: '#F9F6EE' }}>
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-500 rounded-full blur-3xl"></div>
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-600 text-sm font-medium mb-6"
          >
            <span>By The Numbers</span>
          </motion.div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-black mb-6">
            Trusted by
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-800">
              Industry Leaders
            </span>
          </h2>
          <p className="text-gray-700 text-xl">
            Our numbers speak for our commitment to excellence
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
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
          {stats.map((stat, index) => (
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
              className="group relative p-8 rounded-2xl bg-white/60 backdrop-blur-sm border border-gray-200 hover:border-red-500/30 hover:shadow-xl hover:shadow-red-500/10 will-change-transform cursor-pointer"
            >
              {/* Icon Background */}
              <div className="absolute top-4 right-4 w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-8 h-8 rounded-full bg-red-500/20"></div>
              </div>

              <div className="text-center">
                <div 
                  className="text-5xl sm:text-6xl md:text-7xl font-bold mb-3 bg-gradient-to-br from-red-600 to-red-800 bg-clip-text text-transparent"
                  style={{ 
                    filter: 'drop-shadow(0 2px 4px rgba(195, 0, 46, 0.2))'
                  }}
                >
                  <Counter end={stat.number} />
                  {stat.suffix}
                </div>
                <div className="text-gray-800 text-base sm:text-lg font-semibold">
                  {stat.label}
                </div>
              </div>

              {/* Decorative Line */}
              <motion.div 
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent"
                initial={{ width: 0 }}
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              ></motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;
