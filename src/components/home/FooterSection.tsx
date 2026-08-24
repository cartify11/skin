import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export const FooterSection: React.FC = () => {
  const [settings, setSettings] = useState({
    clinicName: 'Aura Medical Skin & Hair Clinic',
    logoText: 'AURA',
    phone: '(555) 019-2800',
    whatsApp: '(555) 019-2801',
    email: 'info@auraskinclinic.com',
    address: '400 Medical Park Blvd, Suite 400, New York, NY 10001',
    hours: 'Monday – Saturday: 9:00 AM – 7:00 PM (Sunday Closed)',
  });

  useEffect(() => {
    const loadSettings = () => {
      const saved = localStorage.getItem('aura_admin_settings');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setSettings((prev) => ({ ...prev, ...parsed }));
        } catch (e) {}
      }
    };
    loadSettings();
    window.addEventListener('clinic_settings_updated', loadSettings);
    return () => window.removeEventListener('clinic_settings_updated', loadSettings);
  }, []);

  return (
    <footer className="bg-[#0B2521] text-white/80 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-10 pb-12">
        <div className="space-y-4">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-[#C89B7B] text-[#0B2521] font-serif font-bold text-xl flex items-center justify-center group-hover:scale-105 transition-transform">
              {settings.logoText.charAt(0) || 'A'}
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl font-bold tracking-widest text-white">
                {settings.logoText.toUpperCase()}
              </span>
              <span className="text-[9px] font-bold tracking-widest text-[#C89B7B] uppercase truncate max-w-[180px]">
                {settings.clinicName.toUpperCase()}
              </span>
            </div>
          </Link>
          <p className="text-xs text-white/70 leading-relaxed">
            Advanced aesthetic science, medical dermatology, and laser hair restoration led by board-certified specialist physicians.
          </p>
        </div>

        <div className="space-y-3 text-xs">
          <h4 className="font-serif font-bold text-sm text-white uppercase tracking-wider">Navigation</h4>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-[#C89B7B] transition-colors">Home</Link></li>
            <li><Link to="/about" className="hover:text-[#C89B7B] transition-colors">About Us</Link></li>
            <li><Link to="/services" className="hover:text-[#C89B7B] transition-colors">Treatments</Link></li>
            <li><Link to="/doctors" className="hover:text-[#C89B7B] transition-colors">Specialist Doctors</Link></li>
            <li><Link to="/gallery" className="hover:text-[#C89B7B] transition-colors">Before & After Gallery</Link></li>
            <li><Link to="/appointment" className="hover:text-[#C89B7B] transition-colors">Book Appointment</Link></li>
            <li><Link to="/contact" className="hover:text-[#C89B7B] transition-colors">Contact Us</Link></li>
          </ul>
        </div>

        <div className="space-y-3 text-xs">
          <h4 className="font-serif font-bold text-sm text-white uppercase tracking-wider">Treatments</h4>
          <ul className="space-y-2">
            <li><Link to="/services?category=laser" className="hover:text-[#C89B7B] transition-colors">Acne & Scar Removal</Link></li>
            <li><Link to="/services?category=laser" className="hover:text-[#C89B7B] transition-colors">Laser Hair Removal</Link></li>
            <li><Link to="/services?category=skin" className="hover:text-[#C89B7B] transition-colors">Hydra Facial Glow</Link></li>
            <li><Link to="/services?category=hair" className="hover:text-[#C89B7B] transition-colors">PRP Hair Therapy</Link></li>
            <li><Link to="/services?category=anti-aging" className="hover:text-[#C89B7B] transition-colors">Botox & Dermal Fillers</Link></li>
          </ul>
        </div>

        <div className="space-y-3 text-xs">
          <h4 className="font-serif font-bold text-sm text-white uppercase tracking-wider">Clinic Desk</h4>
          <p className="whitespace-pre-line">{settings.address}</p>
          <p>Phone: {settings.phone}</p>
          <p>WhatsApp: {settings.whatsApp}</p>
          <p>Email: {settings.email}</p>
          <p className="text-[#C89B7B] font-semibold mt-2">{settings.hours}</p>
        </div>
      </div>

      <div className="border-t border-white/10 bg-[#071815] py-4 text-[11px] text-white/50 text-center">
        <div className="max-w-7xl mx-auto px-4">
          <strong>Medical Disclaimer:</strong> Information on this website is for educational purposes and does not constitute formal medical diagnosis. Individual treatment results vary.
        </div>
      </div>

      <div className="border-t border-white/5 py-4 text-xs text-white/60">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>&copy; 2026 {settings.clinicName}. All Rights Reserved.</div>
          <div className="space-x-4 text-[11px]">
            <Link to="/about" className="hover:underline">About Clinic</Link>
            <Link to="/contact" className="hover:underline">Location & Care</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
