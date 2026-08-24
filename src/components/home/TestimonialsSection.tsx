import React from 'react';
import { Star, CheckCircle2, Quote } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const reviews = [
    {
      name: 'Elena Rostova',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      procedure: 'Acne Scar Treatment',
      quote: 'Dr. Sarah completely resolved my cystic acne scars that I suffered with for over 6 years. The clinic is pristine, luxurious, and caring.',
      stars: 5,
      date: '2 Weeks Ago',
    },
    {
      name: 'Michael Sterling',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      procedure: 'PRP Hair Therapy',
      quote: 'I was skeptical about scalp PRP, but Dr. Rivera explained the growth factor science thoroughly. Density increased by 40% in 4 months.',
      stars: 5,
      date: '1 Month Ago',
    },
    {
      name: 'Sophia Chen',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
      procedure: 'Hydra Facial Glow',
      quote: 'The Hydra Facial before my wedding gave me an immediate glow that lasted for weeks! Best dermatological care in the city.',
      stars: 5,
      date: '3 Weeks Ago',
    },
  ];

  return (
    <section id="testimonials" className="py-24 bg-gradient-to-b from-white via-[#FDFBF7] to-white border-b border-[#E2E8E6] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C89B7B]">
            Patient Experiences
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#0B2521]">
            Patient Reviews & Stories
          </h2>
          <div className="flex items-center justify-center gap-2 text-sm pt-1">
            <div className="flex text-[#D4AF37] space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current drop-shadow-xs" />
              ))}
            </div>
            <span className="font-bold text-[#0B2521]">4.9 / 5.0</span>
            <span className="text-gray-500 font-normal">(1,420+ Verified Patient Ratings)</span>
          </div>
        </div>

        {/* 3 Luxury Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="bg-white p-8 rounded-3xl border border-[#E2E8E6] shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between relative group border-t-4 border-t-transparent hover:border-t-[#C89B7B]"
            >
              {/* Quote Watermark Icon */}
              <Quote className="w-12 h-12 text-[#F4ECE6] absolute top-6 right-6 group-hover:text-[#C89B7B]/20 transition-colors" />

              <div className="space-y-4 relative z-10">
                {/* 5 Gold Stars */}
                <div className="flex items-center justify-between">
                  <div className="flex text-[#D4AF37] space-x-1">
                    {[...Array(rev.stars)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-[10px] text-gray-400 font-semibold">{rev.date}</span>
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-gray-700 italic leading-relaxed pt-2">
                  "{rev.quote}"
                </p>
              </div>

              {/* Patient Profile Footer */}
              <div className="flex items-center gap-4 pt-6 mt-6 border-t border-gray-100 relative z-10">
                <img
                  src={rev.avatar}
                  alt={rev.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#C89B7B] shadow-md flex-shrink-0"
                />
                <div>
                  <h4 className="font-serif font-bold text-base text-[#0B2521] group-hover:text-[#C89B7B] transition-colors">
                    {rev.name}
                  </h4>
                  <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Verified Patient • {rev.procedure}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
