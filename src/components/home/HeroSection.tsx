import React, { useState, useEffect } from 'react';
import { Calendar, MessageCircle, Star, ShieldCheck } from 'lucide-react';
import { Button } from '../ui/Button';

interface HeroSectionProps {
  onOpenBooking: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenBooking }) => {
  const [whatsAppNum, setWhatsAppNum] = useState('15550192801');

  useEffect(() => {
    const loadSettings = () => {
      const saved = localStorage.getItem('aura_admin_settings');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed.whatsApp) {
            const clean = parsed.whatsApp.replace(/[^0-9]/g, '');
            if (clean) setWhatsAppNum(clean);
          }
        } catch (e) {}
      }
    };
    loadSettings();
    window.addEventListener('clinic_settings_updated', loadSettings);
    return () => window.removeEventListener('clinic_settings_updated', loadSettings);
  }, []);

  const handleWhatsApp = () => {
    const message = encodeURIComponent('Hello! I would like to inquire about a skin consultation.');
    window.open(`https://wa.me/${whatsAppNum}?text=${message}`, '_blank');
  };

  return (
    <section
      id="home"
      className="relative min-h-[92vh] -mt-[80px] pt-[140px] pb-20 flex items-center bg-cover bg-center bg-no-repeat text-white overflow-hidden"
      style={{ backgroundImage: `url('/images/hero_clinic.jpg')` }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#0B2521]/95 via-[#0B2521]/80 to-[#0B2521]/45" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="max-w-2xl space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F4ECE6]/20 backdrop-blur-md border border-[#C89B7B]/50 text-[#C89B7B] text-xs font-bold uppercase tracking-widest shadow-lg">
            <ShieldCheck className="w-4 h-4 text-[#C89B7B]" /> US-FDA Approved Clinical Care
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-white leading-[1.15] drop-shadow-md">
            Healthy Skin Starts Here
          </h1>

          <p className="text-lg sm:text-xl text-white/90 font-light leading-relaxed">
            Expert Dermatologists for Beautiful & Healthy Skin. Tailored acne, hair restoration, anti-aging, and skin rejuvenation treatments.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <Button variant="gold" size="lg" onClick={onOpenBooking}>
              <Calendar className="w-5 h-5" /> Book Appointment
            </Button>

            <button
              onClick={handleWhatsApp}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#25D366] text-white font-semibold text-base hover:bg-[#20ba59] hover:scale-105 active:scale-95 transition-all shadow-xl cursor-pointer"
            >
              <MessageCircle className="w-5 h-5 fill-current" /> WhatsApp Us
            </button>
          </div>

          <div className="pt-6 flex items-center gap-4 border-t border-white/15">
            <div className="flex text-[#D4AF37] space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current drop-shadow-sm" />
              ))}
            </div>
            <div className="text-sm font-medium">
              <strong className="text-white font-bold text-base">5,000+</strong>{' '}
              <span className="text-white/80">Happy Patients</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
