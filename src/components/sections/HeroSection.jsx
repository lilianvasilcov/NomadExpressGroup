'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { ROUTES } from '../../utils/constants';

const HeroSection = () => {
  return (
    <section id="about" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Optimized Image Background - CSS animation for better performance */}
      <div 
        className="absolute inset-0 w-full h-full hero-zoom"
        style={{ 
          backgroundImage: 'url(/truck0.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Optimized Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-red-950/20 via-transparent to-black/40"></div>

      {/* Simplified Grid Pattern - removed for performance */}
      
      {/* Hero Content */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight will-change-transform"
        >
          Reliable Nationwide
          <br />
          <span 
            className="font-bold bg-clip-text text-transparent"
            style={{
              backgroundImage: `linear-gradient(135deg, #c3002e, #ff1744, #c3002e)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Freight Transportation
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          className="text-xl sm:text-2xl md:text-3xl mb-12 max-w-3xl mx-auto font-light text-gray-200 leading-relaxed will-change-transform"
        >
          Professional drivers, modern fleet, and reliable service.
          <br />
          <span className="text-gray-300">Your cargo, our commitment.</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center will-change-transform"
        >
          <Link href={ROUTES.quote}>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative overflow-hidden bg-gradient-to-r from-[#c3002e] to-[#a40025] text-white px-10 py-5 rounded-xl text-lg font-semibold shadow-2xl transition-all duration-200 group will-change-transform"
              style={{ 
                boxShadow: '0 10px 25px rgba(195, 0, 46, 0.3)',
              }}
            >
              <span className="relative z-10">Get a Free Quote</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#ff1744] to-[#c3002e] opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </motion.button>
          </Link>
          <Link href={ROUTES.careers}>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative overflow-hidden backdrop-blur-sm bg-white/10 border-2 border-white/30 text-white hover:bg-white/20 px-10 py-5 rounded-xl text-lg font-semibold transition-all duration-200 will-change-transform"
            >
              Drive With Us
            </motion.button>
          </Link>
        </motion.div>
      </div>

      {/* Scroll Indicator - CSS Animation for better performance */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 will-change-transform"
      >
        <div 
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
          style={{ animation: 'scrollBounce 2s ease-in-out infinite' }}
        >
          <div 
            className="w-1.5 h-1.5 bg-white/50 rounded-full mt-2"
            style={{ animation: 'scrollDot 2s ease-in-out infinite' }}
          />
        </div>
        <style jsx>{`
          @keyframes scrollBounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(10px); }
          }
          @keyframes scrollDot {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(8px); }
          }
        `}</style>
      </motion.div>
    </section>
  );
};

export default HeroSection;
