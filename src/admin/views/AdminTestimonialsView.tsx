import React, { useState } from 'react';
import { Star, Eye, EyeOff, Trash2, CheckCircle } from 'lucide-react';
import { DataTable } from '../components/DataTable';
import type { Column } from '../components/DataTable';

interface TestimonialItem {
  id: string;
  patientName: string;
  rating: number;
  treatmentCategory: string;
  reviewText: string;
  isPublished: boolean;
}

const INITIAL_TESTIMONIALS: TestimonialItem[] = [
  { id: 'rev-1', patientName: 'Elena M.', rating: 5, treatmentCategory: 'Acne Scar Treatment', reviewText: 'Dr. Sarah completely resolved my cystic acne scars. Highly recommended!', isPublished: true },
  { id: 'rev-2', patientName: 'David K.', rating: 5, treatmentCategory: 'PRP Hair Therapy', reviewText: "Dr. Rivera's protocol showed noticeable density improvement after just 3 sessions.", isPublished: true },
];

export const AdminTestimonialsView: React.FC = () => {
  const [reviews, setReviews] = useState<TestimonialItem[]>(INITIAL_TESTIMONIALS);

  const togglePublish = (id: string) => {
    setReviews(reviews.map((r) => (r.id === id ? { ...r, isPublished: !r.isPublished } : r)));
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this patient testimonial?')) setReviews(reviews.filter((r) => r.id !== id));
  };

  const columns: Column<TestimonialItem>[] = [
    {
      header: 'Patient Name',
      cell: (row) => (
        <div className="font-bold text-[#0B2521] flex items-center gap-1.5">
          {row.patientName} <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
        </div>
      ),
    },
    { header: 'Treatment', accessorKey: 'treatmentCategory' },
    {
      header: 'Rating',
      cell: (row) => (
        <div className="flex items-center gap-1 text-amber-500 font-bold">
          {row.rating} <Star className="w-3.5 h-3.5 fill-current" />
        </div>
      ),
    },
    { header: 'Review Content', accessorKey: 'reviewText' },
    {
      header: 'Visibility',
      cell: (row) => (
        <button
          onClick={() => togglePublish(row.id)}
          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 cursor-pointer ${
            row.isPublished ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'
          }`}
        >
          {row.isPublished ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
          {row.isPublished ? 'PUBLISHED' : 'HIDDEN'}
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif font-bold text-xl text-[#0B2521]">Patient Testimonials</h2>
        <p className="text-xs text-gray-500">Moderate patient reviews and social proof entries</p>
      </div>

      <DataTable
        columns={columns}
        data={reviews}
        searchPlaceholder="Search reviews..."
        searchFilterKey="patientName"
        actions={(row) => (
          <button onClick={() => handleDelete(row.id)} className="p-1.5 rounded-lg text-red-600 hover:bg-red-50">
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      />
    </div>
  );
};
