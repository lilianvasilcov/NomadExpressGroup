import { metadata } from './metadata';
import Navbar from '../../components/ui/Navbar';
import Footer from '../../components/ui/Footer';
import PageHeader from '../../components/ui/PageHeader';
import Container from '../../components/ui/Container';
import Section from '../../components/ui/Section';
import Card from '../../components/ui/Card';
import Image from 'next/image';
import { COMPANY_INFO } from '../../utils/constants';

export { metadata };

export default function AboutPage() {
  const values = [
    {
      title: 'Safety First',
      description: 'Our commitment to safety is unwavering. We maintain strict compliance with DOT regulations and invest heavily in driver training and equipment maintenance.',
      icon: '🛡️'
    },
    {
      title: 'Reliability',
      description: 'We understand that your business depends on timely delivery. Our track record speaks for itself - 99% on-time delivery rate.',
      icon: '⏱️'
    },
    {
      title: 'Transparency',
      description: 'Clear communication, honest pricing, and transparent processes. No hidden fees, no surprises.',
      icon: '👁️'
    },
    {
      title: 'Customer Service',
      description: 'Your success is our success. We go above and beyond to ensure your freight arrives safely and on time.',
      icon: '🤝'
    }
  ];

  const milestones = [
    { year: '2014', event: 'Company Founded' },
    { year: '2016', event: 'Reached 50 Truck Fleet' },
    { year: '2018', event: 'Expanded to 48 States' },
    { year: '2020', event: '1000+ Satisfied Clients' },
    { year: '2022', event: '150+ Truck Fleet' },
    { year: '2024', event: 'Industry Recognition' }
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
            title="About Nomad Express Group"
            subtitle="Your trusted partner in freight transportation for over a decade"
          />
        </Container>
      </Section>

      {/* Company Story */}
      <Section background="dark">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
                <p>
                  Founded in {COMPANY_INFO.established}, Nomad Express Group began with a simple mission: 
                  to provide reliable, professional freight transportation services while building lasting 
                  relationships with both drivers and customers.
                </p>
                <p>
                  What started as a small operation has grown into a trusted name in the trucking industry, 
                  with a fleet of over 150 trucks serving clients across all 48 contiguous states. Our 
                  success is built on the foundation of safety, reliability, and exceptional customer service.
                </p>
                <p>
                  Today, we're recognized as one of the top for-hire carriers in the industry, with a 
                  team of professionals who bring decades of transportation experience to every shipment.
                </p>
              </div>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden">
              <Image 
                src="/truck0.jpg" 
                alt="Nomad Express Group Fleet" 
                fill
                className="object-cover"
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* Values */}
      <Section background="dark">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Our Core Values</h2>
            <p className="text-gray-300 text-lg">The principles that guide everything we do</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="bg-black/40 border border-white/10 p-6">
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                <p className="text-gray-300">{value.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Timeline */}
      <Section background="dark">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Our Journey</h2>
            <p className="text-gray-300 text-lg">Milestones in our growth and success</p>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-red-600 to-red-900 hidden md:block"></div>
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div 
                  key={index}
                  className={`flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  <div className="w-full md:w-1/2 p-6">
                    <Card className="bg-black/40 border border-white/10">
                      <div className="text-red-500 font-bold text-2xl mb-2">{milestone.year}</div>
                      <div className="text-white text-lg">{milestone.event}</div>
                    </Card>
                  </div>
                  <div className="hidden md:block w-1/2"></div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-red-600 rounded-full hidden md:block"></div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section background="dark">
        <Container>
          <div className="text-center bg-gradient-to-r from-red-900/20 to-red-800/20 rounded-lg p-12 border border-red-600/30">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Work With Us?</h2>
            <p className="text-gray-300 mb-8 text-lg">
              Experience the difference that professional service makes
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/quote"
                className="btn-primary text-white px-8 py-3 rounded-lg font-semibold inline-block"
              >
                Get a Quote
              </a>
              <a 
                href="/#team"
                className="border border-white text-white hover:bg-white hover:text-black px-8 py-3 rounded-lg font-semibold inline-block transition-all"
              >
                Meet Our Team
              </a>
            </div>
          </div>
        </Container>
      </Section>

      <Footer />
    </div>
  );
}

