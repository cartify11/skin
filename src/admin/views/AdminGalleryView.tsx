import React, { useState } from 'react';
import { Plus, Trash2, CheckCircle2, XCircle } from 'lucide-react';
import { Button } from '../../components/ui/Button';

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  patientInfo: string;
  status: 'ACTIVE' | 'INACTIVE';
}

const INITIAL_GALLERY: GalleryItem[] = [
  { id: 'gal-1', title: 'Acne Scar Subcision Transformation', category: 'Acne & Scarring', patientInfo: 'Female, 22 Yrs (3 Sessions)', status: 'ACTIVE' },
  { id: 'gal-2', title: 'PRP Scalp Hair Density Restoration', category: 'Hair Restoration', patientInfo: 'Male, 34 Yrs (4 Sessions)', status: 'ACTIVE' },
];

export const AdminGalleryView: React.FC = () => {
  const [items, setItems] = useState<GalleryItem[]>(INITIAL_GALLERY);

  const toggleStatus = (id: string) => {
    setItems(items.map((i) => (i.id === id ? { ...i, status: i.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE' } : i)));
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete gallery item?')) setItems(items.filter((i) => i.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif font-bold text-xl text-[#0B2521]">Before & After Gallery Management</h2>
          <p className="text-xs text-gray-500">Manage patient clinical result showcases</p>
        </div>
        <Button variant="gold" size="sm" onClick={() => alert('Image Upload Dialog Triggered')}>
          <Plus className="w-4 h-4" /> Upload Transformation Pair
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {items.map((item) => (
          <div key={item.id} className="bg-white p-5 rounded-2xl border border-[#E2E8E6] shadow-sm space-y-3">
            <div className="h-40 bg-gradient-to-r from-[#2b1008] to-[#143d36] rounded-xl flex items-center justify-center text-white font-bold text-xs">
              [ BEFORE / AFTER PREVIEW ]
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-sm text-[#0B2521]">{item.title}</h4>
                <p className="text-xs text-gray-500">{item.category} • {item.patientInfo}</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => toggleStatus(item.id)} className="p-1.5 rounded-lg hover:bg-gray-100">
                  {item.status === 'ACTIVE' ? <CheckCircle2 className="w-5 h-5 text-emerald-600" /> : <XCircle className="w-5 h-5 text-gray-400" />}
                </button>
                <button onClick={() => handleDelete(item.id)} className="p-1.5 rounded-lg text-red-600 hover:bg-red-50">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
