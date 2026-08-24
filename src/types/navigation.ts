export interface SubNavItem {
  title: string;
  href: string;
  description?: string;
  iconName?: string;
}

export interface NavItem {
  title: string;
  href: string;
  isDropdown?: boolean;
  dropdownItems?: SubNavItem[];
}

export interface HeaderProps {
  activePath?: string;
  onNavigate?: (path: string) => void;
  onOpenBookingModal?: () => void;
}

export interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  items: NavItem[];
  activePath: string;
  onNavigate: (path: string) => void;
  onOpenBookingModal: () => void;
}
