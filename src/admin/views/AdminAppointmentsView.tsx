import React, { useState, useEffect } from 'react';
import { Eye, Trash2, Filter, CheckCircle2, Check, X, Clock } from 'lucide-react';
import { DataTable } from '../components/DataTable';
import type { Column } from '../components/DataTable';
import { AdminModal } from '../components/AdminModal';

interface AppointmentItem {
  id: string;
  referenceId: string;
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  serviceName: string;
  doctorName: string;
  date: string;
  time: string;
  status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
  notes?: string;
}

const INITIAL_APPOINTMENTS: AppointmentItem[] = [
  { id: '1', referenceId: 'AUR-90123', patientName: 'Elena Rostova', patientPhone: '(555) 019-2834', patientEmail: 'elena@example.com', serviceName: 'Acne Scar Removal', doctorName: 'Dr. Sarah Jenkins', date: '2026-08-01', time: '10:30 AM', status: 'CONFIRMED', notes: 'First visit for scar subcision' },
  { id: '2', referenceId: 'AUR-90124', patientName: 'Michael Sterling', patientPhone: '(555) 019-2835', patientEmail: 'michael@example.com', serviceName: 'PRP Hair Therapy', doctorName: 'Dr. Alex Rivera', date: '2026-08-01', time: '02:00 PM', status: 'PENDING', notes: 'Thinning hairline evaluation' },
  { id: '3', referenceId: 'AUR-90125', patientName: 'Sophia Chen', patientPhone: '(555) 019-2836', patientEmail: 'sophia@example.com', serviceName: 'Hydra Facial Glow', doctorName: 'First Available Specialist', date: '2026-08-02', time: '11:00 AM', status: 'COMPLETED' },
  { id: '4', referenceId: 'AUR-90126', patientName: 'David Vance', patientPhone: '(555) 019-2837', patientEmail: 'david@example.com', serviceName: 'Botox Anti-Aging', doctorName: 'Dr. Sarah Jenkins', date: '2026-08-02', time: '04:30 PM', status: 'CANCELLED' },
];

export const AdminAppointmentsView: React.FC = () => {
  const [appointments, setAppointments] = useState<AppointmentItem[]>(() => {
    const saved = localStorage.getItem('aura_admin_appointments');
    if (saved !== null) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return INITIAL_APPOINTMENTS;
  });

  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [selectedAppointment, setSelectedAppointment] = useState<AppointmentItem | null>(null);

  useEffect(() => {
    localStorage.setItem('aura_admin_appointments', JSON.stringify(appointments));
  }, [appointments]);

  const filteredAppointments = appointments.filter((item) => {
    if (statusFilter !== 'ALL' && item.status !== statusFilter) return false;
    return true;
  });

  const handleStatusChange = (id: string, newStatus: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED') => {
    const updated = appointments.map((a) => (a.id === id ? { ...a, status: newStatus } : a));
    setAppointments(updated);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this appointment record permanently?')) {
      const updated = appointments.filter((a) => a.id !== id);
      setAppointments(updated);
    }
  };

  const columns: Column<AppointmentItem>[] = [
    { header: 'Ref ID', cell: (row) => <span className="font-mono font-bold text-[#C89B7B]">{row.referenceId}</span> },
    {
      header: 'Patient Details',
      cell: (row) => (
        <div>
          <div className="font-bold text-[#0B2521]">{row.patientName}</div>
          <div className="text-[11px] text-gray-500">{row.patientPhone} | {row.patientEmail}</div>
        </div>
      ),
    },
    { header: 'Service', accessorKey: 'serviceName' },
    { header: 'Doctor Specialist', accessorKey: 'doctorName' },
    { header: 'Date & Time', cell: (row) => `${row.date} @ ${row.time}` },
    {
      header: 'Current Status',
      cell: (row) => (
        <span
          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold shadow-2xs ${
            row.status === 'CONFIRMED'
              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
              : row.status === 'COMPLETED'
              ? 'bg-blue-100 text-blue-800 border border-blue-300'
              : row.status === 'CANCELLED'
              ? 'bg-red-100 text-red-800 border border-red-300'
              : 'bg-amber-100 text-amber-800 border border-amber-300'
          }`}
        >
          {row.status === 'CONFIRMED' && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
          {row.status === 'PENDING' && <Clock className="w-3 h-3 text-amber-600" />}
          {row.status}
        </span>
      ),
    },
    {
      header: 'Quick Action (1-Click)',
      cell: (row) => (
        <div className="flex items-center gap-1.5">
          {row.status === 'PENDING' && (
            <>
              <button
                onClick={() => handleStatusChange(row.id, 'CONFIRMED')}
                className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[10px] font-bold shadow-xs transition-colors cursor-pointer"
                title="Click to Confirm Appointment"
              >
                <Check className="w-3 h-3" /> Confirm
              </button>
              <button
                onClick={() => handleStatusChange(row.id, 'CANCELLED')}
                className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg text-[10px] font-semibold transition-colors cursor-pointer"
                title="Click to Cancel"
              >
                <X className="w-3 h-3" /> Cancel
              </button>
            </>
          )}

          {row.status === 'CONFIRMED' && (
            <button
              onClick={() => handleStatusChange(row.id, 'COMPLETED')}
              className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[10px] font-bold shadow-xs transition-colors cursor-pointer"
              title="Click to Mark Treatment as Completed"
            >
              <CheckCircle2 className="w-3 h-3" /> Mark Completed
            </button>
          )}

          {row.status === 'COMPLETED' && (
            <span className="text-[10px] text-blue-700 font-bold bg-blue-50 px-2 py-1 rounded-md border border-blue-200 flex items-center gap-1">
              ✓ Treatment Done
            </span>
          )}

          {row.status === 'CANCELLED' && (
            <button
              onClick={() => handleStatusChange(row.id, 'PENDING')}
              className="text-[10px] text-gray-500 hover:text-amber-700 font-semibold underline cursor-pointer"
            >
              Reopen Booking
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-serif font-bold text-xl text-[#0B2521]">Appointments Management</h2>
          <p className="text-xs text-gray-500">View, confirm, and update patient booking schedules with 1-Click buttons</p>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center gap-2 bg-white p-1.5 rounded-xl border border-[#E2E8E6] text-xs font-medium shadow-2xs">
          <Filter className="w-4 h-4 text-gray-400 ml-2" />
          <span className="text-gray-400">Filter Status:</span>
          {['ALL', 'PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                statusFilter === st ? 'bg-[#0B2521] text-white font-bold' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      <DataTable
        columns={columns}
        data={filteredAppointments}
        searchPlaceholder="Search by patient name, phone, or service..."
        searchFilterKey="patientName"
        actions={(row) => (
          <div className="flex items-center justify-end gap-2">
            <button
              onClick={() => setSelectedAppointment(row)}
              className="p-1.5 rounded-lg text-gray-600 hover:bg-gray-100 cursor-pointer"
              title="View Appointment Details"
            >
              <Eye className="w-4 h-4 text-[#0B2521]" />
            </button>
            <button
              onClick={() => handleDelete(row.id)}
              className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 cursor-pointer"
              title="Delete Record"
            >
              <Trash2 className="w-4 h-4 text-red-600" />
            </button>
          </div>
        )}
      />

      {/* Detail View Modal */}
      {selectedAppointment && (
        <AdminModal
          isOpen={!!selectedAppointment}
          onClose={() => setSelectedAppointment(null)}
          title={`Appointment Details ${selectedAppointment.referenceId}`}
        >
          <div className="space-y-4 text-xs">
            <div className="p-3 bg-[#F4F6F5] rounded-xl space-y-2">
              <div><strong className="text-[#0B2521]">Patient Name:</strong> {selectedAppointment.patientName}</div>
              <div><strong className="text-[#0B2521]">Phone:</strong> {selectedAppointment.patientPhone}</div>
              <div><strong className="text-[#0B2521]">Email:</strong> {selectedAppointment.patientEmail}</div>
            </div>
            <div className="p-3 bg-[#FDFBF7] border border-[#E2E8E6] rounded-xl space-y-2">
              <div><strong className="text-[#0B2521]">Service Requested:</strong> {selectedAppointment.serviceName}</div>
              <div><strong className="text-[#0B2521]">Assigned Doctor:</strong> {selectedAppointment.doctorName}</div>
              <div><strong className="text-[#0B2521]">Date & Time:</strong> {selectedAppointment.date} at {selectedAppointment.time}</div>
              <div><strong className="text-[#0B2521]">Clinical Notes:</strong> {selectedAppointment.notes || 'None provided'}</div>
            </div>

            {/* Modal Quick Actions */}
            <div className="pt-2 flex items-center justify-end gap-2 border-t border-gray-100">
              {selectedAppointment.status === 'PENDING' && (
                <button
                  onClick={() => {
                    handleStatusChange(selectedAppointment.id, 'CONFIRMED');
                    setSelectedAppointment(null);
                  }}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-xl font-bold cursor-pointer hover:bg-emerald-700"
                >
                  ✓ Confirm Booking Now
                </button>
              )}
              {selectedAppointment.status === 'CONFIRMED' && (
                <button
                  onClick={() => {
                    handleStatusChange(selectedAppointment.id, 'COMPLETED');
                    setSelectedAppointment(null);
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-xl font-bold cursor-pointer hover:bg-blue-700"
                >
                  ✓ Mark Treatment Completed
                </button>
              )}
            </div>
          </div>
        </AdminModal>
      )}
    </div>
  );
};
