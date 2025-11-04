'use client';

import { useState } from 'react';
import Navbar from '../../components/ui/Navbar';
import Footer from '../../components/ui/Footer';
import PageHeader from '../../components/ui/PageHeader';
import Container from '../../components/ui/Container';
import Section from '../../components/ui/Section';
import Card from '../../components/ui/Card';
import { FAQ_CATEGORIES } from '../../utils/constants';

export default function FAQContent() {
  const [openCategory, setOpenCategory] = useState(null);
  const [openQuestion, setOpenQuestion] = useState(null);

  const toggleCategory = (category) => {
    setOpenCategory(openCategory === category ? null : category);
  };

  const toggleQuestion = (category, index) => {
    const key = `${category}-${index}`;
    setOpenQuestion(openQuestion === key ? null : key);
  };

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
            title="Frequently Asked Questions"
            subtitle="Find answers to common questions about our services and requirements"
          />
        </Container>
      </Section>

      {/* FAQ Content */}
      <Section background="dark">
        <Container>
          <div className="max-w-4xl mx-auto space-y-6">
            {Object.entries(FAQ_CATEGORIES).map(([key, category]) => (
              <Card key={key} className="bg-black/40 border border-white/10 overflow-hidden">
                <button
                  onClick={() => toggleCategory(key)}
                  className="w-full p-6 text-left flex items-center justify-between"
                >
                  <h2 className="text-2xl font-bold text-white">{category.title}</h2>
                  <svg
                    className={`w-6 h-6 text-white transition-transform ${
                      openCategory === key ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {openCategory === key && (
                  <div className="px-6 pb-6 space-y-4">
                    {category.questions.map((item, index) => {
                      const questionKey = `${key}-${index}`;
                      return (
                        <div key={index} className="border-t border-white/10 pt-4">
                          <button
                            onClick={() => toggleQuestion(key, index)}
                            className="w-full text-left flex items-start justify-between"
                          >
                            <h3 className="text-lg font-semibold text-white pr-4">{item.q}</h3>
                            <svg
                              className={`w-5 h-5 text-red-400 flex-shrink-0 transition-transform ${
                                openQuestion === questionKey ? 'rotate-180' : ''
                              }`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>
                          {openQuestion === questionKey && (
                            <p className="text-gray-300 mt-3 leading-relaxed">{item.a}</p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Contact CTA */}
      <Section background="dark">
        <Container>
          <div className="text-center bg-gradient-to-r from-red-900/20 to-red-800/20 rounded-lg p-12 border border-red-600/30">
            <h2 className="text-3xl font-bold text-white mb-4">Still Have Questions?</h2>
            <p className="text-gray-300 mb-8 text-lg">
              Our team is here to help. Contact us for more information.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/contact"
                className="btn-primary text-white px-8 py-3 rounded-lg font-semibold inline-block"
              >
                Contact Us
              </a>
              <a 
                href="/quote"
                className="border border-white text-white hover:bg-white hover:text-black px-8 py-3 rounded-lg font-semibold inline-block transition-all"
              >
                Get a Quote
              </a>
            </div>
          </div>
        </Container>
      </Section>

      <Footer />
    </div>
  );
}

