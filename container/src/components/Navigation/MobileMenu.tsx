import React, { memo } from 'react';
import { Dispatch } from '@reduxjs/toolkit';
import { NavItems } from './NavItems';

interface MobileMenuProps {
  isOpen: boolean;
  isAuthenticated: boolean;
  cartItemCount: number;
  dispatch: Dispatch;
  onItemClick: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = memo(({
  isOpen,
  isAuthenticated,
  cartItemCount,
  dispatch,
  onItemClick
}) => (
  <div 
    className={`md:hidden transition-all duration-300 ease-in-out ${
      isOpen 
        ? 'opacity-100 max-h-96' 
        : 'opacity-0 max-h-0'
    } overflow-hidden`}
  >
    <ul className="py-4 space-y-4">
      <NavItems 
        isAuthenticated={isAuthenticated} 
        cartItemCount={cartItemCount} 
        dispatch={dispatch}
        onItemClick={onItemClick}
      />
    </ul>
  </div>
)); 