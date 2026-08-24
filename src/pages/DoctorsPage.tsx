import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Award, Calendar, CheckCircle2, ShieldCheck, Stethoscope, Star } from 'lucide-react';
import { Button } from '../components/ui/Button';

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

export const DoctorsPage: React.FC = () => {
  const navigate = useNavigate();
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

  const handleBookWithDoctor = (doctorName: string) => {
    navigate(`/appointment?doctor=${encodeURIComponent(doctorName)}`);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      {/* Hero Banner */}
      <section className="relative py-20 bg-[#0B2521] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C89B7B_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C89B7B]">
            World-Class Dermatological Specialists
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-white tracking-tight">
            Our Medical Specialists
          </h1>
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-gray-300 font-light">
            Meet our board-certified dermatologists, aesthetic physicians, and hair restoration surgeons.
          </p>
          <div className="flex items-center justify-center gap-2 text-xs text-gray-400 pt-2">
            <Link to="/" className="hover:text-[#C89B7B]">Home</Link>
            <span>/</span>
            <span className="text-[#C89B7B] font-semibold">Specialist Doctors</span>
          </div>
        </div>
      </section>

      {/* Doctors Profiles Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {activeDoctors.map((doc) => {
              const specList = doc.specialties.split(',').map((s) => s.trim());
              return (
                <div
                  key={doc.id}
                  className="bg-white rounded-3xl border border-[#E2E8E6] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row group"
                >
                  {/* Doctor Portrait */}
                  <div className="md:w-5/12 relative aspect-[3/4] md:aspect-auto overflow-hidden bg-gray-100">
                    <img
                      src={doc.photoUrl || '/images/doctor_female_sarah.jpg'}
                      alt={doc.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-[#0B2521]/90 backdrop-blur-md text-[#C89B7B] text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-[#C89B7B]/30 flex items-center gap-1.5">
                      <Award className="w-3 h-3 text-[#C89B7B]" />
                      <span>{doc.experienceYears}+ Yrs Exp</span>
                    </div>
                  </div>

                  {/* Doctor Bio Details */}
                  <div className="md:w-7/12 p-8 flex flex-col justify-between space-y-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-1 text-[#C89B7B]">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                        <span className="text-xs font-bold text-[#0B2521] ml-2">5.0 (480+ Reviews)</span>
                      </div>

                      <h3 className="font-serif text-2xl font-bold text-[#0B2521]">
                        {doc.name}
                      </h3>

                      <p className="text-xs font-bold text-[#C89B7B] uppercase tracking-wider">
                        {doc.title}
                      </p>

                      <p className="text-xs text-gray-500 font-medium">
                        🎓 {doc.degrees}
                      </p>

                      {/* Specialties Badges */}
                      <div className="pt-2">
                        <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">
                          Clinical Specialties:
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {specList.map((spec, sIdx) => (
                            <span
                              key={sIdx}
                              className="text-[11px] font-medium bg-[#F4ECE6] text-[#0B2521] px-2.5 py-1 rounded-md flex items-center gap-1"
                            >
                              <CheckCircle2 className="w-3 h-3 text-[#C89B7B]" />
                              {spec}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                      <Button
                        variant="gold"
                        size="md"
                        fullWidth
                        onClick={() => handleBookWithDoctor(doc.name)}
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

      {/* Safety & Credentials Highlight */}
      <section className="py-16 bg-white border-t border-[#E2E8E6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6 rounded-2xl bg-[#FDFBF7] border border-[#E2E8E6] space-y-2">
            <ShieldCheck className="w-8 h-8 text-[#C89B7B] mx-auto" />
            <h4 className="font-serif font-bold text-base text-[#0B2521]">100% Board Certified</h4>
            <p className="text-xs text-gray-500">Every physician holds active licensing and dermatology board memberships.</p>
          </div>
          <div className="p-6 rounded-2xl bg-[#FDFBF7] border border-[#E2E8E6] space-y-2">
            <Stethoscope className="w-8 h-8 text-[#C89B7B] mx-auto" />
            <h4 className="font-serif font-bold text-base text-[#0B2521]">Doctor-Administered Injections</h4>
            <p className="text-xs text-gray-500">Botox, fillers, and lasers are handled directly by doctors, never assistants.</p>
          </div>
          <div className="p-6 rounded-2xl bg-[#FDFBF7] border border-[#E2E8E6] space-y-2">
            <Award className="w-8 h-8 text-[#C89B7B] mx-auto" />
            <h4 className="font-serif font-bold text-base text-[#0B2521]">Continuous Clinical Training</h4>
            <p className="text-xs text-gray-500">Our doctors regularly train in Europe & USA for the latest aesthetic breakthroughs.</p>
          </div>
        </div>
      </section>
    </div>
  );
};
