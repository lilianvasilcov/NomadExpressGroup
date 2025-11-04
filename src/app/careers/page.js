import { metadata } from './metadata';
import Navbar from '../../components/ui/Navbar';
import Footer from '../../components/ui/Footer';
import PageHeader from '../../components/ui/PageHeader';
import Container from '../../components/ui/Container';
import Section from '../../components/ui/Section';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Link from 'next/link';

export { metadata };

export default function CareersPage() {
  const benefits = [
    {
      title: 'Competitive Pay',
      description: 'Top-tier compensation packages with performance bonuses',
      icon: '💰'
    },
    {
      title: 'Home Time',
      description: 'Flexible schedules that respect your personal life',
      icon: '🏠'
    },
    {
      title: '24/7 Support',
      description: 'Round-the-clock dispatch and support team',
      icon: '📞'
    },
    {
      title: 'Safety Bonuses',
      description: 'Additional earnings for safe driving records',
      icon: '⭐'
    },
    {
      title: 'Fuel Cards',
      description: 'Company-provided fuel cards for convenience',
      icon: '⛽'
    },
    {
      title: 'Modern Equipment',
      description: 'Well-maintained, late-model trucks and trailers',
      icon: '🚛'
    },
    {
      title: 'Health Insurance',
      description: 'Comprehensive health and dental coverage',
      icon: '🏥'
    },
    {
      title: '401(k) Plan',
      description: 'Retirement savings with company match',
      icon: '💼'
    }
  ];

  const requirements = [
    'Valid CDL Class A license',
    'Minimum 2 years of experience',
    'Clean driving record',
    'Pass background check',
    'Pass drug screening',
    'DOT physical certification'
  ];

  const testimonials = [
    {
      quote: 'Best company I\'ve driven for. The pay is great, equipment is excellent, and they actually care about their drivers.',
      author: 'Mike Johnson',
      role: 'O/O Driver, 5 years'
    },
    {
      quote: 'The dispatch team is always helpful and understanding. They work with you, not against you.',
      author: 'Sarah Williams',
      role: 'Company Driver, 3 years'
    },
    {
      quote: 'I finally found a company that respects home time. My family appreciates it as much as I do.',
      author: 'Robert Martinez',
      role: 'Regional Driver, 4 years'
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      {/* Hero Section */}
      <Section background="dark" className="pt-32 pb-20">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: 'url(/driver-bg.jpg)' }}
        ></div>
        <div className="absolute inset-0 bg-black/70"></div>
        <Container className="relative z-10">
          <PageHeader 
            title="Join Our Team"
            subtitle="Professional drivers wanted - Competitive pay, excellent equipment, and supportive team"
          />
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button href="/apply" variant="primary" size="lg">
              Apply Now
            </Button>
            <Button href="/contact" variant="secondary" size="lg">
              Contact Recruiting
            </Button>
          </div>
        </Container>
      </Section>

      {/* Introduction */}
      <Section background="dark">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Why Drive With Nomad Express Group?</h2>
            <div className="text-gray-300 text-lg leading-relaxed space-y-4">
              <p>
                Join our team of professional drivers and experience the difference. We've built a reputation 
                as one of the top for-hire carriers in the industry, and that success comes from treating our 
                drivers like the professionals they are.
              </p>
              <p>
                Today, we have grown to a fleet of over 150 trucks, and have been recognized by multiple sources 
                as one of the top companies in the industry. We have worked to build a company of professionals 
                with decades of experience in transportation, and the most satisfied fleet of professional drivers 
                in the business.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Benefits */}
      <Section background="dark">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Benefits & Perks</h2>
            <p className="text-gray-300">What we offer our drivers</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="bg-black/40 border border-white/10 p-6 text-center">
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{benefit.title}</h3>
                <p className="text-gray-300 text-sm">{benefit.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Requirements & Application */}
      <Section background="dark">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Requirements</h2>
              <div className="bg-black/40 border border-white/10 rounded-lg p-6">
                <ul className="space-y-4">
                  {requirements.map((req, index) => (
                    <li key={index} className="flex items-start text-gray-300">
                      <span className="text-red-500 mr-3 mt-1">✓</span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Ready to Apply?</h2>
              <div className="bg-black/40 border border-white/10 rounded-lg p-6">
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Take the first step towards joining our team. Our application process is straightforward, 
                  and our recruiting team is here to help every step of the way.
                </p>
                <div className="space-y-4">
                  <Button href="/apply" variant="primary" size="lg" className="w-full">
                    Start Application
                  </Button>
                  <div className="text-center text-gray-400 text-sm">
                    Or call us at <a href="tel:5559876543" className="text-red-400 hover:text-red-300">(555) 987-6543</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Testimonials */}
      <Section background="dark">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">What Our Drivers Say</h2>
            <p className="text-gray-300">Hear from current drivers</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-black/40 border border-white/10 p-6">
                <p className="text-gray-300 mb-4 italic">&ldquo;{testimonial.quote}&rdquo;</p>
                <div className="border-t border-white/10 pt-4">
                  <p className="text-white font-semibold">{testimonial.author}</p>
                  <p className="text-gray-400 text-sm">{testimonial.role}</p>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Footer />
    </div>
  );
}

