import React, { useState } from 'react';
import { Header } from '../header/Header';
import { HeroSection } from '../home/HeroSection';
import { WhyChooseUsSection } from '../home/WhyChooseUsSection';
import { ServicesSection } from '../home/ServicesSection';
import { DoctorsSection } from '../home/DoctorsSection';
import { BeforeAfterSection } from '../home/BeforeAfterSection';
import { TestimonialsSection } from '../home/TestimonialsSection';
import { AppointmentSection } from '../home/AppointmentSection';
import { ContactSection } from '../home/ContactSection';
import { FooterSection } from '../home/FooterSection';
import { PricingModal } from '../home/PricingModal';
import { WhatsAppButton } from '../ui/WhatsAppButton';

export const GlobalLayout: React.FC = () => {
  const [activePath, setActivePath] = useState('home');
  const [selectedService, setSelectedService] = useState('Acne Treatment');
  const [selectedDoctor, setSelectedDoctor] = useState('First Available Specialist');
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);

  const handleNavigate = (path: string) => {
    setActivePath(path);
    const element = document.getElementById(path);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectService = (serviceName: string) => {
    setSelectedService(serviceName);
    handleNavigate('booking');
  };

  const handleSelectDoctor = (doctorName: string) => {
    setSelectedDoctor(doctorName);
    handleNavigate('booking');
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col relative text-[#121816] antialiased">
      <Header
        activePath={activePath}
        onNavigate={handleNavigate}
        onOpenBookingModal={() => handleNavigate('booking')}
      />

      <main className="flex-1">
        <HeroSection onOpenBooking={() => handleNavigate('booking')} />
        <WhyChooseUsSection />
        <ServicesSection
          onSelectService={handleSelectService}
          onOpenPricingModal={() => setIsPricingModalOpen(true)}
        />
        <DoctorsSection onSelectDoctor={handleSelectDoctor} />
        <BeforeAfterSection />
        <TestimonialsSection />
        <AppointmentSection
          selectedService={selectedService}
          selectedDoctor={selectedDoctor}
        />
        <ContactSection />
      </main>

      <FooterSection />
      <WhatsAppButton />

      {/* Pricing & Full Catalog Modal Dialog */}
      <PricingModal
        isOpen={isPricingModalOpen}
        onClose={() => setIsPricingModalOpen(false)}
        onSelectService={handleSelectService}
      />
    </div>
  );
};
