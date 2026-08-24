import React, { useState } from 'react';
import { Info } from 'lucide-react';

export const BeforeAfterSection: React.FC = () => {
  const [sliderPos1, setSliderPos1] = useState(50);
  const [sliderPos2, setSliderPos2] = useState(50);

  return (
    <section id="gallery" className="py-20 bg-[#F4F6F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C89B7B]">
            Proven Clinical Results
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B2521]">
            Before & After Transformation Gallery
          </h2>
          <p className="text-sm text-gray-600">
            Real patient clinical outcomes (Untouched photography with explicit medical consent).
          </p>
        </div>

        {/* Ethical Notice */}
        <div className="max-w-3xl mx-auto mb-10 p-4 rounded-xl bg-white border border-[#E2E8E6] text-xs text-gray-600 flex items-center gap-3 shadow-xs">
          <Info className="w-5 h-5 text-[#C89B7B] flex-shrink-0" />
          <span>
            <strong>Medical Notice:</strong> Results may vary based on skin type, age, and procedure adherence. All images represent real Aura Clinic patients.
          </span>
        </div>

        {/* Sliders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: Acne Scars */}
          <div className="bg-white rounded-2xl overflow-hidden border border-[#E2E8E6] shadow-md space-y-4 p-4">
            <div className="relative h-72 rounded-xl overflow-hidden select-none">
              {/* BEFORE Image */}
              <div className="absolute inset-0">
                <img
                  src="/images/ba_acne_before.jpg"
                  alt="Acne Before"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 bg-[#0B2521]/80 text-white font-bold text-xs px-2.5 py-1 rounded-md backdrop-blur-xs">
                  BEFORE
                </span>
              </div>

              {/* AFTER Image (Clipped) */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ clipPath: `polygon(${sliderPos1}% 0, 100% 0, 100% 100%, ${sliderPos1}% 100%)` }}
              >
                <img
                  src="/images/ba_acne_after.jpg"
                  alt="Acne After"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 right-3 bg-[#C89B7B] text-[#0B2521] font-bold text-xs px-2.5 py-1 rounded-md shadow-md">
                  AFTER (3 Sessions)
                </span>
              </div>

              {/* Slider Handle */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl cursor-ew-resize flex items-center justify-center z-10"
                style={{ left: `${sliderPos1}%` }}
              >
                <div className="w-8 h-8 rounded-full bg-white text-[#0B2521] text-sm font-bold flex items-center justify-center shadow-lg border border-gray-200">
                  ↔
                </div>
              </div>

              <input
                type="range"
                min="0"
                max="100"
                value={sliderPos1}
                onChange={(e) => setSliderPos1(Number(e.target.value))}
                className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full z-20"
              />
            </div>

            <div className="space-y-1 pt-1">
              <h4 className="font-serif font-bold text-lg text-[#0B2521]">Acne Scar Subcision & Fractional Laser</h4>
              <p className="text-xs text-gray-500 font-medium">Patient: Female, 22 Yrs | Treatment Duration: 8 Weeks</p>
            </div>
          </div>

          {/* Card 2: PRP Hair */}
          <div className="bg-white rounded-2xl overflow-hidden border border-[#E2E8E6] shadow-md space-y-4 p-4">
            <div className="relative h-72 rounded-xl overflow-hidden select-none">
              {/* BEFORE Image */}
              <div className="absolute inset-0">
                <img
                  src="/images/ba_hair_before.jpg"
                  alt="Hair Before"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 bg-[#0B2521]/80 text-white font-bold text-xs px-2.5 py-1 rounded-md backdrop-blur-xs">
                  BEFORE
                </span>
              </div>

              {/* AFTER Image (Clipped) */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ clipPath: `polygon(${sliderPos2}% 0, 100% 0, 100% 100%, ${sliderPos2}% 100%)` }}
              >
                <img
                  src="/images/ba_hair_after.jpg"
                  alt="Hair After"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 right-3 bg-[#C89B7B] text-[#0B2521] font-bold text-xs px-2.5 py-1 rounded-md shadow-md">
                  AFTER (4 Sessions)
                </span>
              </div>

              {/* Slider Handle */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl cursor-ew-resize flex items-center justify-center z-10"
                style={{ left: `${sliderPos2}%` }}
              >
                <div className="w-8 h-8 rounded-full bg-white text-[#0B2521] text-sm font-bold flex items-center justify-center shadow-lg border border-gray-200">
                  ↔
                </div>
              </div>

              <input
                type="range"
                min="0"
                max="100"
                value={sliderPos2}
                onChange={(e) => setSliderPos2(Number(e.target.value))}
                className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full z-20"
              />
            </div>

            <div className="space-y-1 pt-1">
              <h4 className="font-serif font-bold text-lg text-[#0B2521]">PRP Hair Density Regeneration</h4>
              <p className="text-xs text-gray-500 font-medium">Patient: Male, 34 Yrs | Treatment Duration: 12 Weeks</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
