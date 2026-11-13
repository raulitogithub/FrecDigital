import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import WhyUsSection from '@/components/WhyUsSection';
import StatsSection from '@/components/StatsSection';
import ProcessSection from '@/components/ProcessSection';
import FAQSection from '@/components/FAQSection';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import { homeJsonLd } from '@/lib/seo-metadata';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <JsonLd data={homeJsonLd()} />
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <ServicesSection />
        <WhyUsSection />
        <StatsSection />
        <ProcessSection />
        <FAQSection />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
