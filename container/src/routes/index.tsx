import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ROUTES } from '../constants';
import { ProtectedRoute } from '../components/ProtectedRoute';
import LoadingSpinner from '../components/common/LoadingSpinner';

const ProductList = React.lazy(() => import('products/ProductList'));
const ProductDetail = React.lazy(() => import('productDetail/ProductDetail'));
const Cart = React.lazy(() => import('cart/Cart'));
const Auth = React.lazy(() => import('auth/Auth'));
const Orders = React.lazy(() => import('orders/OrderHistory'));

export const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path={ROUTES.PRODUCT.LIST} element={<ProductList />} />
        <Route path={ROUTES.PRODUCT.DETAIL} element={<ProductDetail />} />
        <Route path={ROUTES.CART} element={<Cart />} />
        <Route path={ROUTES.AUTH} element={<Auth />} />
        <Route
          path={ROUTES.ORDERS}
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}; 