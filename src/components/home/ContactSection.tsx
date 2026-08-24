import React, { useState, useEffect } from 'react';
import { MapPin, Phone, MessageCircle, Mail, Clock, ExternalLink } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [settings, setSettings] = useState({
    clinicName: 'Aura Medical Skin & Hair Clinic',
    phone: '(555) 019-2800',
    whatsApp: '(555) 019-2801',
    email: 'info@auraskinclinic.com',
    address: '400 Medical Park Blvd, Suite 400, New York, NY 10001',
    hours: 'Monday – Saturday: 9:00 AM – 7:00 PM (Sunday Closed)',
  });

  useEffect(() => {
    const saved = localStorage.getItem('aura_admin_settings');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSettings((prev) => ({ ...prev, ...parsed }));
      } catch (e) {}
    }
  }, []);

  const encodedMapAddress = encodeURIComponent(settings.address || 'New York, NY');
  const googleMapEmbedUrl = `https://maps.google.com/maps?q=${encodedMapAddress}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
  const googleMapExternalUrl = `https://www.google.com/maps/search/?api=1&query=${encodedMapAddress}`;

  return (
    <section id="contact" className="py-20 bg-white border-b border-[#E2E8E6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C89B7B]">
            Get In Touch
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B2521]">
            Contact & Location Details
          </h2>
          <p className="text-sm text-gray-600">
            We are here to assist you. Visit our clinic or connect with our medical staff directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Contact Details Cards */}
          <div className="space-y-4">
            <div className="bg-[#FDFBF7] p-6 rounded-2xl border border-[#E2E8E6] flex items-start gap-4 shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-[#F4ECE6] text-[#C89B7B] flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-[#0B2521]">Clinic Address</h3>
                <p className="text-xs text-gray-600 mt-1 whitespace-pre-line">{settings.address}</p>
              </div>
            </div>

            <div className="bg-[#FDFBF7] p-6 rounded-2xl border border-[#E2E8E6] flex items-start gap-4 shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-[#F4ECE6] text-[#C89B7B] flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-[#0B2521]">Direct Phone Line</h3>
                <p className="text-xs text-gray-600 mt-1">Main Desk: {settings.phone}</p>
              </div>
            </div>

            <div className="bg-[#FDFBF7] p-6 rounded-2xl border border-[#E2E8E6] flex items-start gap-4 shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-[#25D366]/10 text-[#25D366] flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-6 h-6 fill-current" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-[#0B2521]">WhatsApp Instant Chat</h3>
                <p className="text-xs text-gray-600 mt-1">WhatsApp Desk: {settings.whatsApp}</p>
              </div>
            </div>

            <div className="bg-[#FDFBF7] p-6 rounded-2xl border border-[#E2E8E6] flex items-start gap-4 shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-[#F4ECE6] text-[#C89B7B] flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-[#0B2521]">Email Communication</h3>
                <p className="text-xs text-gray-600 mt-1">{settings.email}</p>
              </div>
            </div>
          </div>

          {/* Real Embedded Interactive Google Map */}
          <div className="bg-[#0B2521] text-white rounded-3xl overflow-hidden border border-[#E2E8E6] shadow-xl flex flex-col justify-between relative min-h-[420px]">
            {/* Live Interactive Map Iframe */}
            <div className="absolute inset-0 z-0">
              <iframe
                title="Clinic Google Map Location"
                src={googleMapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'contrast(1.05) saturate(1.1)' }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Top Floating Header Overlay */}
            <div className="relative z-10 p-6 bg-gradient-to-b from-[#0B2521]/90 via-[#0B2521]/60 to-transparent backdrop-blur-xs flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#C89B7B]">
                  Interactive Navigation
                </span>
                <h3 className="font-serif font-bold text-xl text-white">{settings.clinicName}</h3>
              </div>

              <a
                href={googleMapExternalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#C89B7B] text-[#0B2521] text-xs font-bold shadow-md hover:bg-white transition-colors cursor-pointer"
              >
                Open Map <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Bottom Floating Hours Overlay */}
            <div className="relative z-10 p-6 bg-gradient-to-t from-[#0B2521]/95 via-[#0B2521]/70 to-transparent">
              <div className="p-4 rounded-2xl bg-[#0B2521]/90 backdrop-blur-md border border-[#C89B7B]/30 space-y-2 text-xs">
                <div className="flex items-center gap-2 text-[#C89B7B] font-bold">
                  <Clock className="w-4 h-4" /> Operating Hours:
                </div>
                <div className="text-white/90">{settings.hours}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
