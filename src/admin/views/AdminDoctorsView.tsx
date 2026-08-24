import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, CheckCircle2, XCircle, Upload, Image as ImageIcon } from 'lucide-react';
import { DataTable } from '../components/DataTable';
import type { Column } from '../components/DataTable';
import { AdminModal } from '../components/AdminModal';
import { Button } from '../../components/ui/Button';

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
    id: 'doc-101',
    name: 'Dr. Sarah Jenkins, MD',
    title: 'Chief Dermatologist',
    degrees: 'MD Dermatology (Harvard), FAAD',
    experienceYears: 14,
    specialties: 'Acne Scars, Botox, Laser Toning',
    status: 'ACTIVE',
    photoUrl: '/images/doctor_female_sarah.jpg',
  },
  {
    id: 'doc-102',
    name: 'Dr. Alex Rivera, MD',
    title: 'Hair Restoration & Plastic Surgeon',
    degrees: 'MD Surgery (Johns Hopkins)',
    experienceYears: 12,
    specialties: 'PRP Hair, Alopecia, Facial Contouring',
    status: 'ACTIVE',
    photoUrl: '/images/doctor_male_alex.jpg',
  },
];

export const AdminDoctorsView: React.FC = () => {
  const [doctors, setDoctors] = useState<DoctorItem[]>(() => {
    const saved = localStorage.getItem('aura_admin_doctors');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse doctors:', e);
      }
    }
    return INITIAL_DOCTORS;
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<DoctorItem | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    title: '',
    degrees: '',
    experienceYears: 5,
    specialties: '',
    status: 'ACTIVE' as 'ACTIVE' | 'INACTIVE',
    photoUrl: '/images/doctor_female_sarah.jpg',
  });

  useEffect(() => {
    localStorage.setItem('aura_admin_doctors', JSON.stringify(doctors));
  }, [doctors]);

  const handleOpenAddModal = () => {
    setEditingDoctor(null);
    setFormData({
      name: '',
      title: '',
      degrees: '',
      experienceYears: 5,
      specialties: '',
      status: 'ACTIVE',
      photoUrl: '/images/doctor_female_sarah.jpg',
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (doctor: DoctorItem) => {
    setEditingDoctor(doctor);
    setFormData({
      name: doctor.name,
      title: doctor.title,
      degrees: doctor.degrees,
      experienceYears: doctor.experienceYears,
      specialties: doctor.specialties,
      status: doctor.status,
      photoUrl: doctor.photoUrl,
    });
    setIsModalOpen(true);
  };

  // Convert uploaded image file from computer into Base64 data URL
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          photoUrl: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this doctor profile?')) {
      const updated = doctors.filter((d) => d.id !== id);
      setDoctors(updated);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let updated: DoctorItem[];
    if (editingDoctor) {
      updated = doctors.map((d) => (d.id === editingDoctor.id ? { ...d, ...formData } : d));
    } else {
      const newDoc: DoctorItem = {
        id: 'doc-' + Date.now(),
        ...formData,
      };
      updated = [...doctors, newDoc];
    }
    setDoctors(updated);
    setIsModalOpen(false);
  };

  const columns: Column<DoctorItem>[] = [
    {
      header: 'Doctor',
      cell: (row) => (
        <div className="flex items-center gap-3">
          <img
            src={row.photoUrl || '/images/doctor_female_sarah.jpg'}
            alt={row.name}
            className="w-10 h-10 rounded-full object-cover border border-gray-200 shadow-2xs"
          />
          <div>
            <div className="font-bold text-[#0B2521]">{row.name}</div>
            <div className="text-[11px] text-gray-500">{row.title}</div>
          </div>
        </div>
      ),
    },
    { header: 'Qualifications', accessorKey: 'degrees' },
    { header: 'Exp (Yrs)', accessorKey: 'experienceYears' },
    { header: 'Specialties', accessorKey: 'specialties' },
    {
      header: 'Status',
      cell: (row) => (
        <span
          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
            row.status === 'ACTIVE'
              ? 'bg-emerald-100 text-emerald-700'
              : 'bg-gray-100 text-gray-500'
          }`}
        >
          {row.status === 'ACTIVE' ? (
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
          ) : (
            <XCircle className="w-3 h-3 text-gray-400" />
          )}
          {row.status}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif font-bold text-xl text-[#0B2521]">Doctors Management</h2>
          <p className="text-xs text-gray-500">Add, edit, or remove specialist profiles</p>
        </div>
        <Button variant="gold" size="sm" onClick={handleOpenAddModal}>
          <Plus className="w-4 h-4" /> Add Doctor Specialist
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={doctors}
        searchPlaceholder="Search doctors by name or specialty..."
        searchFilterKey="name"
        actions={(row) => (
          <div className="flex items-center justify-end gap-2">
            <button
              onClick={() => handleOpenEditModal(row)}
              className="p-1.5 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
              title="Edit Doctor"
            >
              <Edit className="w-4 h-4 text-blue-600" />
            </button>
            <button
              onClick={() => handleDelete(row.id)}
              className="p-1.5 rounded-lg text-gray-600 hover:bg-red-50 transition-colors cursor-pointer"
              title="Delete Doctor"
            >
              <Trash2 className="w-4 h-4 text-red-600" />
            </button>
          </div>
        )}
      />

      {/* Add / Edit Doctor Modal with Image File Upload */}
      <AdminModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingDoctor ? 'Edit Doctor Profile' : 'Add New Doctor Specialist'}
      >
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="space-y-1">
            <label className="font-semibold text-gray-700">Full Name & Title *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              placeholder="e.g. Dr. Sarah Jenkins, MD"
              className="w-full p-2.5 bg-[#F4F6F5] border border-gray-200 rounded-xl"
            />
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-gray-700">Clinical Title *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              placeholder="e.g. Chief Dermatologist"
              className="w-full p-2.5 bg-[#F4F6F5] border border-gray-200 rounded-xl"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-semibold text-gray-700">Degrees & Qualifications *</label>
              <input
                type="text"
                value={formData.degrees}
                onChange={(e) => setFormData({ ...formData, degrees: e.target.value })}
                required
                placeholder="MD, FAAD"
                className="w-full p-2.5 bg-[#F4F6F5] border border-gray-200 rounded-xl"
              />
            </div>
            <div className="space-y-1">
              <label className="font-semibold text-gray-700">Experience (Years) *</label>
              <input
                type="number"
                value={formData.experienceYears}
                onChange={(e) =>
                  setFormData({ ...formData, experienceYears: parseInt(e.target.value) || 0 })
                }
                required
                className="w-full p-2.5 bg-[#F4F6F5] border border-gray-200 rounded-xl"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-gray-700">Specializations (Comma separated) *</label>
            <input
              type="text"
              value={formData.specialties}
              onChange={(e) => setFormData({ ...formData, specialties: e.target.value })}
              required
              placeholder="Acne Scars, Botox, Laser Toning"
              className="w-full p-2.5 bg-[#F4F6F5] border border-gray-200 rounded-xl"
            />
          </div>

          {/* Interactive File Upload Component */}
          <div className="space-y-2">
            <label className="font-semibold text-gray-700">Upload Doctor Photo *</label>
            <div className="flex items-center gap-4 p-3 bg-[#F4F6F5] border border-dashed border-gray-300 rounded-2xl">
              {formData.photoUrl ? (
                <img
                  src={formData.photoUrl}
                  alt="Doctor Preview"
                  className="w-14 h-14 rounded-full object-cover border-2 border-[#C89B7B] shadow-md flex-shrink-0"
                />
              ) : (
                <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 flex-shrink-0">
                  <ImageIcon className="w-6 h-6" />
                </div>
              )}

              <div className="flex-1 space-y-1">
                <label className="inline-flex items-center gap-2 px-3.5 py-2 bg-[#0B2521] text-white font-semibold text-xs rounded-xl cursor-pointer hover:bg-[#143D36] transition-colors shadow-xs">
                  <Upload className="w-3.5 h-3.5 text-[#C89B7B]" /> Select Photo from Device
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
                <p className="text-[10px] text-gray-500">Supports JPG, PNG, WebP (Max 5MB)</p>
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-gray-700">Status</label>
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value as 'ACTIVE' | 'INACTIVE' })
              }
              className="w-full p-2.5 bg-[#F4F6F5] border border-gray-200 rounded-xl"
            >
              <option value="ACTIVE">ACTIVE</option>
              <option value="INACTIVE">INACTIVE</option>
            </select>
          </div>

          <div className="pt-3">
            <Button variant="primary" fullWidth type="submit">
              {editingDoctor ? 'Save Changes' : 'Create Doctor Profile'}
            </Button>
          </div>
        </form>
      </AdminModal>
    </div>
  );
};
