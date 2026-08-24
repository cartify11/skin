import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Search, Clock, ShieldCheck, Sparkles, ArrowRight, Tag } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { PricingModal } from '../components/home/PricingModal';

interface ServiceItem {
  id: string;
  name: string;
  category: 'skin' | 'laser' | 'hair' | 'anti-aging';
  price: string;
  duration: string;
  desc: string;
  badge?: string;
  image: string;
}

const ALL_SERVICES: ServiceItem[] = [
  {
    id: 's-1',
    name: 'Hydra Facial Glow',
    category: 'skin',
    price: '$180',
    duration: '45 mins',
    desc: 'Deep pore vacuum extraction, vortex hydration, and antioxidant serum infusion for immediate glass skin.',
    badge: 'Most Popular',
    image: '/images/treatment_hydra.jpg',
  },
  {
    id: 's-2',
    name: 'Chemical Peel Medical Grade',
    category: 'skin',
    price: '$220',
    duration: '30 mins',
    desc: 'Multi-acid medical peel removing dead epidermal layers, hyperpigmentation, and active acne breakouts.',
    badge: 'Clinical Grade',
    image: '/images/treatment_peel.jpg',
  },
  {
    id: 's-3',
    name: 'Acne Scar Removal & Resurfacing',
    category: 'laser',
    price: '$350',
    duration: '60 mins',
    desc: 'Fractional CO2 laser and radiofrequency microneedling to rebuild dermal collagen and smooth rolling scars.',
    badge: 'High Impact',
    image: '/images/treatment_laser.jpg',
  },
  {
    id: 's-4',
    name: 'PRP Hair Loss Therapy',
    category: 'hair',
    price: '$390',
    duration: '60 mins',
    desc: 'Platelet-rich plasma micro-injections into scalp follicles to stimulate new hair regrowth and stop thinning.',
    badge: 'Top Rated',
    image: '/images/treatment_laser.jpg',
  },
  {
    id: 's-5',
    name: 'Botox Anti-Wrinkle Injections',
    category: 'anti-aging',
    price: '$280 / Area',
    duration: '20 mins',
    desc: 'US-FDA approved botulinum neuromodulator to relax forehead lines, crow’s feet, and frown lines naturally.',
    badge: 'Physician Only',
    image: '/images/treatment_botox.jpg',
  },
  {
    id: 's-6',
    name: 'Dermal Lip & Cheek Fillers',
    category: 'anti-aging',
    price: '$450 / Syringe',
    duration: '45 mins',
    desc: 'Cross-linked hyaluronic acid gels to restore youthful volume, contour jawline, and enhance lip definition.',
    badge: 'Premium Gel',
    image: '/images/treatment_fillers.jpg',
  },
];

export const ServicesPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) {
      setActiveCategory(cat);
    }
  }, [searchParams]);

  const categories = [
    { id: 'all', label: 'All Treatments' },
    { id: 'skin', label: 'Skin Rejuvenation' },
    { id: 'laser', label: 'Laser & Acne Scars' },
    { id: 'hair', label: 'Hair Restoration' },
    { id: 'anti-aging', label: 'Anti-Aging & Injectables' },
  ];

  const filteredServices = ALL_SERVICES.filter((item) => {
    const matchesCat = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleBookService = (serviceName: string) => {
    navigate(`/appointment?service=${encodeURIComponent(serviceName)}`);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      {/* Hero Banner */}
      <section className="relative py-20 bg-[#0B2521] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C89B7B_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C89B7B]">
            Evidence-Based Procedures
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-white tracking-tight">
            Clinical Treatments & Pricing
          </h1>
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-gray-300 font-light">
            Every procedure is performed in sterile US-FDA compliant procedure suites by board-certified dermatologists.
          </p>
          <div className="flex items-center justify-center gap-2 text-xs text-gray-400 pt-2">
            <Link to="/" className="hover:text-[#C89B7B]">Home</Link>
            <span>/</span>
            <span className="text-[#C89B7B] font-semibold">Services & Treatments</span>
          </div>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <section className="py-8 bg-white border-b border-[#E2E8E6] sticky top-[72px] z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  activeCategory === cat.id
                    ? 'bg-[#0B2521] text-[#C89B7B] shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Box & Pricing Modal CTA */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search treatments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-full border border-[#E2E8E6] text-xs focus:outline-none focus:ring-2 focus:ring-[#C89B7B]"
              />
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsPricingModalOpen(true)}
              className="whitespace-nowrap"
            >
              <Tag className="w-3.5 h-3.5" /> Full Price List
            </Button>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredServices.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-[#E2E8E6] p-8">
              <Sparkles className="w-12 h-12 text-[#C89B7B] mx-auto mb-4" />
              <h3 className="font-serif text-2xl font-bold text-[#0B2521]">No treatments found</h3>
              <p className="text-sm text-gray-500 mt-2">Try changing your search keywords or filter category.</p>
              <button
                onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
                className="mt-4 text-xs font-bold text-[#C89B7B] hover:underline"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredServices.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl border border-[#E2E8E6] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
                >
                  {/* Image Container */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {item.badge && (
                      <span className="absolute top-4 left-4 bg-[#0B2521]/90 backdrop-blur-md text-[#C89B7B] text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-[#C89B7B]/30">
                        {item.badge}
                      </span>
                    )}
                    <span className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md text-[#0B2521] text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                      {item.price}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                        <Clock className="w-3.5 h-3.5 text-[#C89B7B]" />
                        <span>{item.duration}</span>
                        <span>•</span>
                        <span className="uppercase text-[10px] font-bold text-[#C89B7B]">
                          {item.category}
                        </span>
                      </div>

                      <h3 className="font-serif font-bold text-xl text-[#0B2521] group-hover:text-[#C89B7B] transition-colors">
                        {item.name}
                      </h3>

                      <p className="text-xs text-gray-600 leading-relaxed font-light">
                        {item.desc}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                      <Button
                        variant="primary"
                        size="sm"
                        fullWidth
                        onClick={() => handleBookService(item.name)}
                      >
                        Book This Treatment <ArrowRight className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Pricing Catalog Dialog */}
      <PricingModal
        isOpen={isPricingModalOpen}
        onClose={() => setIsPricingModalOpen(false)}
        onSelectService={handleBookService}
      />
    </div>
  );
};
