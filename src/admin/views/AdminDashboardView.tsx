import React, { useState, useEffect } from 'react';
import { UserCheck, Sparkles, Calendar, Mail, TrendingUp, Plus } from 'lucide-react';
import type { AdminTab } from '../components/AdminSidebar';

interface AdminDashboardViewProps {
  onNavigateTab: (tab: AdminTab) => void;
}

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({ onNavigateTab }) => {
  const [doctorCount, setDoctorCount] = useState<number>(2);
  const [serviceCount, setServiceCount] = useState<number>(6);
  const [appointmentCount, setAppointmentCount] = useState<number>(142);
  const [unreadContactCount, setUnreadContactCount] = useState<number>(2);
  const [recentAppointments, setRecentAppointments] = useState<any[]>([]);

  useEffect(() => {
    // 1. Calculate dynamic Doctors count
    const savedDocs = localStorage.getItem('aura_admin_doctors');
    if (savedDocs) {
      try {
        const parsed = JSON.parse(savedDocs);
        if (Array.isArray(parsed)) setDoctorCount(parsed.length);
      } catch (e) {}
    }

    // 2. Calculate dynamic Services count
    const savedServices = localStorage.getItem('aura_admin_services');
    if (savedServices) {
      try {
        const parsed = JSON.parse(savedServices);
        if (Array.isArray(parsed)) setServiceCount(parsed.length);
      } catch (e) {}
    }

    // 3. Calculate dynamic Appointments count
    const savedAppts = localStorage.getItem('aura_admin_appointments');
    if (savedAppts) {
      try {
        const parsed = JSON.parse(savedAppts);
        if (Array.isArray(parsed)) {
          setAppointmentCount(parsed.length);
          setRecentAppointments(parsed.slice(0, 4));
        }
      } catch (e) {}
    } else {
      setRecentAppointments([
        { referenceId: 'AUR-90123', patientName: 'Elena Rostova', serviceName: 'Acne Scar Removal', date: '2026-08-01', time: '10:30 AM', status: 'CONFIRMED' },
        { referenceId: 'AUR-90124', patientName: 'Michael Sterling', serviceName: 'PRP Hair Therapy', date: '2026-08-01', time: '02:00 PM', status: 'PENDING' },
        { referenceId: 'AUR-90125', patientName: 'Sophia Chen', serviceName: 'Hydra Facial Glow', date: '2026-08-02', time: '11:00 AM', status: 'COMPLETED' },
        { referenceId: 'AUR-90126', patientName: 'David Vance', serviceName: 'Botox Anti-Aging', date: '2026-08-02', time: '04:30 PM', status: 'PENDING' },
      ]);
    }

    // 4. Calculate dynamic Unread Contact Inbox count
    const savedContacts = localStorage.getItem('aura_admin_contacts');
    if (savedContacts) {
      try {
        const parsed = JSON.parse(savedContacts);
        if (Array.isArray(parsed)) {
          const unread = parsed.filter((c: any) => c.status === 'UNREAD').length;
          setUnreadContactCount(unread);
        }
      } catch (e) {}
    }
  }, []);

  const stats = [
    { title: 'Total Doctors', count: doctorCount.toString(), label: 'Active Specialists', icon: UserCheck, color: 'bg-emerald-500/10 text-emerald-600' },
    { title: 'Total Services', count: serviceCount.toString(), label: 'Clinical Procedures', icon: Sparkles, color: 'bg-amber-500/10 text-amber-600' },
    { title: 'Appointments', count: appointmentCount.toString(), label: 'Total Scheduled', icon: Calendar, color: 'bg-blue-500/10 text-blue-600' },
    { title: 'Contact Inbox', count: unreadContactCount.toString(), label: 'Unread Patient Inquiries', icon: Mail, color: 'bg-purple-500/10 text-purple-600' },
  ];

  return (
    <div className="space-y-6">
      {/* Dynamic Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="bg-white p-5 rounded-2xl border border-[#E2E8E6] shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-500">{item.title}</span>
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${item.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-3xl font-bold text-[#0B2521]">{item.count}</span>
                <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-0.5">
                  <TrendingUp className="w-3 h-3" /> Live
                </span>
              </div>
              <span className="text-[11px] text-gray-400 block">{item.label}</span>
            </div>
          );
        })}
      </div>

      {/* Quick Action Bar & Recent Appointments */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Appointments Table (2 Columns) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-[#E2E8E6] shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif font-bold text-lg text-[#0B2521]">Recent Appointments</h3>
              <p className="text-xs text-gray-500">Latest patient booking schedule</p>
            </div>
            <button
              onClick={() => onNavigateTab('appointments')}
              className="text-xs font-bold text-[#C89B7B] hover:underline cursor-pointer"
            >
              View All
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F4F6F5] text-gray-600 font-semibold border-b border-[#E2E8E6]">
                <tr>
                  <th className="py-2.5 px-3">Ref ID</th>
                  <th className="py-2.5 px-3">Patient Name</th>
                  <th className="py-2.5 px-3">Service</th>
                  <th className="py-2.5 px-3">Date & Time</th>
                  <th className="py-2.5 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentAppointments.map((row) => (
                  <tr key={row.referenceId || row.ref} className="hover:bg-[#FDFBF7]">
                    <td className="py-3 px-3 font-mono font-semibold text-[#C89B7B]">{row.referenceId || row.ref}</td>
                    <td className="py-3 px-3 font-bold text-[#0B2521]">{row.patientName || row.name}</td>
                    <td className="py-3 px-3 text-gray-600">{row.serviceName || row.service}</td>
                    <td className="py-3 px-3 text-gray-500">{row.date} {row.time}</td>
                    <td className="py-3 px-3">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          row.status === 'CONFIRMED'
                            ? 'bg-emerald-100 text-emerald-700'
                            : row.status === 'COMPLETED'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-amber-100 text-amber-700'
                        }`}
                      >
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions Panel */}
        <div className="bg-[#0B2521] text-white rounded-2xl p-6 space-y-5 shadow-lg flex flex-col justify-between">
          <div className="space-y-2">
            <span className="text-xs uppercase font-bold tracking-widest text-[#C89B7B]">Quick Actions</span>
            <h3 className="font-serif font-bold text-xl">Clinic Administration</h3>
            <p className="text-xs text-white/70">Fast shortcuts to add content and review patient inquiries.</p>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => onNavigateTab('doctors')}
              className="w-full flex items-center justify-between p-3.5 rounded-xl bg-[#143D36] hover:bg-[#C89B7B] hover:text-[#0B2521] transition-all font-semibold text-xs cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Plus className="w-4 h-4" /> Add Doctor Specialist
              </div>
              <span>&rarr;</span>
            </button>

            <button
              onClick={() => onNavigateTab('services')}
              className="w-full flex items-center justify-between p-3.5 rounded-xl bg-[#143D36] hover:bg-[#C89B7B] hover:text-[#0B2521] transition-all font-semibold text-xs cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Plus className="w-4 h-4" /> Add New Treatment
              </div>
              <span>&rarr;</span>
            </button>

            <button
              onClick={() => onNavigateTab('contacts')}
              className="w-full flex items-center justify-between p-3.5 rounded-xl bg-[#143D36] hover:bg-[#C89B7B] hover:text-[#0B2521] transition-all font-semibold text-xs cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" /> Review Contact Inbox
              </div>
              <span>&rarr;</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
