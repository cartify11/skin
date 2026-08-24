import React from 'react';
import { Search, Bell, Menu, User, ShieldCheck } from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';

interface AdminTopbarProps {
  onOpenMobileSidebar: () => void;
  pageTitle: string;
}

export const AdminTopbar: React.FC<AdminTopbarProps> = ({
  onOpenMobileSidebar,
  pageTitle,
}) => {
  const { user } = useAdminAuth();

  return (
    <header className="h-20 bg-white border-b border-[#E2E8E6] px-6 flex items-center justify-between sticky top-0 z-30 shadow-xs">
      {/* Left Title & Mobile Toggle */}
      <div className="flex items-center gap-4">
        <button
          onClick={onOpenMobileSidebar}
          className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
          aria-label="Toggle menu"
        >
          <Menu className="w-6 h-6" />
        </button>

        <div>
          <h1 className="font-serif font-bold text-xl text-[#0B2521] capitalize">
            {pageTitle}
          </h1>
          <p className="text-xs text-gray-500 hidden sm:block">
            Management & Clinical Operations Control
          </p>
        </div>
      </div>

      {/* Right Controls: Search, Notifications, Admin Profile */}
      <div className="flex items-center gap-5">
        {/* Search Input */}
        <div className="relative hidden md:block w-64">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search records..."
            className="w-full pl-9 pr-4 py-2 bg-[#F4F6F5] border border-transparent rounded-full text-xs text-[#121816] focus:outline-none focus:border-[#C89B7B] focus:bg-white transition-all"
          />
        </div>

        {/* Notifications Icon */}
        <button
          aria-label="Notifications"
          className="relative p-2 rounded-full text-gray-600 hover:bg-[#F4F6F5] transition-colors"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
        </button>

        <div className="h-8 w-px bg-gray-200 hidden sm:block" />

        {/* Admin User Badge */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#0B2521] text-white flex items-center justify-center font-bold">
            <User className="w-5 h-5" />
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="text-xs font-bold text-[#0B2521]">
              {user?.name || 'Dr. Admin'}
            </span>
            <span className="text-[10px] text-[#C89B7B] flex items-center gap-1 font-semibold uppercase">
              <ShieldCheck className="w-3 h-3" /> {user?.role || 'SUPER_ADMIN'}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
