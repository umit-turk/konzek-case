import React, { lazy, Suspense } from 'react';
import { Routes as RouterRoutes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from './store';

// Lazy loading ile mikro frontendleri yükle
const ProductList = lazy(() => import('products/ProductList'));
const ProductDetail = lazy(() => import('productDetail/ProductDetail'));
const Auth = lazy(() => import('auth/Auth'));
const Cart = lazy(() => import('cart/Cart'));
const OrderHistory = lazy(() => import('orders/OrderHistory'));

// Loading component
const Loading = () => (
  <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary-main"></div>
  </div>
);

// Korumalı route bileşeni
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
};

const Routes: React.FC = () => {
  return (
    <Suspense fallback={<Loading />}>
      <div className="container mx-auto px-4 py-8">
        <RouterRoutes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/cart" element={<Cart />} />
          <Route 
            path="/orders" 
            element={
              <ProtectedRoute>
                <OrderHistory />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </RouterRoutes>
      </div>
    </Suspense>
  );
};

export default Routes; 