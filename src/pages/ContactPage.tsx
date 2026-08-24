import React from 'react';
import { Link } from 'react-router-dom';
import { ContactSection } from '../components/home/ContactSection';

export const ContactPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      {/* Hero Banner */}
      <section className="relative py-16 bg-[#0B2521] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C89B7B_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C89B7B]">
            Get In Touch
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white tracking-tight">
            Contact Our Clinic & Location
          </h1>
          <p className="max-w-2xl mx-auto text-xs sm:text-sm text-gray-300 font-light">
            We are here to answer your treatment questions, assist with appointments, and welcome you to our modern clinic.
          </p>
          <div className="flex items-center justify-center gap-2 text-xs text-gray-400 pt-1">
            <Link to="/" className="hover:text-[#C89B7B]">Home</Link>
            <span>/</span>
            <span className="text-[#C89B7B] font-semibold">Contact Us</span>
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <div className="py-8">
        <ContactSection />
      </div>
    </div>
  );
};
