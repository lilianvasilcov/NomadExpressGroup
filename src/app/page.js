import Navbar from '../components/ui/Navbar';
import HeroSection from '../components/sections/HeroSection';
import QuickAboutSection from '../components/sections/QuickAboutSection';
import ServicesSection from '../components/sections/ServicesSection';
import FleetPreviewSection from '../components/sections/FleetPreviewSection';
import StatsSection from '../components/sections/StatsSection';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import CTASection from '../components/sections/CTASection';
import Footer from '../components/ui/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <HeroSection />
      <QuickAboutSection />
      <ServicesSection />
      <FleetPreviewSection />
      <StatsSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  );
}