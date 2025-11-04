'use client';

import * as motion from 'motion/react-client';
import Link from 'next/link';
import { ROUTES, SERVICE_TYPES } from '../../utils/constants';

const ServicesSection = () => {
  // Show only 3 key services as featured
  const featuredServices = SERVICE_TYPES.slice(0, 3);

  return (
    <section id="services" className="py-20 bg-black relative overflow-hidden">
      {/* Background image and dark overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(/gradient.png)' }}
      ></div>
      <div className="absolute inset-0 bg-black/60"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Our Key Services
          </h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Comprehensive transportation solutions tailored to your needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredServices.map((service, index) => (
            <Link key={index} href={`${ROUTES.services}/${service.slug}`}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative rounded-lg shadow-lg overflow-hidden transition-all duration-300 h-64 group hover:shadow-3xl hover:shadow-gray-900/40 hover:scale-[1.02] cursor-pointer"
                style={{
                  backgroundImage: `url(${service.icon})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}
              >
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/60 group-hover:bg-black/50 transition-all duration-300"></div>
                
                {/* Content */}
                <div className="relative z-10 p-6 text-white h-full flex flex-col justify-end">
                  <h3 className="text-xl font-bold text-white mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-200 text-sm mb-4 leading-relaxed">
                    {service.description}
                  </p>
                  <div className="text-red-400 font-semibold group-hover:text-red-300 transition-colors">
                    Learn More →
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href={ROUTES.services}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 border border-white hover:bg-white hover:text-black"
            >
              View All Services
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;