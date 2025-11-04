'use client';

import Navbar from '../../components/ui/Navbar';
import Footer from '../../components/ui/Footer';
import Container from '../../components/ui/Container';
import Section from '../../components/ui/Section';

export default function PrivacyContent() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      <Section background="dark" className="pt-32 pb-20">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-white mb-4">Privacy Policy</h1>
            <p className="text-gray-400 mb-8">Last updated: {new Date().toLocaleDateString()}</p>
            
            <div className="prose prose-invert max-w-none space-y-6 text-gray-300">
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Introduction</h2>
                <p>
                  Nomad Express Group ("we," "our," or "us") is committed to protecting your privacy. 
                  This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
                  when you visit our website and use our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Information We Collect</h2>
                <p>We may collect information about you in a variety of ways:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Personal information you provide (name, email, phone, address)</li>
                  <li>Business information (company name, shipping details)</li>
                  <li>Usage data (how you interact with our website)</li>
                  <li>Device information (IP address, browser type, operating system)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">How We Use Your Information</h2>
                <p>We use the information we collect to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide, operate, and maintain our services</li>
                  <li>Process and fulfill your shipping requests</li>
                  <li>Send you quotes and service information</li>
                  <li>Improve our website and services</li>
                  <li>Communicate with you about your account or services</li>
                  <li>Send you marketing communications (with your consent)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Information Sharing</h2>
                <p>
                  We do not sell, trade, or rent your personal information to third parties. We may share 
                  your information in the following circumstances:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>With service providers who assist us in operating our business</li>
                  <li>When required by law or to protect our rights</li>
                  <li>In connection with a business transfer or merger</li>
                  <li>With your consent</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Data Security</h2>
                <p>
                  We implement appropriate technical and organizational security measures to protect your 
                  personal information. However, no method of transmission over the Internet is 100% secure.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Your Rights</h2>
                <p>You have the right to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Access your personal information</li>
                  <li>Correct inaccurate information</li>
                  <li>Request deletion of your information</li>
                  <li>Opt-out of marketing communications</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
                <p>
                  If you have questions about this Privacy Policy, please contact us at:
                </p>
                <p className="mt-2">
                  Email: info@nomadexpress.com<br />
                  Phone: (555) 123-4567
                </p>
              </section>
            </div>
          </div>
        </Container>
      </Section>

      <Footer />
    </div>
  );
}

