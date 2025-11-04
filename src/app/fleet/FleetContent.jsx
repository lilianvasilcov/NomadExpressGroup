'use client';

import Navbar from '../../components/ui/Navbar';
import Footer from '../../components/ui/Footer';
import PageHeader from '../../components/ui/PageHeader';
import Container from '../../components/ui/Container';
import Section from '../../components/ui/Section';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Image from 'next/image';
import { FLEET_TYPES } from '../../utils/constants';

export default function FleetContent() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      {/* Hero Section */}
      <Section background="dark" className="pt-32 pb-20">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: 'url(/truck0.jpg)' }}
        ></div>
        <div className="absolute inset-0 bg-black/70"></div>
        <Container className="relative z-10">
          <PageHeader 
            title="Our Fleet"
            subtitle="Modern equipment, expert maintenance, and reliable service"
          />
          <div className="max-w-3xl mx-auto text-center text-gray-300 text-lg">
            <p className="mb-4">
              Our fleet consists of over 150 well-maintained trucks and trailers, equipped with the latest 
              technology for safety, tracking, and efficiency.
            </p>
            <p>
              We maintain strict maintenance schedules and safety standards to ensure your freight arrives 
              safely and on time, every time.
            </p>
          </div>
        </Container>
      </Section>

      {/* Fleet Types */}
      <Section background="dark">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FLEET_TYPES.map((equipment, index) => (
              <Card key={index} className="bg-black/40 border border-white/10 overflow-hidden">
                <div className="relative h-64">
                  <Image 
                    src={equipment.image} 
                    alt={equipment.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3">{equipment.name}</h3>
                  <p className="text-gray-300 mb-4">{equipment.description}</p>
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-red-400 mb-2">Specifications:</h4>
                    <ul className="space-y-1">
                      {equipment.specs.map((spec, idx) => (
                        <li key={idx} className="text-gray-400 text-sm flex items-center">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-2"></span>
                          {spec}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Fleet Features */}
      <Section background="dark">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Fleet Technology & Safety</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="text-red-500 text-2xl mr-4">📡</div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">GPS Tracking</h3>
                    <p className="text-gray-300">Real-time location tracking for all shipments</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="text-red-500 text-2xl mr-4">🔧</div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Regular Maintenance</h3>
                    <p className="text-gray-300">Preventive maintenance programs ensure reliability</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="text-red-500 text-2xl mr-4">🛡️</div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Safety Standards</h3>
                    <p className="text-gray-300">DOT compliant with excellent safety ratings</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="text-red-500 text-2xl mr-4">📊</div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Performance Monitoring</h3>
                    <p className="text-gray-300">Continuous monitoring and optimization</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden">
              <Image 
                src="/truck0.jpg" 
                alt="Fleet Technology"
                fill
                className="object-cover"
              />
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
              Request a quote and experience our reliable fleet in action
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

