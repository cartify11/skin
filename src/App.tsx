import { useState, useEffect } from 'react';
import { GlobalLayout } from './components/layout/GlobalLayout';
import { AdminLayout } from './admin/AdminLayout';

export function App() {
  const [isAdminView, setIsAdminView] = useState(false);

  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === '#admin') {
        setIsAdminView(true);
      } else {
        setIsAdminView(false);
      }
    };

    window.addEventListener('hashchange', handleHash);
    handleHash();

    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  if (isAdminView) {
    return <AdminLayout />;
  }

  return (
    <div className="relative">
      <GlobalLayout />
      {/* Quick Floating Admin Switcher Pill for Demo Ease */}
      <div className="fixed bottom-6 left-6 z-40">
        <a
          href="#admin"
          className="px-3.5 py-1.5 bg-[#0B2521] text-[#C89B7B] text-xs font-bold rounded-full shadow-lg border border-[#C89B7B]/30 hover:bg-[#143D36] transition-all flex items-center gap-1.5"
        >
          🔒 Admin Portal
        </a>
      </div>
    </div>
  );
}

export default App;
