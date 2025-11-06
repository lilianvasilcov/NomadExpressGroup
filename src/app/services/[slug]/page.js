import { metadata } from './metadata';
import ServiceDetailContent from './ServiceDetailContent';
import { SERVICE_TYPES } from '../../../utils/constants';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = SERVICE_TYPES.find(s => s.slug === slug);
  if (!service) return { title: 'Service Not Found' };
  
  return {
    title: service.title,
    description: service.description,
  };
}

export default async function ServiceDetailPage({ params }) {
  const { slug } = await params;
  const service = SERVICE_TYPES.find(s => s.slug === slug);
  
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
    'heavy-haul': {
      description: 'Specialized heavy haul transportation for oversized, overweight, and complex freight that requires specialized equipment and expertise. We handle the most challenging loads with precision and care.',
      benefits: [
        'Expert handling of oversized loads',
        'Permit acquisition and routing assistance',
        'Specialized equipment and trailers',
        'Experienced heavy haul drivers',
        'Comprehensive insurance coverage'
      ],
      equipment: 'Specialized heavy haul trailers, lowboys, extendable flatbeds, and multi-axle configurations',
      who: 'Construction companies, manufacturers, mining operations, energy sector, infrastructure projects'
    }
  };

  const details = serviceDetails[slug] || serviceDetails['flatbed'];

  return <ServiceDetailContent service={service} details={details} />;
}
