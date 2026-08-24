import React, { useState } from 'react';
import { Save, Building, Phone, Clock } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export const AdminSettingsView: React.FC = () => {
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('aura_admin_settings');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return {
      clinicName: 'AMNA SKIN & HAIR CLINIC',
      logoText: 'Amna',
      phone: '02365252',
      whatsApp: '52515662',
      email: 'info@auraskinclinic.com',
      address: 'Shop # G-34 city center near khyber city mall panjpir swabi',
      hours: 'Monday – Saturday: 9:00 AM – 7:00 PM (Sunday Closed)',
      facebookUrl: 'https://facebook.com/auraskinclinic',
      instagramUrl: 'https://instagram.com/auraskinclinic',
    };
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('aura_admin_settings', JSON.stringify(settings));
    window.dispatchEvent(new Event('clinic_settings_updated'));
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h2 className="font-serif font-bold text-xl text-[#0B2521]">Clinic Settings & Branding</h2>
        <p className="text-xs text-gray-500 font-medium">Configure global clinic contact details, location address, and map</p>
      </div>

      {savedSuccess && (
        <div className="p-3.5 bg-emerald-50 text-emerald-700 text-xs rounded-xl border border-emerald-200 font-bold">
          ✓ Clinic settings & Google Maps location updated successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl border border-[#E2E8E6] shadow-sm space-y-5 text-xs">
        <div className="space-y-4">
          <h3 className="font-serif font-bold text-base text-[#0B2521] border-b border-gray-100 pb-2 flex items-center gap-2">
            <Building className="w-4 h-4 text-[#C89B7B]" /> General Branding
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-semibold text-gray-700">Clinic Name</label>
              <input
                type="text"
                value={settings.clinicName}
                onChange={(e) => setSettings({ ...settings, clinicName: e.target.value })}
                className="w-full p-2.5 bg-[#F4F6F5] border border-gray-200 rounded-xl"
              />
            </div>
            <div className="space-y-1">
              <label className="font-semibold text-gray-700">Logo Text</label>
              <input
                type="text"
                value={settings.logoText}
                onChange={(e) => setSettings({ ...settings, logoText: e.target.value })}
                className="w-full p-2.5 bg-[#F4F6F5] border border-gray-200 rounded-xl"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4 pt-2">
          <h3 className="font-serif font-bold text-base text-[#0B2521] border-b border-gray-100 pb-2 flex items-center gap-2">
            <Phone className="w-4 h-4 text-[#C89B7B]" /> Contact Lines & Email
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-semibold text-gray-700">Main Reception Phone</label>
              <input
                type="text"
                value={settings.phone}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                className="w-full p-2.5 bg-[#F4F6F5] border border-gray-200 rounded-xl"
              />
            </div>
            <div className="space-y-1">
              <label className="font-semibold text-gray-700">WhatsApp Hotline</label>
              <input
                type="text"
                value={settings.whatsApp}
                onChange={(e) => setSettings({ ...settings, whatsApp: e.target.value })}
                className="w-full p-2.5 bg-[#F4F6F5] border border-gray-200 rounded-xl"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-gray-700">Clinic Email Address</label>
            <input
              type="email"
              value={settings.email}
              onChange={(e) => setSettings({ ...settings, email: e.target.value })}
              className="w-full p-2.5 bg-[#F4F6F5] border border-gray-200 rounded-xl"
            />
          </div>
        </div>

        <div className="space-y-4 pt-2">
          <h3 className="font-serif font-bold text-base text-[#0B2521] border-b border-gray-100 pb-2 flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#C89B7B]" /> Location Address & Google Maps Location
          </h3>

          <div className="space-y-3">
            <div className="space-y-1">
              <label className="font-semibold text-gray-700">Physical Clinic Address (Updates Live Google Map) *</label>
              <input
                type="text"
                value={settings.address}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                placeholder="e.g. Shop # G-34 city center near khyber city mall panjpir swabi"
                className="w-full p-2.5 bg-[#F4F6F5] border border-gray-200 rounded-xl font-medium"
              />
              <p className="text-[10px] text-gray-500">
                💡 Enter your real clinic address here. The Google Map will automatically display your exact location!
              </p>
            </div>
            <div className="space-y-1">
              <label className="font-semibold text-gray-700">Operating Hours</label>
              <input
                type="text"
                value={settings.hours}
                onChange={(e) => setSettings({ ...settings, hours: e.target.value })}
                className="w-full p-2.5 bg-[#F4F6F5] border border-gray-200 rounded-xl"
              />
            </div>
          </div>
        </div>

        <div className="pt-4">
          <Button variant="gold" type="submit">
            <Save className="w-4 h-4" /> Save Clinic Location & Settings
          </Button>
        </div>
      </form>
    </div>
  );
};
