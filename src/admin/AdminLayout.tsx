import React, { useState } from 'react';
import { AdminAuthProvider, useAdminAuth } from './context/AdminAuthContext';
import { AdminSidebar } from './components/AdminSidebar';
import type { AdminTab } from './components/AdminSidebar';
import { AdminTopbar } from './components/AdminTopbar';
import { AdminLoginView } from './views/AdminLoginView';
import { AdminDashboardView } from './views/AdminDashboardView';
import { AdminDoctorsView } from './views/AdminDoctorsView';
import { AdminServicesView } from './views/AdminServicesView';
import { AdminAppointmentsView } from './views/AdminAppointmentsView';
import { AdminGalleryView } from './views/AdminGalleryView';
import { AdminTestimonialsView } from './views/AdminTestimonialsView';
import { AdminContactsView } from './views/AdminContactsView';
import { AdminSettingsView } from './views/AdminSettingsView';

const AdminContent: React.FC = () => {
  const { isAuthenticated } = useAdminAuth();
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  if (!isAuthenticated) {
    return <AdminLoginView />;
  }

  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <AdminDashboardView onNavigateTab={(t) => setActiveTab(t)} />;
      case 'doctors':
        return <AdminDoctorsView />;
      case 'services':
        return <AdminServicesView />;
      case 'appointments':
        return <AdminAppointmentsView />;
      case 'gallery':
        return <AdminGalleryView />;
      case 'testimonials':
        return <AdminTestimonialsView />;
      case 'contacts':
        return <AdminContactsView />;
      case 'settings':
        return <AdminSettingsView />;
      default:
        return <AdminDashboardView onNavigateTab={(t) => setActiveTab(t)} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex text-[#121816] antialiased">
      <AdminSidebar
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab)}
        isOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <AdminTopbar
          pageTitle={activeTab}
          onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
        />

        <main className="p-6 md:p-8 flex-1 overflow-y-auto">
          {renderActiveView()}
        </main>
      </div>
    </div>
  );
};

export const AdminLayout: React.FC = () => {
  return (
    <AdminAuthProvider>
      <AdminContent />
    </AdminAuthProvider>
  );
};
