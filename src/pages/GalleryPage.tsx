import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { BeforeAfterSection } from '../components/home/BeforeAfterSection';
import { Button } from '../components/ui/Button';

export const GalleryPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      {/* Hero Banner */}
      <section className="relative py-20 bg-[#0B2521] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C89B7B_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C89B7B]">
            Authentic Clinical Case Studies
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-white tracking-tight">
            Before & After Transformations
          </h1>
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-gray-300 font-light">
            Real patient outcomes achieved through personalized medical dermatological protocols. Drag the interactive sliders below to compare results.
          </p>
          <div className="flex items-center justify-center gap-2 text-xs text-gray-400 pt-2">
            <Link to="/" className="hover:text-[#C89B7B]">Home</Link>
            <span>/</span>
            <span className="text-[#C89B7B] font-semibold">Clinical Gallery</span>
          </div>
        </div>
      </section>

      {/* Interactive Sliders Section */}
      <BeforeAfterSection />

      {/* Case Studies Guarantee & Process */}
      <section className="py-16 bg-white border-t border-[#E2E8E6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#0B2521] text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-xl">
              <span className="text-xs font-bold uppercase tracking-widest text-[#C89B7B]">
                Medical Consultation
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold">
                Want to Achieve Similar Results For Your Skin or Hair?
              </h2>
              <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed">
                Schedule an in-person or online assessment with our doctors. We will create a customized 3-month medical treatment roadmap for you.
              </p>
              <div className="flex flex-wrap gap-4 pt-2 text-xs text-[#C89B7B]">
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> 3D Analysis Included</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> Zero Obligation Plan</span>
              </div>
            </div>

            <div className="flex-shrink-0">
              <Button
                variant="gold"
                size="lg"
                onClick={() => navigate('/appointment')}
              >
                Book Your Transformation <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
