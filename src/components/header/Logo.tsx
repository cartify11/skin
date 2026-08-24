import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  isScrolled?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ isScrolled = false }) => {
  const [logoText, setLogoText] = useState('Amna');
  const [subText, setSubText] = useState('AMNA SKIN & HAIR CLINIC');

  useEffect(() => {
    const loadSettings = () => {
      const saved = localStorage.getItem('aura_admin_settings');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed.logoText) setLogoText(parsed.logoText);
          if (parsed.clinicName) setSubText(parsed.clinicName);
        } catch (e) {}
      }
    };

    loadSettings();
    window.addEventListener('storage', loadSettings);
    window.addEventListener('clinic_settings_updated', loadSettings);

    return () => {
      window.removeEventListener('storage', loadSettings);
      window.removeEventListener('clinic_settings_updated', loadSettings);
    };
  }, []);

  return (
    <Link
      to="/"
      className="flex items-center gap-3 cursor-pointer group select-none"
    >
      {/* Circle Icon Badge */}
      <div className="w-10 h-10 rounded-full bg-[#C89B7B] text-[#0B2521] font-serif font-bold text-xl flex items-center justify-center shadow-md border border-white/20 group-hover:scale-105 transition-transform flex-shrink-0">
        {logoText.charAt(0) || 'A'}
      </div>

      <div className="flex flex-col">
        {/* Crisp Pure White Brand Name */}
        <span
          className={`font-serif text-xl font-bold tracking-widest leading-none drop-shadow-sm transition-colors ${
            isScrolled ? 'text-[#0B2521]' : 'text-white'
          }`}
        >
          {logoText.toUpperCase()}
        </span>

        {/* Rose Gold Subtext */}
        <span className="text-[9.5px] font-bold tracking-widest text-[#C89B7B] uppercase mt-1 truncate max-w-[200px]">
          {subText.toUpperCase()}
        </span>
      </div>
    </Link>
  );
};
