import React from 'react';
import { X, CheckCircle2, Clock, Calendar, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectService: (serviceName: string) => void;
}

export const PricingModal: React.FC<PricingModalProps> = ({
  isOpen,
  onClose,
  onSelectService,
}) => {
  if (!isOpen) return null;

  const catalog = [
    {
      name: 'Acne Treatment & Facial',
      category: 'Acne & Scarring',
      singlePrice: '$150',
      packagePrice: '$380 (3 Sessions)',
      duration: '45 Mins',
      features: ['Deep Pore Extraction', 'LED Blue Light Therapy', 'Medical Salicylic Peel'],
      popular: false,
    },
    {
      name: 'Acne Scar Subcision & Fractional Laser',
      category: 'Acne & Scarring',
      singlePrice: '$350',
      packagePrice: '$900 (3 Sessions)',
      duration: '60 Mins',
      features: ['Microneedling RF', 'Fractional CO2 Laser', 'Subcision for Deep Scars'],
      popular: true,
    },
    {
      name: 'Hydra Facial Glow Signature',
      category: 'Skin Rejuvenation',
      singlePrice: '$199',
      packagePrice: '$520 (3 Sessions)',
      duration: '60 Mins',
      features: ['3-Step Vortex Cleaning', 'Painless Pore Extraction', 'Antioxidant Serum Infusion'],
      popular: true,
    },
    {
      name: 'Chemical Peel Medical Grade',
      category: 'Skin Rejuvenation',
      singlePrice: '$175',
      packagePrice: '$450 (3 Sessions)',
      duration: '45 Mins',
      features: ['AHA/BHA Custom Glycolic', 'Hyperpigmentation Reduction', 'Skin Resurfacing'],
      popular: false,
    },
    {
      name: 'PRP Scalp Hair Therapy',
      category: 'Hair Restoration',
      singlePrice: '$400',
      packagePrice: '$1,100 (4 Sessions)',
      duration: '60 Mins',
      features: ['Autologous Growth Factors', 'Scalp Dermapen Micro-puncture', 'Hair Follicle Density Boost'],
      popular: true,
    },
    {
      name: 'Laser Hair Removal (Full Body/Area)',
      category: 'Laser Hair Removal',
      singlePrice: '$99',
      packagePrice: '$499 (6 Sessions)',
      duration: '30-60 Mins',
      features: ['FDA Diode Sapphire Laser', 'Continuous Cooling System', 'Permanent Hair Reduction'],
      popular: false,
    },
    {
      name: 'Botox Anti-Aging Injections',
      category: 'Anti-Aging & Fillers',
      singlePrice: '$12 / Unit',
      packagePrice: 'Custom Unit Bundle',
      duration: '30 Mins',
      features: ['Performed by MD Dermatologists', 'Smooths Forehead & Crow Feet', 'Natural Expression Guarantee'],
      popular: false,
    },
    {
      name: 'Dermal Fillers (Hyaluronic Acid)',
      category: 'Anti-Aging & Fillers',
      singlePrice: '$550 / Syringe',
      packagePrice: '$980 (2 Syringes)',
      duration: '45 Mins',
      features: ['Juvederm / Restylane', 'Lip Volumizing & Contour', 'Immediate 12-Month Result'],
      popular: false,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col border border-[#E2E8E6] shadow-2xl">
        {/* Modal Header */}
        <div className="p-6 bg-[#0B2521] text-white flex items-center justify-between border-b border-[#143D36]">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#C89B7B] font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" /> Full Clinical Price List
            </div>
            <h3 className="font-serif font-bold text-2xl">All Treatments & Session Packages</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {catalog.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#FDFBF7] p-6 rounded-2xl border border-[#E2E8E6] space-y-4 flex flex-col justify-between hover:border-[#C89B7B] transition-colors relative"
              >
                {item.popular && (
                  <span className="absolute top-4 right-4 bg-[#C89B7B] text-[#0B2521] text-[9px] font-bold uppercase px-2.5 py-0.5 rounded-full">
                    Best Value
                  </span>
                )}

                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-[#C89B7B] uppercase tracking-wider">
                    {item.category}
                  </span>
                  <h4 className="font-serif font-bold text-lg text-[#0B2521]">{item.name}</h4>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Clock className="w-3.5 h-3.5 text-[#C89B7B]" /> Session Duration: {item.duration}
                  </div>

                  <div className="pt-2 space-y-1 text-xs text-gray-600">
                    {item.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E2E8E6] flex items-center justify-between gap-3">
                  <div>
                    <div className="text-xs font-bold text-[#0B2521]">Single: <span className="text-[#C89B7B]">{item.singlePrice}</span></div>
                    <div className="text-[11px] text-emerald-600 font-semibold">{item.packagePrice}</div>
                  </div>

                  <Button
                    variant="gold"
                    size="sm"
                    onClick={() => {
                      onSelectService(item.name);
                      onClose();
                    }}
                  >
                    <Calendar className="w-3.5 h-3.5" /> Book Now
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#F4F6F5] border-t border-[#E2E8E6] text-center text-xs text-gray-500">
          * Transparent pricing. Complimentary diagnostic 3D skin evaluation included with every procedure.
        </div>
      </div>
    </div>
  );
};
