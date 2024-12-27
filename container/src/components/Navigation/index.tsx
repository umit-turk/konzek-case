import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../store';
import { useClickOutside } from '../../hooks/useClickOutside';
import { NavItems } from './NavItems';
import { MenuButton } from './MenuButton';
import { MobileMenu } from './MobileMenu';

const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const cartItemCount = useSelector((state: RootState) => 
    state.cart.items.reduce((total, item) => total + item.quantity, 0)
  );
  const dispatch = useDispatch();

  // Route değiştiğinde menüyü kapat
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Click outside hook
  useClickOutside(menuRef, () => setIsMenuOpen(false));

  const handleMenuToggle = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  const handleMenuClose = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4" ref={menuRef}>
        <div className="flex justify-between items-center h-16">
          <Link 
            to="/" 
            className="text-xl font-medium text-primary-main hover:text-primary-dark transition-colors"
          >
            E-Ticaret
          </Link>

          <MenuButton 
            isOpen={isMenuOpen}
            onClick={handleMenuToggle}
          />

          {/* Desktop menu */}
          <ul className="hidden md:flex items-center space-x-6">
            <NavItems 
              isAuthenticated={isAuthenticated} 
              cartItemCount={cartItemCount} 
              dispatch={dispatch}
              onItemClick={handleMenuClose}
            />
          </ul>
        </div>

        {/* Mobile menu */}
        <MobileMenu 
          isOpen={isMenuOpen}
          isAuthenticated={isAuthenticated}
          cartItemCount={cartItemCount}
          dispatch={dispatch}
          onItemClick={handleMenuClose}
        />
      </div>
    </nav>
  );
};

export default React.memo(Navigation); 