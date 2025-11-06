'use client';

import Navbar from '../../components/ui/Navbar';
import Footer from '../../components/ui/Footer';
import PageHeader from '../../components/ui/PageHeader';
import Container from '../../components/ui/Container';
import Section from '../../components/ui/Section';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Link from 'next/link';

export default function CareersContent() {
  const benefits = [
    {
      title: 'Competitive Pay',
      description: 'Top-tier compensation packages with performance bonuses'
    },
    {
      title: 'Home Time',
      description: 'Flexible schedules that respect your personal life'
    },
    {
      title: '24/7 Support',
      description: 'Round-the-clock dispatch and support team'
    },
    {
      title: 'Safety Bonuses',
      description: 'Additional earnings for safe driving records'
    },
    {
      title: 'Fuel Cards',
      description: 'Company-provided fuel cards for convenience'
    },
    {
      title: 'Modern Equipment',
      description: 'Well-maintained, late-model trucks and trailers'
    }
  ];

  const requirements = [
    'Valid CDL Class A license',
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
          className="absolute inset-0 bg-cover bg-center opacity-60"
          style={{ backgroundImage: 'url(/truck0.jpg)' }}
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

      {/* Main Content with Animated Background */}
      <div className="bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
        {/* Animated Background Gradient - Whole Background - Optimized */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-0 w-96 h-96 bg-red-500 rounded-full blur-3xl animate-pulse will-change-opacity" style={{ animationDuration: '4s' }}></div>
          <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-red-500 rounded-full blur-3xl animate-pulse will-change-opacity" style={{ animationDelay: '2s', animationDuration: '4s' }}></div>
        </div>

        {/* Introduction */}
        <section className="py-24 relative">
          <Container className="relative z-10">
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
        </section>

        {/* Benefits */}
        <section className="py-24 relative">
          <Container className="relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Benefits & Perks</h2>
              <p className="text-gray-300">What we offer our drivers</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => (
                <Card key={index} className="bg-black/40 border border-white/10 p-6 text-center">
                  <div className="w-12 h-12 rounded-lg bg-red-500/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-4">
                    {benefit.title === 'Competitive Pay' && (
                      <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                    {benefit.title === 'Home Time' && (
                      <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                    )}
                    {benefit.title === '24/7 Support' && (
                      <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    )}
                    {benefit.title === 'Safety Bonuses' && (
                      <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    )}
                    {benefit.title === 'Fuel Cards' && (
                      <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    )}
                    {benefit.title === 'Modern Equipment' && (
                      <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                      </svg>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{benefit.title}</h3>
                  <p className="text-gray-300 text-sm">{benefit.description}</p>
                </Card>
              ))}
            </div>
          </Container>
        </section>

        {/* Requirements & Application */}
        <section className="py-24 relative">
          <Container className="relative z-10">
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
        </section>

        {/* Testimonials */}
        <section className="py-24 relative">
          <Container className="relative z-10">
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
        </section>
      </div>

      <Footer />
    </div>
  );
}

