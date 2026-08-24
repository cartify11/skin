import React, { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';

export const WhatsAppButton: React.FC = () => {
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

  const handleClick = () => {
    const message = encodeURIComponent('Hello! I would like to book a skin consultation.');
    window.open(`https://wa.me/${whatsAppNum}?text=${message}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 group flex items-center gap-3">
      <div className="hidden sm:block opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#0B2521] text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg border border-[#C89B7B]/30 whitespace-nowrap">
        Chat with Medical Desk
      </div>

      <button
        onClick={handleClick}
        aria-label="Contact us on WhatsApp"
        className="relative w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
        <MessageCircle className="w-7 h-7 fill-current relative z-10" />
      </button>
    </div>
  );
};
