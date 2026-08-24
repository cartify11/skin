import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Calendar, ShieldCheck, Clock, CheckCircle2, Phone, Sparkles } from 'lucide-react';
import { AppointmentSection } from '../components/home/AppointmentSection';

export const AppointmentPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [selectedService, setSelectedService] = useState('Acne Treatment');
  const [selectedDoctor, setSelectedDoctor] = useState('First Available Specialist');

  useEffect(() => {
    const s = searchParams.get('service');
    const d = searchParams.get('doctor');
    if (s) setSelectedService(s);
    if (d) setSelectedDoctor(d);
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      {/* Hero Banner */}
      <section className="relative py-16 bg-[#0B2521] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C89B7B_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C89B7B]">
            Instant Online Schedule
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white tracking-tight">
            Book Your Clinical Appointment
          </h1>
          <p className="max-w-2xl mx-auto text-xs sm:text-sm text-gray-300 font-light">
            Choose your preferred treatment, specialist doctor, date, and time slot. Our clinic reception will confirm your booking instantly.
          </p>
          <div className="flex items-center justify-center gap-2 text-xs text-gray-400 pt-1">
            <Link to="/" className="hover:text-[#C89B7B]">Home</Link>
            <span>/</span>
            <span className="text-[#C89B7B] font-semibold">Appointment Booking</span>
          </div>
        </div>
      </section>

      {/* Appointment Form Section */}
      <div className="py-8">
        <AppointmentSection
          selectedService={selectedService}
          selectedDoctor={selectedDoctor}
        />
      </div>
    </div>
  );
};
