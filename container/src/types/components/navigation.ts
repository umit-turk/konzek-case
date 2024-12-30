import { ReactNode } from 'react';

export interface NavItemProps {
  to: string;
  label: string;
  icon?: ReactNode;
  badge?: number;
  authRequired?: boolean;
  guestOnly?: boolean;
  onClick?: () => void;
}

export interface NavItemsProps {
  isAuthenticated: boolean;
  cartItemCount: number;
  dispatch: any;
  onItemClick: () => void;
}

export interface MenuButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export interface MobileMenuProps extends NavItemsProps {
  isOpen: boolean;
} 