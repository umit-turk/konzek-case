import React, { memo } from 'react';

interface MenuButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export const MenuButton: React.FC<MenuButtonProps> = memo(({ isOpen, onClick }) => (
  <button
    onClick={onClick}
    className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none"
    aria-expanded={isOpen}
    aria-label="Ana menüyü aç/kapat"
  >
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      {isOpen ? (
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M6 18L18 6M6 6l12 12" 
        />
      ) : (
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M4 6h16M4 12h16M4 18h16" 
        />
      )}
    </svg>
  </button>
)); 