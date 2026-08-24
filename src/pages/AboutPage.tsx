import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, Award, Microscope, HeartHandshake, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import { WhyChooseUsSection } from '../components/home/WhyChooseUsSection';
import { Button } from '../components/ui/Button';

export const AboutPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      {/* Hero Banner */}
      <section className="relative py-20 bg-[#0B2521] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C89B7B_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C89B7B]">
            Medical Excellence & Aesthetic Precision
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-white tracking-tight">
            About Our Medical Clinic
          </h1>
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-gray-300 font-light">
            Founded on the principles of evidence-based dermatology, patient safety, and transformative aesthetic enhancement.
          </p>
          <div className="flex items-center justify-center gap-2 text-xs text-gray-400 pt-2">
            <Link to="/" className="hover:text-[#C89B7B]">Home</Link>
            <span>/</span>
            <span className="text-[#C89B7B] font-semibold">About Us</span>
          </div>
        </div>
      </section>

      {/* Story & Philosophy Section */}
      <section className="py-20 bg-white border-b border-[#E2E8E6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C89B7B]">
              Our Clinical Heritage
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B2521] leading-tight">
              Where Medical Science Meets Luxury Aesthetic Care
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed font-light">
              At our clinic, we believe that radiant skin and healthy hair are the foundations of enduring confidence. Our medical practice combines university hospital-grade dermatology with state-of-the-art non-invasive aesthetic equipment.
            </p>
            <p className="text-sm text-gray-600 leading-relaxed font-light">
              Every patient journey begins with a comprehensive 3D skin & follicle diagnostic session, ensuring your treatment plan is tailored to your unique anatomical profile.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-2xl bg-[#FDFBF7] border border-[#E2E8E6]">
                <div className="font-serif text-2xl font-bold text-[#0B2521]">14,000+</div>
                <div className="text-xs text-gray-500 font-medium">Successful Procedures</div>
              </div>
              <div className="p-4 rounded-2xl bg-[#FDFBF7] border border-[#E2E8E6]">
                <div className="font-serif text-2xl font-bold text-[#0B2521]">99.4%</div>
                <div className="text-xs text-gray-500 font-medium">Patient Satisfaction</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src="/images/hero_clinic.jpg"
                alt="Clinic Interior & Treatment Suite"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-[#0B2521] text-white p-6 rounded-2xl shadow-xl max-w-xs hidden sm:block border border-[#C89B7B]/30">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-8 h-8 text-[#C89B7B]" />
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#C89B7B]">Safety Certified</div>
                  <div className="text-xs text-gray-300">100% US-FDA Approved Laser & Dermal Suites</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Standard Section */}
      <WhyChooseUsSection />

      {/* Clinical Standards Grid */}
      <section className="py-20 bg-white border-b border-[#E2E8E6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C89B7B]">
              Rigorous Standards
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B2521]">
              Our 4 Pillars of Medical Practice
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 rounded-2xl bg-[#FDFBF7] border border-[#E2E8E6] space-y-3">
              <Microscope className="w-8 h-8 text-[#C89B7B]" />
              <h3 className="font-serif font-bold text-lg text-[#0B2521]">3D Diagnostic Scans</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Multi-spectral analysis measuring melanin depth, pore density, and skin elasticity before any treatment.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FDFBF7] border border-[#E2E8E6] space-y-3">
              <Award className="w-8 h-8 text-[#C89B7B]" />
              <h3 className="font-serif font-bold text-lg text-[#0B2521]">Board Certified MDs</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                All procedures performed exclusively by licensed physicians with specialized postgraduate dermatology degrees.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FDFBF7] border border-[#E2E8E6] space-y-3">
              <ShieldCheck className="w-8 h-8 text-[#C89B7B]" />
              <h3 className="font-serif font-bold text-lg text-[#0B2521]">Zero Downtime Protocols</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Modern fractional lasers and gentle peels designed to let you return to your daily schedule immediately.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FDFBF7] border border-[#E2E8E6] space-y-3">
              <HeartHandshake className="w-8 h-8 text-[#C89B7B]" />
              <h3 className="font-serif font-bold text-lg text-[#0B2521]">Transparent Pricing</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Fixed, upfront package rates with complete breakdown of consumables and follow-up reviews.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-16 bg-[#0B2521] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <Sparkles className="w-10 h-10 text-[#C89B7B] mx-auto" />
          <h2 className="font-serif text-3xl sm:text-4xl font-bold">
            Ready to Begin Your Skin Transformation?
          </h2>
          <p className="text-sm text-gray-300 font-light">
            Book a comprehensive consultation with our medical specialists today.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Button variant="gold" size="lg" onClick={() => navigate('/appointment')}>
              Book Consultation Now
            </Button>
            <Button variant="secondary" size="lg" onClick={() => navigate('/doctors')}>
              Meet Doctors <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
