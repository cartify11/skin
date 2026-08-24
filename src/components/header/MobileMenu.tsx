import React, { useEffect } from 'react';
import { X, Calendar, Phone, Sparkles } from 'lucide-react';
import type { MobileNavProps } from '../../types/navigation';
import { Button } from '../ui/Button';

export const MobileMenu: React.FC<MobileNavProps> = ({
  isOpen,
  onClose,
  items,
  activePath,
  onNavigate,
  onOpenBookingModal,
}) => {
  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleLinkClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const path = href.replace('#', '');
    onNavigate(path);
    onClose();
  };

  const handleBookingClick = () => {
    onClose();
    if (onOpenBookingModal) {
      onOpenBookingModal();
    } else {
      onNavigate('booking');
    }
  };

  return (
    <>
      {/* Dark Overlay Backdrop */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-out Drawer */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation Menu"
        className={`fixed top-0 right-0 w-[320px] max-w-[85vw] h-full bg-white z-50 shadow-2xl flex flex-col justify-between transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#E2E8E6]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#0B2521] text-white font-serif font-bold text-base flex items-center justify-center">
              A
            </div>
            <span className="font-serif font-bold text-lg tracking-widest text-[#0B2521]">
              AURA
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close navigation menu"
            className="w-9 h-9 rounded-full bg-[#F4F6F5] flex items-center justify-center text-[#0B2521] hover:bg-[#0B2521] hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#C89B7B]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body Links */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <ul className="space-y-3">
            {items.map((item) => {
              const path = item.href.replace('#', '');
              const isActive = activePath === path;

              return (
                <li key={item.title}>
                  <a
                    href={item.href}
                    onClick={(e) => handleLinkClick(e, item.href)}
                    className={`flex items-center justify-between p-3 rounded-xl font-medium text-base transition-colors ${
                      isActive
                        ? 'bg-[#F4ECE6] text-[#0B2521] font-bold border-l-4 border-[#C89B7B]'
                        : 'text-[#121816] hover:bg-[#F4F6F5] hover:text-[#C89B7B]'
                    }`}
                  >
                    <span>{item.title}</span>
                    {item.isDropdown && <Sparkles className="w-4 h-4 text-[#C89B7B]" />}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Drawer Footer Actions */}
        <div className="p-6 border-t border-[#E2E8E6] bg-[#FDFBF7] space-y-3">
          <Button variant="gold" fullWidth onClick={handleBookingClick}>
            <Calendar className="w-4 h-4" /> Book Appointment
          </Button>

          <a
            href="tel:15550192800"
            className="flex items-center justify-center gap-2 text-xs font-semibold text-[#0B2521] py-2 hover:text-[#C89B7B] transition-colors"
          >
            <Phone className="w-3.5 h-3.5" /> Call Clinic: (555) 019-2800
          </a>
        </div>
      </div>
    </>
  );
};
