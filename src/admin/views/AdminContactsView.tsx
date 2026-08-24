import React, { useState, useEffect } from 'react';
import { Trash2, Eye } from 'lucide-react';
import { DataTable } from '../components/DataTable';
import type { Column } from '../components/DataTable';
import { AdminModal } from '../components/AdminModal';

interface ContactItem {
  id: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  date: string;
  status: 'UNREAD' | 'READ';
}

const INITIAL_CONTACTS: ContactItem[] = [
  { id: '1', name: 'Alexander Vance', phone: '(555) 018-2736', email: 'alex@example.com', message: 'Do you offer consultations for hyperpigmentation on Saturdays?', date: '2026-08-01 09:15 AM', status: 'UNREAD' },
  { id: '2', name: 'Clara Oswald', phone: '(555) 018-2737', email: 'clara@example.com', message: 'What is the recovery time for fractional CO2 laser resurfacing?', date: '2026-07-31 03:40 PM', status: 'UNREAD' },
  { id: '3', name: 'Robert Paulson', phone: '(555) 018-2738', email: 'robert@example.com', message: 'Inquiring about PRP hair restoration packages for male pattern baldness.', date: '2026-07-30 11:20 AM', status: 'READ' },
];

export const AdminContactsView: React.FC = () => {
  const [messages, setMessages] = useState<ContactItem[]>(() => {
    const saved = localStorage.getItem('aura_admin_contacts');
    if (saved !== null) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return INITIAL_CONTACTS;
  });

  const [selectedMsg, setSelectedMsg] = useState<ContactItem | null>(null);

  useEffect(() => {
    localStorage.setItem('aura_admin_contacts', JSON.stringify(messages));
  }, [messages]);

  const toggleRead = (id: string) => {
    setMessages(
      messages.map((m) =>
        m.id === id ? { ...m, status: m.status === 'UNREAD' ? 'READ' : 'UNREAD' } : m
      )
    );
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete contact message permanently?')) {
      setMessages(messages.filter((m) => m.id !== id));
    }
  };

  const columns: Column<ContactItem>[] = [
    {
      header: 'Patient Info',
      cell: (row) => (
        <div>
          <div className="font-bold text-[#0B2521] flex items-center gap-1.5">
            {row.name}
            {row.status === 'UNREAD' && (
              <span className="w-2 h-2 rounded-full bg-red-500" title="Unread Message" />
            )}
          </div>
          <div className="text-[11px] text-gray-500">{row.phone} | {row.email}</div>
        </div>
      ),
    },
    { header: 'Message Snippet', cell: (row) => <div className="truncate max-w-xs">{row.message}</div> },
    { header: 'Received Date', accessorKey: 'date' },
    {
      header: 'Status',
      cell: (row) => (
        <button
          onClick={() => toggleRead(row.id)}
          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 cursor-pointer ${
            row.status === 'UNREAD' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600'
          }`}
        >
          {row.status}
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif font-bold text-xl text-[#0B2521]">Contact Inbox Messages</h2>
        <p className="text-xs text-gray-500">Patient inquiries submitted through the contact form</p>
      </div>

      <DataTable
        columns={columns}
        data={messages}
        searchPlaceholder="Search messages by name or email..."
        searchFilterKey="name"
        actions={(row) => (
          <div className="flex items-center justify-end gap-2">
            <button
              onClick={() => {
                setSelectedMsg(row);
                if (row.status === 'UNREAD') toggleRead(row.id);
              }}
              className="p-1.5 rounded-lg text-gray-600 hover:bg-gray-100 cursor-pointer"
              title="View Message"
            >
              <Eye className="w-4 h-4 text-[#0B2521]" />
            </button>
            <button
              onClick={() => handleDelete(row.id)}
              className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 cursor-pointer"
              title="Delete Message"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      />

      {selectedMsg && (
        <AdminModal
          isOpen={!!selectedMsg}
          onClose={() => setSelectedMsg(null)}
          title={`Inquiry from ${selectedMsg.name}`}
        >
          <div className="space-y-4 text-xs">
            <div className="p-3 bg-[#F4F6F5] rounded-xl space-y-1">
              <div><strong className="text-[#0B2521]">Sender:</strong> {selectedMsg.name}</div>
              <div><strong className="text-[#0B2521]">Phone:</strong> {selectedMsg.phone}</div>
              <div><strong className="text-[#0B2521]">Email:</strong> {selectedMsg.email}</div>
              <div><strong className="text-[#0B2521]">Date:</strong> {selectedMsg.date}</div>
            </div>
            <div className="p-4 bg-white border border-[#E2E8E6] rounded-xl space-y-1">
              <strong className="text-[#0B2521]">Message Text:</strong>
              <p className="text-gray-700 leading-relaxed mt-1">{selectedMsg.message}</p>
            </div>
          </div>
        </AdminModal>
      )}
    </div>
  );
};
