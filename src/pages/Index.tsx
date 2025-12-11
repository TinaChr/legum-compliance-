import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { ValueProposition } from "@/components/ValueProposition";
import { ServicesSection } from "@/components/ServicesSection";
import { WhyLegum } from "@/components/WhyLegum";
import { StatsSection } from "@/components/StatsSection";
import { PackagesSection } from "@/components/PackagesSection";
import { FAQSection } from "@/components/FAQSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <ValueProposition />
      <ServicesSection />
      <WhyLegum />
      <StatsSection />
      <PackagesSection />
      <FAQSection />
      <ContactSection />
      <Footer />
    </main>
  );
};

export default Index;
