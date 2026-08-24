import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, Calendar } from 'lucide-react';
import { Logo } from './Logo';
import { DesktopNav } from './DesktopNav';
import { MobileMenu } from './MobileMenu';
import { Button } from '../ui/Button';
import type { NavItem } from '../../types/navigation';

const NAV_ITEMS: NavItem[] = [
  { title: 'Home', href: '/' },
  { title: 'About', href: '/about' },
  { title: 'Services', href: '/services', isDropdown: true },
  { title: 'Doctors', href: '/doctors' },
  { title: 'Gallery', href: '/gallery' },
  { title: 'Contact', href: '/contact' },
];

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Monitor scroll position to switch background from transparent to white glass
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHome = location.pathname === '/';

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ease-in-out ${
        isScrolled || !isHome
          ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-[#E2E8E6] py-3.5'
          : 'bg-[#0B2521]/90 backdrop-blur-sm py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Area */}
          <Logo isScrolled={isScrolled || !isHome} />

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <DesktopNav
              items={NAV_ITEMS}
              isScrolled={isScrolled || !isHome}
            />
          </div>

          {/* Primary CTA & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:block">
              <Button
                variant={isScrolled || !isHome ? 'primary' : 'gold'}
                size="md"
                onClick={() => navigate('/appointment')}
              >
                <Calendar className="w-4 h-4" />
                Book Appointment
              </Button>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileOpen(true)}
              aria-label="Open mobile navigation menu"
              aria-expanded={isMobileOpen}
              className={`lg:hidden p-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#C89B7B] ${
                isScrolled || !isHome
                  ? 'text-[#0B2521] hover:bg-[#F4F6F5]'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer Overlay */}
      <MobileMenu
        isOpen={isMobileOpen}
        onClose={() => setIsMobileOpen(false)}
        items={NAV_ITEMS}
      />
    </header>
  );
};
