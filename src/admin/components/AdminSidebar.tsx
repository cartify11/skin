import React from 'react';
import {
  LayoutDashboard,
  UserCheck,
  Sparkles,
  Calendar,
  Image as ImageIcon,
  Star,
  Mail,
  Settings,
  LogOut,
  X,
  Stethoscope,
} from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';

export type AdminTab =
  | 'dashboard'
  | 'doctors'
  | 'services'
  | 'appointments'
  | 'gallery'
  | 'testimonials'
  | 'contacts'
  | 'settings';

interface AdminSidebarProps {
  activeTab: AdminTab;
  onTabChange: (tab: AdminTab) => void;
  isOpen: boolean;
  onCloseMobile: () => void;
  unreadCount?: number;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  activeTab,
  onTabChange,
  isOpen,
  onCloseMobile,
  unreadCount = 3,
}) => {
  const { logout } = useAdminAuth();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'doctors', label: 'Doctors', icon: UserCheck },
    { id: 'services', label: 'Services', icon: Sparkles },
    { id: 'appointments', label: 'Appointments', icon: Calendar },
    { id: 'gallery', label: 'Gallery Results', icon: ImageIcon },
    { id: 'testimonials', label: 'Testimonials', icon: Star },
    { id: 'contacts', label: 'Contact Inbox', icon: Mail, badge: unreadCount },
    { id: 'settings', label: 'Clinic Settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onCloseMobile}
      />

      {/* Sidebar Panel */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-[#0B2521] text-white z-50 flex flex-col justify-between transition-transform duration-300 ease-out border-r border-[#143D36] ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div>
          {/* Header Branding */}
          <div className="h-20 flex items-center justify-between px-6 border-b border-[#143D36]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#C89B7B] text-[#0B2521] flex items-center justify-center font-bold">
                <Stethoscope className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-bold text-lg tracking-wider text-white">
                  AURA
                </span>
                <span className="text-[10px] text-[#C89B7B] uppercase tracking-widest font-semibold">
                  Admin Portal
                </span>
              </div>
            </div>
            <button
              onClick={onCloseMobile}
              className="lg:hidden text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onTabChange(item.id as AdminTab);
                    onCloseMobile();
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[#C89B7B] text-[#0B2521] font-bold shadow-md'
                      : 'text-white/80 hover:bg-[#143D36] hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-5 h-5 ${isActive ? 'text-[#0B2521]' : 'text-[#C89B7B]'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && item.badge > 0 ? (
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                        isActive
                          ? 'bg-[#0B2521] text-white'
                          : 'bg-[#C89B7B] text-[#0B2521]'
                      }`}
                    >
                      {item.badge}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Logout Footer */}
        <div className="p-4 border-t border-[#143D36]">
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
          >
            <LogOut className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};
