'use client';

import * as motion from 'motion/react-client';
import Link from 'next/link';
import { ROUTES } from '../../utils/constants';

const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: 'Nomad Express Group has been our go-to carrier for over 5 years. Their reliability and professionalism are unmatched.',
      author: 'Sarah Johnson',
      company: 'ABC Manufacturing',
      role: 'Logistics Manager'
    },
    {
      quote: 'The best transportation partner we\'ve worked with. On-time delivery, excellent communication, and fair pricing.',
      author: 'Michael Chen',
      company: 'Steel Works Inc.',
      role: 'Operations Director'
    },
    {
      quote: 'Professional drivers, modern equipment, and outstanding customer service. Highly recommended!',
      author: 'Robert Martinez',
      company: 'Construction Supply Co.',
      role: 'Procurement Manager'
    }
  ];

  return (
    <section className="py-20 bg-black relative overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: 'url(/truck0.jpg)' }}
      ></div>
      <div className="absolute inset-0 bg-black/90"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            What Our Clients Say
          </h2>
          <p className="text-gray-300 text-lg">
            Trusted by hundreds of satisfied customers across the nation
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-black/40 border border-white/10 rounded-lg p-6"
            >
              <div className="mb-4">
                <svg className="w-8 h-8 text-red-500 mb-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                </svg>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed italic">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div className="border-t border-white/10 pt-4">
                <p className="text-white font-semibold">{testimonial.author}</p>
                <p className="text-gray-400 text-sm">{testimonial.role}</p>
                <p className="text-gray-500 text-sm">{testimonial.company}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link href={ROUTES.contact}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 border border-white hover:bg-white hover:text-black"
            >
              Read More Testimonials
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

