import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Sparkles, Shield } from 'lucide-react';
import type { NavItem } from '../../types/navigation';

interface DesktopNavProps {
  items: NavItem[];
  isScrolled: boolean;
  onOpenBookingModal?: () => void;
}

export const DesktopNav: React.FC<DesktopNavProps> = ({
  items,
  isScrolled,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();

  const isLinkActive = (href: string) => {
    if (href === '/' && location.pathname === '/') return true;
    if (href !== '/' && location.pathname.startsWith(href)) return true;
    return false;
  };

  return (
    <nav aria-label="Desktop Navigation">
      <ul className="flex items-center gap-8">
        {items.map((item) => {
          const isActive = isLinkActive(item.href);

          if (item.isDropdown) {
            return (
              <li
                key={item.title}
                className="relative group"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <Link
                  to={item.href}
                  className={`flex items-center gap-1.5 py-2 font-medium text-sm transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#C89B7B] rounded-md px-1 cursor-pointer ${
                    isScrolled
                      ? isActive
                        ? 'text-[#C89B7B] font-semibold'
                        : 'text-[#0B2521] hover:text-[#C89B7B]'
                      : isActive
                      ? 'text-[#C89B7B] font-semibold'
                      : 'text-white hover:text-[#C89B7B]'
                  }`}
                >
                  {item.title}
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-300 ${
                      dropdownOpen ? 'rotate-180' : ''
                    }`}
                  />
                </Link>

                {/* Dropdown Mega Menu */}
                <div
                  className={`absolute top-full left-1/2 -translate-x-1/2 w-[640px] bg-white rounded-2xl shadow-2xl border border-[#E2E8E6] p-6 grid grid-cols-2 gap-6 transition-all duration-300 origin-top z-50 ${
                    dropdownOpen
                      ? 'opacity-100 scale-100 pointer-events-auto translate-y-2'
                      : 'opacity-0 scale-95 pointer-events-none translate-y-0'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C89B7B]">
                      <Sparkles className="w-4 h-4" /> Skin Rejuvenation
                    </div>
                    <Link
                      to="/services?category=skin"
                      onClick={() => setDropdownOpen(false)}
                      className="block p-2 rounded-lg hover:bg-[#F4F6F5] transition-colors"
                    >
                      <div className="text-sm font-semibold text-[#0B2521]">Hydra Facial</div>
                      <div className="text-xs text-gray-500">Patented 3-step deep pore cleansing</div>
                    </Link>
                    <Link
                      to="/services?category=skin"
                      onClick={() => setDropdownOpen(false)}
                      className="block p-2 rounded-lg hover:bg-[#F4F6F5] transition-colors"
                    >
                      <div className="text-sm font-semibold text-[#0B2521]">Chemical Peel</div>
                      <div className="text-xs text-gray-500">Medical AHA/BHA skin resurfacing</div>
                    </Link>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C89B7B]">
                      <Shield className="w-4 h-4" /> Acne & Hair Therapy
                    </div>
                    <Link
                      to="/services?category=laser"
                      onClick={() => setDropdownOpen(false)}
                      className="block p-2 rounded-lg hover:bg-[#F4F6F5] transition-colors"
                    >
                      <div className="text-sm font-semibold text-[#0B2521]">Acne Scar Laser</div>
                      <div className="text-xs text-gray-500">Microneedling RF & CO2 Laser</div>
                    </Link>
                    <Link
                      to="/services?category=hair"
                      onClick={() => setDropdownOpen(false)}
                      className="block p-2 rounded-lg hover:bg-[#F4F6F5] transition-colors"
                    >
                      <div className="text-sm font-semibold text-[#0B2521]">PRP Hair Therapy</div>
                      <div className="text-xs text-gray-500">Platelet-rich hair restoration</div>
                    </Link>
                  </div>
                </div>
              </li>
            );
          }

          return (
            <li key={item.title}>
              <Link
                to={item.href}
                className={`relative py-2 font-medium text-sm transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#C89B7B] rounded-md px-1 ${
                  isScrolled
                    ? isActive
                      ? 'text-[#C89B7B] font-semibold'
                      : 'text-[#0B2521] hover:text-[#C89B7B]'
                    : isActive
                    ? 'text-[#C89B7B] font-semibold'
                    : 'text-white hover:text-[#C89B7B]'
                }`}
              >
                {item.title}
                {/* Active Underline Indicator */}
                <span
                  className={`absolute bottom-0 left-0 h-0.5 bg-[#C89B7B] transition-all duration-300 ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
