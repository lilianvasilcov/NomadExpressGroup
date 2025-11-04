import { metadata } from './metadata';
import Navbar from '../../components/ui/Navbar';
import Footer from '../../components/ui/Footer';
import Container from '../../components/ui/Container';
import Section from '../../components/ui/Section';

export { metadata };

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      <Section background="dark" className="pt-32 pb-20">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-white mb-4">Terms and Conditions</h1>
            <p className="text-gray-400 mb-8">Last updated: {new Date().toLocaleDateString()}</p>
            
            <div className="prose prose-invert max-w-none space-y-6 text-gray-300">
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Agreement to Terms</h2>
                <p>
                  By accessing or using Nomad Express Group's website and services, you agree to be bound 
                  by these Terms and Conditions. If you disagree with any part of these terms, you may not 
                  access our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Services</h2>
                <p>
                  Nomad Express Group provides freight transportation and logistics services. All services 
                  are subject to availability and are provided in accordance with applicable laws and regulations.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Quotes and Pricing</h2>
                <p>
                  All quotes are estimates and subject to change based on final shipment details, market 
                  conditions, and other factors. Final pricing will be confirmed upon booking.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Payment Terms</h2>
                <p>
                  Payment terms vary by customer and service type. We accept various payment methods including 
                  credit cards, ACH transfers, and net terms for qualified customers. Late payments may 
                  result in additional fees or service suspension.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Liability and Insurance</h2>
                <p>
                  Nomad Express Group maintains appropriate insurance coverage as required by law. Our liability 
                  is limited as specified in our service agreements and applicable regulations. We recommend 
                  customers maintain their own cargo insurance for valuable shipments.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Claims and Disputes</h2>
                <p>
                  Claims for loss or damage must be filed in writing within the timeframes specified in our 
                  service agreements. We will investigate all claims in good faith and in accordance with 
                  applicable regulations.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Limitation of Liability</h2>
                <p>
                  To the maximum extent permitted by law, Nomad Express Group shall not be liable for indirect, 
                  incidental, special, or consequential damages arising from the use of our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Governing Law</h2>
                <p>
                  These Terms and Conditions are governed by the laws of the State of Texas, without regard 
                  to its conflict of law provisions.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Changes to Terms</h2>
                <p>
                  We reserve the right to modify these Terms and Conditions at any time. Changes will be 
                  effective immediately upon posting on our website. Your continued use of our services 
                  constitutes acceptance of any changes.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Contact Information</h2>
                <p>
                  For questions about these Terms and Conditions, please contact us at:
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

