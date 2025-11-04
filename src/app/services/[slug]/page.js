import { metadata } from './metadata';
import Navbar from '../../../../components/ui/Navbar';
import Footer from '../../../../components/ui/Footer';
import Container from '../../../../components/ui/Container';
import Section from '../../../../components/ui/Section';
import Button from '../../../../components/ui/Button';
import Image from 'next/image';
import { SERVICE_TYPES } from '../../../../utils/constants';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
  const service = SERVICE_TYPES.find(s => s.slug === params.slug);
  if (!service) return { title: 'Service Not Found' };
  
  return {
    title: service.title,
    description: service.description,
  };
}

export default function ServiceDetailPage({ params }) {
  const service = SERVICE_TYPES.find(s => s.slug === params.slug);
  
  if (!service) {
    notFound();
  }

  const serviceDetails = {
    'full-truckload': {
      description: 'Full Truckload (FTL) shipping is ideal for businesses that need to transport large quantities of goods. We provide complete trailer loads for faster, direct delivery without the need for consolidation.',
      benefits: [
        'Faster transit times - no stops for consolidation',
        'Reduced risk of damage - no multiple handling',
        'Direct delivery to destination',
        'Cost-effective for large shipments',
        'Better security and tracking'
      ],
      equipment: '53-foot dry vans, reefers, and flatbeds',
      who: 'Manufacturers, distributors, and businesses shipping large volumes'
    },
    'ltl': {
      description: 'Less Than Truckload (LTL) shipping is perfect for smaller shipments that don\'t require a full trailer. We consolidate your freight with other shipments to maximize efficiency and reduce costs.',
      benefits: [
        'Cost-effective for smaller shipments',
        'Flexible scheduling options',
        'Reduced environmental impact',
        'Access to extensive network',
        'Professional handling and tracking'
      ],
      equipment: 'Regional and long-haul LTL trailers',
      who: 'Small to medium businesses, e-commerce, and partial shipments'
    },
    'expedited': {
      description: 'Our expedited services guarantee time-sensitive delivery for critical shipments. We understand that sometimes speed is everything, and we deliver.',
      benefits: [
        'Guaranteed delivery times',
        'Priority handling',
        '24/7 monitoring',
        'Direct routing',
        'Real-time tracking updates'
      ],
      equipment: 'Dedicated expedited fleet and hotshot services',
      who: 'Time-critical shipments, emergency freight, just-in-time manufacturing'
    },
    'refrigerated': {
      description: 'Temperature-controlled transportation for perishable goods, pharmaceuticals, and food products. Our reefers maintain precise temperature control throughout the journey.',
      benefits: [
        'Temperature monitoring 24/7',
        'Range: -20°F to 70°F',
        'GPS tracking and alerts',
        'FDA compliance',
        'Expert handling of perishables'
      ],
      equipment: '53-foot refrigerated trailers with advanced climate control',
      who: 'Food producers, pharmaceutical companies, grocery chains, food service'
    },
    'flatbed': {
      description: 'Specialized flatbed and step deck services for oversized, heavy, or irregularly shaped cargo. Perfect for machinery, steel, building materials, and construction equipment.',
      benefits: [
        'No size or weight restrictions',
        'Easy loading and unloading',
        'Secure tie-down and tarping',
        'Permit assistance available',
        'Expert oversize handling'
      ],
      equipment: '48ft-53ft flatbeds and step decks',
      who: 'Construction companies, manufacturers, machinery dealers, steel fabricators'
    },
    'warehousing': {
      description: 'Complete 3PL logistics solutions including warehousing, distribution, inventory management, and fulfillment services.',
      benefits: [
        'Strategic warehouse locations',
        'Inventory management',
        'Order fulfillment',
        'Pick and pack services',
        'Integrated transportation'
      ],
      equipment: 'Modern warehouse facilities with climate control',
      who: 'E-commerce businesses, manufacturers needing distribution, retailers'
    }
  };

  const details = serviceDetails[params.slug] || serviceDetails['flatbed'];

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

