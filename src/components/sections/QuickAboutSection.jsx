'use client';

import * as motion from 'motion/react-client';
import Image from 'next/image';
import Link from 'next/link';
import { ROUTES } from '../../utils/constants';

const QuickAboutSection = () => {
  return (
    <section className="py-20 bg-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Reliable Nationwide Freight Transportation
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Nomad Express Group has been your trusted partner in freight transportation for over a decade. 
              We specialize in providing reliable, professional freight services while building lasting relationships 
              with both drivers and customers.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              With a fleet of over 150 trucks serving clients across all 48 contiguous states, we're recognized as 
              one of the top for-hire carriers in the industry.
            </p>
            <Link href={ROUTES.about}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 border border-white hover:bg-white hover:text-black"
              >
                Learn More About Us
              </motion.button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative h-96 rounded-lg overflow-hidden"
          >
            <Image
              src="/truck0.jpg"
              alt="Nomad Express Group Fleet"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default QuickAboutSection;

