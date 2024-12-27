import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store';

const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartItemCount = cartItems.reduce((total: number, item: { quantity: number }) => total + item.quantity, 0);
  const dispatch = useDispatch();

  // Route değiştiğinde menüyü kapat
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Dışarı tıklandığında menüyü kapat
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

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

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none"
            aria-expanded={isMenuOpen}
            aria-label="Ana menüyü aç/kapat"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Desktop menu */}
          <ul className="hidden md:flex items-center space-x-6">
            <NavItems 
              isAuthenticated={isAuthenticated} 
              cartItemCount={cartItemCount} 
              dispatch={dispatch}
              onItemClick={() => setIsMenuOpen(false)}
            />
          </ul>
        </div>

        {/* Mobile menu */}
        <div 
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen 
              ? 'opacity-100 max-h-96' 
              : 'opacity-0 max-h-0'
          } overflow-hidden`}
        >
          <ul className="py-4 space-y-4">
            <NavItems 
              isAuthenticated={isAuthenticated} 
              cartItemCount={cartItemCount} 
              dispatch={dispatch}
              onItemClick={() => setIsMenuOpen(false)}
            />
          </ul>
        </div>
      </div>
    </nav>
  );
};

// NavItems component to avoid duplication
const NavItems: React.FC<{
  isAuthenticated: boolean;
  cartItemCount: number;
  dispatch: any;
  onItemClick: () => void;
}> = ({ isAuthenticated, cartItemCount, dispatch, onItemClick }) => (
  <>
    <li>
      <Link 
        to="/" 
        className="text-gray-700 hover:text-primary-main transition-colors block"
        onClick={onItemClick}
      >
        Ürünler
      </Link>
    </li>
    <li>
      <Link 
        to="/cart" 
        className="text-gray-700 hover:text-primary-main transition-colors relative block"
        onClick={onItemClick}
      >
        Sepet
        {cartItemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-error-main text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
            {cartItemCount}
          </span>
        )}
      </Link>
    </li>
    {isAuthenticated ? (
      <>
        <li>
          <Link 
            to="/orders" 
            className="text-gray-700 hover:text-primary-main transition-colors block"
            onClick={onItemClick}
          >
            Siparişlerim
          </Link>
        </li>
        <li>
          <button
            onClick={() => {
              dispatch({ type: 'auth/logout' });
              onItemClick();
            }}
            className="text-gray-700 hover:text-primary-main transition-colors block w-full text-left"
          >
            Çıkış
          </button>
        </li>
      </>
    ) : (
      <li>
        <Link 
          to="/auth" 
          className="text-gray-700 hover:text-primary-main transition-colors block"
          onClick={onItemClick}
        >
          Giriş
        </Link>
      </li>
    )}
  </>
);

export default Navigation; 