'use client';

import * as motion from 'motion/react-client';
import Link from 'next/link';
import { ROUTES } from '../../utils/constants';

const HeroSection = () => {
  return (
    <section id="about" className="relative h-screen flex items-center justify-center overflow-hidden">
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
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
        >
          Reliable Nationwide<br />
          <span 
            className="font-bold"
            style={{
              background: `linear-gradient(to right, #e10037, #6a0011)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >Freight Transportation</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-lg sm:text-xl md:text-2xl mb-10 max-w-3xl mx-auto font-light text-gray-200"
        >
          Professional drivers, modern fleet, and reliable service. 
          Your cargo, our commitment.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href={ROUTES.quote}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Get a Quote
            </motion.button>
          </Link>
          <Link href={ROUTES.careers}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200"
            >
              Drive With Us
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
