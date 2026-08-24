import React, { useState, useEffect } from 'react';
import { Menu, Calendar } from 'lucide-react';
import { Logo } from './Logo';
import { DesktopNav } from './DesktopNav';
import { MobileMenu } from './MobileMenu';
import { Button } from '../ui/Button';
import type { NavItem, HeaderProps } from '../../types/navigation';

const NAV_ITEMS: NavItem[] = [
  { title: 'Home', href: '#home' },
  { title: 'About', href: '#about' },
  { title: 'Doctors', href: '#doctors' },
  { title: 'Services', href: '#services', isDropdown: true },
  { title: 'Gallery', href: '#gallery' },
  { title: 'Testimonials', href: '#testimonials' },
  { title: 'Contact', href: '#contact' },
];

export const Header: React.FC<HeaderProps> = ({
  activePath = 'home',
  onNavigate = () => {},
  onOpenBookingModal = () => {},
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

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

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ease-in-out ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-md shadow-md border-b border-[#E2E8E6] py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Area */}
          <Logo isScrolled={isScrolled} onNavigate={onNavigate} />

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <DesktopNav
              items={NAV_ITEMS}
              activePath={activePath}
              isScrolled={isScrolled}
              onNavigate={onNavigate}
            />
          </div>

          {/* Primary CTA & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:block">
              <Button
                variant={isScrolled ? 'primary' : 'gold'}
                size="md"
                onClick={onOpenBookingModal}
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
                isScrolled
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
        activePath={activePath}
        onNavigate={onNavigate}
        onOpenBookingModal={onOpenBookingModal}
      />
    </header>
  );
};
