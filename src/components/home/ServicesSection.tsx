import React, { useState } from 'react';
import {
  Clock,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { Button } from '../ui/Button';

interface ServicesSectionProps {
  onSelectService: (serviceName: string) => void;
  onOpenPricingModal: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectService,
  onOpenPricingModal,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');

  const services = [
    {
      id: 'acne',
      title: 'Acne Treatment',
      category: 'Acne',
      desc: 'Targeted clinical acne extractions, LED blue-light therapy, and medical prescriptions.',
      duration: '45 Mins',
      price: '$150',
      popular: true,
      image: '/images/ba_acne_before.jpg',
    },
    {
      id: 'laser',
      title: 'Laser Hair Removal',
      category: 'Laser Hair Removal',
      desc: 'FDA-cleared sapphire cooling diode laser for permanent precision hair reduction.',
      duration: '30-60 Mins',
      price: '$99',
      popular: false,
      image: '/images/treatment_laser.jpg',
    },
    {
      id: 'hydra',
      title: 'Hydra Facial Glow',
      category: 'Hydra Facial',
      desc: 'Patented 3-step vortex cleansing, painless extraction, and antioxidant hydration infusion.',
      duration: '60 Mins',
      price: '$199',
      popular: true,
      image: '/images/treatment_hydra.jpg',
    },
    {
      id: 'peel',
      title: 'Chemical Peel',
      category: 'Chemical Peel',
      desc: 'Customized AHA/BHA medical peels to exfoliate damaged skin and reduce pigmentation.',
      duration: '45 Mins',
      price: '$175',
      popular: false,
      image: '/images/treatment_peel.jpg',
    },
    {
      id: 'prp',
      title: 'PRP Hair Therapy',
      category: 'PRP',
      desc: 'Autologous platelet-rich plasma scalp micro-injections for natural hair density regeneration.',
      duration: '60 Mins',
      price: '$400',
      popular: true,
      image: '/images/ba_hair_after.jpg',
    },
    {
      id: 'botox',
      title: 'Botox Injections',
      category: 'Botox',
      desc: 'Precision anti-aging injections performed by MDs to smooth expression lines and wrinkles.',
      duration: '30 Mins',
      price: '$12/Unit',
      popular: false,
      image: '/images/treatment_botox.jpg',
    },
    {
      id: 'fillers',
      title: 'Dermal Fillers',
      category: 'Fillers',
      desc: 'Hyaluronic acid volumizing fillers for lip symmetry, cheeks, and jawline contouring.',
      duration: '45 Mins',
      price: '$550',
      popular: false,
      image: '/images/treatment_fillers.jpg',
    },
    {
      id: 'hair-loss',
      title: 'Hair Loss Treatment',
      category: 'Hair Treatment',
      desc: 'Comprehensive alopecia diagnostic evaluation, scalp mesotherapy, and growth factors.',
      duration: '60 Mins',
      price: '$200',
      popular: false,
      image: '/images/ba_hair_before.jpg',
    },
  ];

  const filteredServices = activeCategory === 'ALL'
    ? services
    : services.filter(s => s.category === activeCategory);

  return (
    <section id="services" className="py-24 bg-[#F4F6F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C89B7B]">
            Comprehensive Clinical Care
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#0B2521]">
            Our Services & Treatments
          </h2>
          <p className="text-sm sm:text-base text-gray-600 font-light leading-relaxed">
            Explore our FDA-approved dermatological, laser, anti-aging, and hair restoration procedures.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-14">
          {['ALL', 'Acne', 'Laser Hair Removal', 'Hydra Facial', 'Chemical Peel', 'PRP', 'Botox', 'Fillers', 'Hair Treatment'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#0B2521] text-white shadow-md scale-105'
                  : 'bg-white text-gray-700 hover:bg-[#C89B7B] hover:text-white border border-[#E2E8E6]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Services Grid with Local HD Cover Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredServices.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl overflow-hidden border border-[#E2E8E6] shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Image Cover Header */}
              <div className="relative h-48 overflow-hidden bg-gray-100">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {item.popular && (
                  <span className="absolute top-3 left-3 bg-[#C89B7B] text-[#0B2521] text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                    <Sparkles className="w-3 h-3 fill-current" /> Most Popular
                  </span>
                )}

                <span className="absolute bottom-3 right-3 bg-[#0B2521]/90 text-[#C89B7B] text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm border border-[#C89B7B]/30 shadow-md">
                  From {item.price}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[11px] font-semibold text-[#C89B7B] uppercase tracking-wider">
                    <Clock className="w-3.5 h-3.5 text-[#C89B7B]" /> {item.duration}
                  </div>
                  <h3 className="font-serif font-bold text-xl text-[#0B2521] group-hover:text-[#C89B7B] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>

                {/* Booking Button */}
                <div className="pt-4 border-t border-gray-100">
                  <Button
                    variant="gold"
                    fullWidth
                    size="sm"
                    onClick={() => onSelectService(item.title)}
                  >
                    Book Treatment <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Action Button Trigger */}
        <div className="mt-14 text-center">
          <Button variant="primary" size="lg" onClick={onOpenPricingModal}>
            View All Treatments & Pricing <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};
