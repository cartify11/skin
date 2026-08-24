import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { GlobalLayout } from './components/layout/GlobalLayout';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { DoctorsPage } from './pages/DoctorsPage';
import { GalleryPage } from './pages/GalleryPage';
import { AppointmentPage } from './pages/AppointmentPage';
import { ContactPage } from './pages/ContactPage';
import { AdminLayout } from './admin/AdminLayout';

function AdminFloatingButton() {
  const location = useLocation();
  if (location.pathname.startsWith('/admin')) return null;

  return (
    <div className="fixed bottom-6 left-6 z-40">
      <Link
        to="/admin"
        className="px-3.5 py-1.5 bg-[#0B2521] text-[#C89B7B] text-xs font-bold rounded-full shadow-lg border border-[#C89B7B]/30 hover:bg-[#143D36] transition-all flex items-center gap-1.5"
      >
        🔒 Admin Portal
      </Link>
    </div>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Patient-Facing Multi-Page Routes */}
        <Route path="/" element={<GlobalLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="doctors" element={<DoctorsPage />} />
          <Route path="gallery" element={<GalleryPage />} />
          <Route path="appointment" element={<AppointmentPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="*" element={<HomePage />} />
        </Route>

        {/* Protected Admin Portal Route */}
        <Route path="/admin/*" element={<AdminLayout />} />
      </Routes>

      <AdminFloatingButton />
    </BrowserRouter>
  );
}

export default App;
