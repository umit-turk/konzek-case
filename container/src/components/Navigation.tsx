import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import type { RootState } from '../store';

export const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const cartItemCount = useSelector((state: RootState) => state.cart.items.length);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-blue-600">
              E-Ticaret
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600">
              Ürünler
            </Link>
            <Link to="/cart" className="text-gray-700 hover:text-blue-600 relative">
              Sepet
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-4 bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartItemCount}
                </span>
              )}
            </Link>
            {isAuthenticated ? (
              <>
                <Link to="/orders" className="text-gray-700 hover:text-blue-600">
                  Siparişlerim
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-gray-700 hover:text-blue-600"
                >
                  Çıkış Yap
                </button>
              </>
            ) : (
              <Link to="/auth" className="text-gray-700 hover:text-blue-600">
                Giriş Yap
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-600"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white shadow-lg md:hidden z-50">
          <div className="flex flex-col space-y-4 px-4 py-6">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-blue-600"
              onClick={() => setIsOpen(false)}
            >
              Ürünler
            </Link>
            <Link 
              to="/cart" 
              className="text-gray-700 hover:text-blue-600 relative inline-block"
              onClick={() => setIsOpen(false)}
            >
              Sepet
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-4 bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartItemCount}
                </span>
              )}
            </Link>
            {isAuthenticated ? (
              <>
                <Link 
                  to="/orders" 
                  className="text-gray-700 hover:text-blue-600"
                  onClick={() => setIsOpen(false)}
                >
                  Siparişlerim
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="text-gray-700 hover:text-blue-600 text-left"
                >
                  Çıkış Yap
                </button>
              </>
            ) : (
              <Link 
                to="/auth" 
                className="text-gray-700 hover:text-blue-600"
                onClick={() => setIsOpen(false)}
              >
                Giriş Yap
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}; 