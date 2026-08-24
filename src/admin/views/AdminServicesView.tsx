import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, CheckCircle2, XCircle } from 'lucide-react';
import { DataTable } from '../components/DataTable';
import type { Column } from '../components/DataTable';
import { AdminModal } from '../components/AdminModal';
import { Button } from '../../components/ui/Button';

interface ServiceItem {
  id: string;
  title: string;
  category: string;
  shortDescription: string;
  durationMinutes: number;
  startingPrice: string;
  status: 'ACTIVE' | 'INACTIVE';
}

const INITIAL_SERVICES: ServiceItem[] = [
  { id: 'srv-1', title: 'Acne Treatment', category: 'Acne & Scarring', shortDescription: 'Medical acne extractions and LED therapy', durationMinutes: 45, startingPrice: '$150', status: 'ACTIVE' },
  { id: 'srv-2', title: 'Acne Scar Removal', category: 'Acne & Scarring', shortDescription: 'Microneedling RF and fractional CO2 laser', durationMinutes: 60, startingPrice: '$350', status: 'ACTIVE' },
  { id: 'srv-3', title: 'Hydra Facial Glow', category: 'Skin Rejuvenation', shortDescription: '3-step deep pore cleansing and serum infusion', durationMinutes: 60, startingPrice: '$199', status: 'ACTIVE' },
  { id: 'srv-4', title: 'Chemical Peel', category: 'Skin Rejuvenation', shortDescription: 'Medical grade AHA/BHA exfoliation', durationMinutes: 45, startingPrice: '$175', status: 'ACTIVE' },
  { id: 'srv-5', title: 'PRP Hair Therapy', category: 'Hair Restoration', shortDescription: 'Platelet-rich plasma scalp micro-injections', durationMinutes: 60, startingPrice: '$400', status: 'ACTIVE' },
  { id: 'srv-6', title: 'Laser Hair Removal', category: 'Anti-Aging & Laser', shortDescription: 'FDA triple wavelength cooling laser reduction', durationMinutes: 45, startingPrice: '$99', status: 'ACTIVE' },
];

export const AdminServicesView: React.FC = () => {
  const [services, setServices] = useState<ServiceItem[]>(() => {
    const saved = localStorage.getItem('aura_admin_services');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return INITIAL_SERVICES;
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Skin Rejuvenation',
    shortDescription: '',
    durationMinutes: 45,
    startingPrice: '$150',
    status: 'ACTIVE' as 'ACTIVE' | 'INACTIVE',
  });

  useEffect(() => {
    localStorage.setItem('aura_admin_services', JSON.stringify(services));
  }, [services]);

  const handleOpenAdd = () => {
    setEditingService(null);
    setFormData({ title: '', category: 'Skin Rejuvenation', shortDescription: '', durationMinutes: 45, startingPrice: '$150', status: 'ACTIVE' });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (srv: ServiceItem) => {
    setEditingService(srv);
    setFormData({
      title: srv.title,
      category: srv.category,
      shortDescription: srv.shortDescription,
      durationMinutes: srv.durationMinutes,
      startingPrice: srv.startingPrice,
      status: srv.status,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this clinical service entry?')) {
      setServices(services.filter((s) => s.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingService) {
      setServices(services.map((s) => (s.id === editingService.id ? { ...s, ...formData } : s)));
    } else {
      setServices([...services, { id: 'srv-' + Date.now(), ...formData }]);
    }
    setIsModalOpen(false);
  };

  const columns: Column<ServiceItem>[] = [
    {
      header: 'Service Name',
      cell: (row) => (
        <div>
          <div className="font-bold text-[#0B2521]">{row.title}</div>
          <div className="text-[11px] text-gray-500">{row.shortDescription}</div>
        </div>
      ),
    },
    { header: 'Category', accessorKey: 'category' },
    { header: 'Duration', cell: (row) => `${row.durationMinutes} Mins` },
    { header: 'Starting Price', accessorKey: 'startingPrice' },
    {
      header: 'Status',
      cell: (row) => (
        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${row.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}>
          {row.status === 'ACTIVE' ? <CheckCircle2 className="w-3 h-3 text-emerald-600" /> : <XCircle className="w-3 h-3 text-gray-400" />}
          {row.status}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif font-bold text-xl text-[#0B2521]">Services & Treatments</h2>
          <p className="text-xs text-gray-500">Manage clinical procedures (Saved to Local Storage)</p>
        </div>
        <Button variant="gold" size="sm" onClick={handleOpenAdd}>
          <Plus className="w-4 h-4" /> Add New Treatment
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={services}
        searchPlaceholder="Search services..."
        searchFilterKey="title"
        actions={(row) => (
          <div className="flex items-center justify-end gap-2">
            <button onClick={() => handleOpenEdit(row)} className="p-1.5 rounded-lg text-gray-600 hover:bg-gray-100 cursor-pointer">
              <Edit className="w-4 h-4 text-blue-600" />
            </button>
            <button onClick={() => handleDelete(row.id)} className="p-1.5 rounded-lg text-gray-600 hover:bg-red-50 cursor-pointer">
              <Trash2 className="w-4 h-4 text-red-600" />
            </button>
          </div>
        )}
      />

      <AdminModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingService ? 'Edit Treatment' : 'Add Treatment'}>
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="space-y-1">
            <label className="font-semibold text-gray-700">Treatment Name *</label>
            <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required className="w-full p-2.5 bg-[#F4F6F5] border border-gray-200 rounded-xl" />
          </div>
          <div className="space-y-1">
            <label className="font-semibold text-gray-700">Category *</label>
            <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full p-2.5 bg-[#F4F6F5] border border-gray-200 rounded-xl">
              <option value="Skin Rejuvenation">Skin Rejuvenation</option>
              <option value="Acne & Scarring">Acne & Scarring</option>
              <option value="Hair Restoration">Hair Restoration</option>
              <option value="Anti-Aging & Laser">Anti-Aging & Laser</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="font-semibold text-gray-700">Short Summary *</label>
            <textarea value={formData.shortDescription} onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })} required rows={2} className="w-full p-2.5 bg-[#F4F6F5] border border-gray-200 rounded-xl" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-semibold text-gray-700">Duration (Mins) *</label>
              <input type="number" value={formData.durationMinutes} onChange={(e) => setFormData({ ...formData, durationMinutes: parseInt(e.target.value) || 0 })} required className="w-full p-2.5 bg-[#F4F6F5] border border-gray-200 rounded-xl" />
            </div>
            <div className="space-y-1">
              <label className="font-semibold text-gray-700">Starting Price *</label>
              <input type="text" value={formData.startingPrice} onChange={(e) => setFormData({ ...formData, startingPrice: e.target.value })} required className="w-full p-2.5 bg-[#F4F6F5] border border-gray-200 rounded-xl" />
            </div>
          </div>
          <Button variant="primary" fullWidth type="submit">
            {editingService ? 'Save Treatment' : 'Add Treatment'}
          </Button>
        </form>
      </AdminModal>
    </div>
  );
};
