'use client';

import Navbar from '../../../../components/ui/Navbar';
import Footer from '../../../../components/ui/Footer';
import Container from '../../../../components/ui/Container';
import Section from '../../../../components/ui/Section';
import Button from '../../../../components/ui/Button';
import Image from 'next/image';
import { SERVICE_TYPES } from '../../../../utils/constants';

export default function ServiceDetailContent({ service, details }) {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      {/* Hero Section */}
      <Section background="dark" className="pt-32 pb-20">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${service.icon})` }}
        ></div>
        <div className="absolute inset-0 bg-black/70"></div>
        <Container className="relative z-10">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
              {service.title}
            </h1>
            <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto">
              {service.description}
            </p>
          </div>
        </Container>
      </Section>

      {/* Service Details */}
      <Section background="dark">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Service Overview</h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                {details.description}
              </p>
              
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-4">Who It's For</h3>
                <p className="text-gray-300">{details.who}</p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white mb-4">Equipment Used</h3>
                <p className="text-gray-300">{details.equipment}</p>
              </div>
            </div>

            <div>
              <div className="relative h-96 rounded-lg overflow-hidden mb-8">
                <Image 
                  src={service.icon} 
                  alt={service.title}
                  fill
                  className="object-cover"
                />
              </div>
              
              <div className="bg-black/40 border border-white/10 rounded-lg p-6">
                <h3 className="text-2xl font-bold text-white mb-4">Key Benefits</h3>
                <ul className="space-y-3">
                  {details.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start text-gray-300">
                      <span className="text-red-500 mr-3 mt-1">✓</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section background="dark">
        <Container>
          <div className="text-center bg-gradient-to-r from-red-900/20 to-red-800/20 rounded-lg p-12 border border-red-600/30">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Ship?</h2>
            <p className="text-gray-300 mb-8 text-lg">
              Get a free quote for your {service.title.toLowerCase()} needs
            </p>
            <Button href="/quote" variant="primary" size="lg">
              Request a Quote
            </Button>
          </div>
        </Container>
      </Section>

      <Footer />
    </div>
  );
}

