'use client';

import * as motion from 'motion/react-client';
import Image from 'next/image';
import Link from 'next/link';
import { ROUTES, FLEET_TYPES } from '../../utils/constants';

const FleetPreviewSection = () => {
  // Show only 3 fleet types as preview
  const previewFleet = FLEET_TYPES.slice(0, 3);

  return (
    <section className="py-20 bg-black relative overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: 'url(/gradient.png)' }}
      ></div>
      <div className="absolute inset-0 bg-black/80"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Our Modern Fleet
          </h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Over 150 well-maintained trucks and trailers equipped with the latest technology for safety, 
            tracking, and efficiency.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {previewFleet.map((equipment, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative rounded-lg overflow-hidden group"
            >
              <div className="relative h-48">
                <Image
                  src={equipment.image}
                  alt={equipment.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
              </div>
              <div className="bg-black/40 border border-white/10 p-6 -mt-4 relative z-10">
                <h3 className="text-xl font-bold text-white mb-2">{equipment.name}</h3>
                <p className="text-gray-300 text-sm">{equipment.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link href={ROUTES.fleet}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 border border-white hover:bg-white hover:text-black"
            >
              View Full Fleet
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FleetPreviewSection;

