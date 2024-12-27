import React, { memo, useMemo } from 'react';
import { Link } from 'react-router-dom';
import type { NavItemsProps, NavItem } from '../../types/navigation';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';

export const NavItems: React.FC<NavItemsProps> = memo(({ 
  isAuthenticated, 
  cartItemCount, 
  dispatch, 
  onItemClick 
}) => {
  const navItems = useMemo<NavItem[]>(() => [
    {
      to: '/',
      label: 'Ürünler'
    },
    {
      to: '/cart',
      label: 'Sepet',
      badge: cartItemCount
    },
    {
      to: '/orders',
      label: 'Siparişlerim',
      authRequired: true
    },
    {
      to: '/auth',
      label: 'Giriş',
      guestOnly: true,
      onClick: onItemClick,
      icon: (
        <Button
          variant="primary"
          size="small"
          className="ml-4"
        >
          Giriş
        </Button>
      )
    }
  ], [cartItemCount, onItemClick]);

  const handleLogout = () => {
    dispatch({ type: 'auth/logout' });
    onItemClick();
  };

  const renderNavItem = (item: NavItem) => {
    if (item.authRequired && !isAuthenticated) return null;
    if (item.guestOnly && isAuthenticated) return null;

    return (
      <li key={item.to}>
        {item.icon ? (
          <Link to={item.to}>
            {item.icon}
          </Link>
        ) : (
          <Link 
            to={item.to} 
            className="text-gray-700 hover:text-primary-main transition-colors block"
            onClick={item.onClick || onItemClick}
          >
            {item.badge !== undefined ? (
              <Badge count={item.badge}>
                {item.label}
              </Badge>
            ) : item.label}
          </Link>
        )}
      </li>
    );
  };

  return (
    <>
      {navItems.map(renderNavItem)}
      {isAuthenticated && (
        <li>
          <Button
            variant="text"
            onClick={handleLogout}
          >
            Çıkış
          </Button>
        </li>
      )}
    </>
  );
}); 