'use client';

import Navbar from '../../components/ui/Navbar';
import Footer from '../../components/ui/Footer';
import PageHeader from '../../components/ui/PageHeader';
import Container from '../../components/ui/Container';
import Section from '../../components/ui/Section';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

export default function CoverageContent() {
  const regions = [
    {
      name: 'West Coast',
      states: ['CA', 'OR', 'WA', 'NV', 'AZ', 'ID', 'UT', 'MT', 'WY', 'CO', 'NM'],
      description: 'Major ports and metropolitan areas'
    },
    {
      name: 'Midwest',
      states: ['IL', 'IN', 'OH', 'MI', 'WI', 'MN', 'IA', 'MO', 'ND', 'SD', 'NE', 'KS'],
      description: 'Manufacturing and distribution hubs'
    },
    {
      name: 'East Coast',
      states: ['NY', 'NJ', 'PA', 'MA', 'CT', 'RI', 'VT', 'NH', 'ME', 'MD', 'DE', 'VA', 'WV'],
      description: 'Dense population centers and ports'
    },
    {
      name: 'South',
      states: ['TX', 'FL', 'GA', 'NC', 'SC', 'TN', 'AL', 'MS', 'LA', 'AR', 'OK', 'KY'],
      description: 'Growing industrial and logistics centers'
    }
  ];

  const majorLanes = [
    'Los Angeles ↔ Dallas',
    'Chicago ↔ New York',
    'Atlanta ↔ Houston',
    'Denver ↔ Phoenix',
    'Seattle ↔ Portland',
    'Miami ↔ Tampa',
    'Detroit ↔ Cleveland',
    'Kansas City ↔ St. Louis'
  ];

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
            title="Service Coverage"
            subtitle="We operate in all 48 contiguous United States"
          />
          <div className="max-w-3xl mx-auto text-center text-gray-300 text-lg">
            <p>
              With extensive coverage across the continental United States, we can transport your freight 
              to virtually any destination. Our network includes major metropolitan areas, industrial hubs, 
              and distribution centers.
            </p>
          </div>
        </Container>
      </Section>

      {/* Coverage Map Area */}
      <Section background="dark">
        <Container>
          <div className="bg-black/40 border border-white/10 rounded-lg p-8 mb-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">Nationwide Coverage</h2>
              <div className="inline-block bg-red-600/20 border border-red-600/50 rounded-lg px-6 py-3">
                <p className="text-white text-lg font-semibold">
                  All 48 Contiguous States
                </p>
              </div>
            </div>
            
            {/* Simple US Map Representation */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {regions.map((region, index) => (
                <Card key={index} className="bg-black/60 border border-white/10 p-6">
                  <h3 className="text-xl font-bold text-white mb-3">{region.name}</h3>
                  <p className="text-gray-400 text-sm mb-4">{region.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {region.states.map((state) => (
                      <span 
                        key={state}
                        className="text-xs bg-red-600/20 text-red-300 px-2 py-1 rounded"
                      >
                        {state}
                      </span>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Major Lanes */}
      <Section background="dark">
        <Container>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">Major Shipping Lanes</h2>
            <p className="text-gray-300">Frequent routes we service</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {majorLanes.map((lane, index) => (
              <Card key={index} className="bg-black/40 border border-white/10 p-4 text-center">
                <p className="text-white font-semibold">{lane}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Regional Hubs */}
      <Section background="dark">
        <Container>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">Regional Hubs</h2>
            <p className="text-gray-300">Strategic locations for efficient operations</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-black/40 border border-white/10 p-6">
              <h3 className="text-xl font-bold text-white mb-2">Dallas, TX</h3>
              <p className="text-gray-300">Central hub for nationwide distribution</p>
            </Card>
            <Card className="bg-black/40 border border-white/10 p-6">
              <h3 className="text-xl font-bold text-white mb-2">Chicago, IL</h3>
              <p className="text-gray-300">Midwest logistics center</p>
            </Card>
            <Card className="bg-black/40 border border-white/10 p-6">
              <h3 className="text-xl font-bold text-white mb-2">Atlanta, GA</h3>
              <p className="text-gray-300">Southeast regional operations</p>
            </Card>
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section background="dark">
        <Container>
          <div className="text-center bg-gradient-to-r from-red-900/20 to-red-800/20 rounded-lg p-12 border border-red-600/30">
            <h2 className="text-3xl font-bold text-white mb-4">Ship Anywhere in the US</h2>
            <p className="text-gray-300 mb-8 text-lg">
              Get a quote for your shipment, no matter the destination
            </p>
            <Button href="/quote" variant="primary" size="lg">
              Get a Quote
            </Button>
          </div>
        </Container>
      </Section>

      <Footer />
    </div>
  );
}

