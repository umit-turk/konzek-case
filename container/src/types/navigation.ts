import { Dispatch } from '@reduxjs/toolkit';

export interface NavItemsProps {
  isAuthenticated: boolean;
  cartItemCount: number;
  dispatch: Dispatch;
  onItemClick: () => void;
}

export interface NavItem {
  to: string;
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  badge?: number;
  authRequired?: boolean;
  guestOnly?: boolean;
} 