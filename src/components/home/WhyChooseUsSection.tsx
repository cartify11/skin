import React from 'react';
import { UserCheck, Microscope, HeartHandshake, Tag, ArrowRight } from 'lucide-react';

export const WhyChooseUsSection: React.FC = () => {
  const pillars = [
    {
      title: 'Certified Dermatologists',
      subtitle: 'Board Certified MDs',
      desc: 'Board-certified medical specialists with 14+ years of clinical aesthetic and dermatology experience.',
      icon: UserCheck,
      badge: 'Expert Care',
    },
    {
      title: 'Modern Equipment',
      subtitle: 'US-FDA Approved',
      desc: 'State-of-the-art laser suites, 3D skin diagnostics, and sterile procedure rooms built for safety.',
      icon: Microscope,
      badge: 'Advanced Tech',
    },
    {
      title: 'Personalized Treatment',
      subtitle: 'Tailored Protocols',
      desc: 'Dermatological protocols mapped precisely to your skin type, hair texture, and aesthetic goals.',
      icon: HeartHandshake,
      badge: 'Custom Care',
    },
    {
      title: 'Affordable Packages',
      subtitle: 'Transparent Pricing',
      desc: 'Transparent pricing with zero hidden fees and customizable multi-session treatment bundles.',
      icon: Tag,
      badge: 'Best Value',
    },
  ];

  return (
    <section id="about" className="py-24 bg-gradient-to-b from-white via-[#FDFBF7] to-white border-b border-[#E2E8E6] relative overflow-hidden scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C89B7B]">
            Clinical Safety & Excellence
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#0B2521] tracking-tight">
            Why Choose Us
          </h2>
          <p className="text-sm sm:text-base text-gray-600 font-light leading-relaxed">
            Combining dermatological medical science with luxury aesthetic precision to deliver natural, long-lasting results.
          </p>
        </div>

        {/* 4 Professional Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white p-8 rounded-3xl border border-[#E2E8E6] shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between relative group border-t-4 border-t-transparent hover:border-t-[#C89B7B]"
              >
                {/* Top Badge */}
                <div className="flex items-center justify-between mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-[#0B2521] text-[#C89B7B] flex items-center justify-center shadow-md group-hover:bg-[#C89B7B] group-hover:text-[#0B2521] transition-all duration-300">
                    <Icon className="w-7 h-7" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full group-hover:bg-[#F4ECE6] group-hover:text-[#C89B7B] transition-colors">
                    {item.badge}
                  </span>
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-[#C89B7B] uppercase tracking-widest block">
                    {item.subtitle}
                  </span>
                  <h3 className="font-serif font-bold text-xl text-[#0B2521] group-hover:text-[#143D36] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed pt-2 font-normal">
                    {item.desc}
                  </p>
                </div>

                {/* Bottom Accent */}
                <div className="pt-6 mt-6 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-[#0B2521] group-hover:text-[#C89B7B] transition-colors">
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
