import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HeroSection } from '../components/home/HeroSection';
import { WhyChooseUsSection } from '../components/home/WhyChooseUsSection';
import { ServicesSection } from '../components/home/ServicesSection';
import { DoctorsSection } from '../components/home/DoctorsSection';
import { BeforeAfterSection } from '../components/home/BeforeAfterSection';
import { TestimonialsSection } from '../components/home/TestimonialsSection';
import { ContactSection } from '../components/home/ContactSection';
import { PricingModal } from '../components/home/PricingModal';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);

  const handleSelectService = (serviceName: string) => {
    navigate(`/appointment?service=${encodeURIComponent(serviceName)}`);
  };

  const handleSelectDoctor = (doctorName: string) => {
    navigate(`/appointment?doctor=${encodeURIComponent(doctorName)}`);
  };

  return (
    <div className="space-y-0">
      <HeroSection onOpenBooking={() => navigate('/appointment')} />
      <WhyChooseUsSection />
      <ServicesSection
        onSelectService={handleSelectService}
        onOpenPricingModal={() => setIsPricingModalOpen(true)}
      />
      <DoctorsSection onSelectDoctor={handleSelectDoctor} />
      <BeforeAfterSection />
      <TestimonialsSection />
      <ContactSection />

      <PricingModal
        isOpen={isPricingModalOpen}
        onClose={() => setIsPricingModalOpen(false)}
        onSelectService={handleSelectService}
      />
    </div>
  );
};
