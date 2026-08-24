import React, { useState, useEffect } from 'react';
import { Award, Calendar, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/Button';

interface DoctorItem {
  id: string;
  name: string;
  title: string;
  degrees: string;
  experienceYears: number;
  specialties: string;
  status: 'ACTIVE' | 'INACTIVE';
  photoUrl: string;
}

const INITIAL_DOCTORS: DoctorItem[] = [
  {
    id: 'doc-1',
    name: 'Dr. Sarah Jenkins, MD',
    title: 'Chief Dermatologist & FAAD Member',
    degrees: 'MD Dermatology (Harvard Medical School)',
    experienceYears: 14,
    specialties: 'Acne Scarring, Botox & Fillers, Laser Toning, Skin Rejuvenation',
    status: 'ACTIVE',
    photoUrl: '/images/doctor_female_sarah.jpg',
  },
  {
    id: 'doc-2',
    name: 'Dr. Alex Rivera, MD',
    title: 'Hair Restoration & Plastic Surgeon',
    degrees: 'MD Surgery (Johns Hopkins University)',
    experienceYears: 12,
    specialties: 'PRP Hair Treatment, Alopecia Care, Male/Female Hair Loss',
    status: 'ACTIVE',
    photoUrl: '/images/doctor_male_alex.jpg',
  },
];

interface DoctorsSectionProps {
  onSelectDoctor: (doctorName: string) => void;
}

export const DoctorsSection: React.FC<DoctorsSectionProps> = ({ onSelectDoctor }) => {
  const [doctors, setDoctors] = useState<DoctorItem[]>(INITIAL_DOCTORS);

  useEffect(() => {
    const saved = localStorage.getItem('aura_admin_doctors');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setDoctors(parsed);
        }
      } catch (e) {}
    }
  }, []);

  const activeDoctors = doctors.filter((d) => d.status === 'ACTIVE');

  return (
    <section id="doctors" className="py-20 bg-white border-b border-[#E2E8E6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C89B7B]">
            Expert Medical Team
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B2521]">
            Meet Our Doctors
          </h2>
          <p className="text-sm text-gray-600">
            Board-certified dermatologists and hair restoration specialists committed to patient safety.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {activeDoctors.map((doc) => {
            const specList = doc.specialties.split(',').map((s) => s.trim());
            return (
              <div
                key={doc.id}
                className="bg-[#FDFBF7] rounded-3xl border border-[#E2E8E6] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 grid grid-cols-1 sm:grid-cols-5"
              >
                <div className="sm:col-span-2 relative min-h-[300px]">
                  <img
                    src={doc.photoUrl || '/images/doctor_female_sarah.jpg'}
                    alt={doc.name}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-4 left-4 bg-[#0B2521]/90 text-white text-[11px] font-bold px-3 py-1 rounded-full backdrop-blur-sm shadow-md">
                    {doc.experienceYears}+ Years Exp
                  </span>
                </div>

                <div className="sm:col-span-3 p-6 sm:p-8 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#C89B7B] uppercase tracking-wider mb-1">
                      <Award className="w-4 h-4" /> Board Certified Specialist
                    </div>
                    <h3 className="font-serif font-bold text-2xl text-[#0B2521]">{doc.name}</h3>
                    <p className="text-xs font-bold text-[#143D36] mt-0.5">{doc.title}</p>
                    <p className="text-[11px] text-gray-500 mt-1 font-medium">{doc.degrees}</p>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {specList.map((s, idx) => (
                        <span
                          key={idx}
                          className="bg-white border border-[#E2E8E6] text-[#0B2521] text-[10px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-2xs"
                        >
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" /> {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2">
                    <Button
                      variant="primary"
                      fullWidth
                      size="sm"
                      onClick={() => onSelectDoctor(doc.name)}
                    >
                      <Calendar className="w-4 h-4" /> Book with {doc.name.split(',')[0]}
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
