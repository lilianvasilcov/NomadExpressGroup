'use client';

import * as motion from 'motion/react-client';
import { services } from '../../data/servicesData';

const ServicesSection = () => {
  const scrollToQuoteForm = () => {
    const quoteSection = document.getElementById('quote');
    if (quoteSection) {
      quoteSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Transportation & Freight Services
          </h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            We specialize in flatbed, step deck, refrigerated, and specialized freight services. 
            Primarily transporting machinery, steel, building materials, and industrial equipment across all 48 states.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative rounded-lg shadow-lg overflow-hidden transition-all duration-300 h-48 md:h-72 group hover:shadow-3xl hover:shadow-gray-900/40 hover:scale-[1.02]"
              style={{
                backgroundImage: `url(${service.icon})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            >
              {/* Grey Overlay */}
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-all duration-300"></div>
              
              {/* Content */}
              <div className="relative z-10 p-4 md:p-8 text-white h-full flex flex-col justify-center md:justify-start">
                <div className="mb-4 md:mb-6 md:flex-1">
                  <h3 className="text-lg md:text-2xl font-bold text-white mb-2 md:mb-4 text-center md:text-left">
                    {service.title}
                  </h3>
                  {/* Hide description and features on mobile */}
                  <div className="hidden md:block">
                    <p className="text-gray-200 text-lg mb-4 leading-relaxed">
                      {service.description}
                    </p>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="text-gray-200 flex items-center">
                          <span className="w-2 h-2 rounded-full mr-3" style={{ backgroundColor: '#c3002e' }}></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                {/* Request Quote Button - Centered on mobile */}
                <div className="flex justify-center md:absolute md:bottom-6 md:left-0 md:right-0 z-20">
                  <motion.button
                    onClick={scrollToQuoteForm}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-white px-4 py-2 md:px-6 md:py-3 rounded-lg font-semibold transition-all duration-200 shadow-lg cursor-pointer text-sm md:text-base"
                    style={{
                      backgroundColor: '#c3002e',
                      background: 'linear-gradient(145deg, #c3002e, #a40025)',
                      boxShadow: '0 10px 15px -3px rgba(195, 0, 46, 0.3)'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = 'linear-gradient(145deg, #e10037, #c3002e)';
                      e.target.style.boxShadow = '0 20px 25px -5px rgba(195, 0, 46, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'linear-gradient(145deg, #c3002e, #a40025)';
                      e.target.style.boxShadow = '0 10px 15px -3px rgba(195, 0, 46, 0.3)';
                    }}
                  >
                    Request Quote
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Gradient Bottom Line */}
      <div className="mt-16 flex justify-center">
        <div 
          className="h-2 w-full max-w-7xl rounded-full"
          style={{
            background: `linear-gradient(to right, #e10037, #6a0011)`
          }}
        ></div>
      </div>
    </section>
  );
};

export default ServicesSection;