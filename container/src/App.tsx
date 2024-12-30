import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/common/ErrorBoundary';
import { Layout } from './components/Layout';
import LoadingSpinner from './components/common/LoadingSpinner';
import { ProtectedRoute } from './components/ProtectedRoute';

const ProductList = React.lazy(() => import('products/ProductList'));
const ProductDetail = React.lazy(() => import('productDetail/ProductDetail'));
const Cart = React.lazy(() => import('cart/Cart'));
const Auth = React.lazy(() => import('auth/Auth'));
const Orders = React.lazy(() => import('orders/OrderHistory'));

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Layout>
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<ProductList />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={
                  <Cart />
              } />
              <Route path="/auth" element={<Auth />} />
              <Route path="/orders" element={
                <ProtectedRoute>
                  <Orders />
                </ProtectedRoute>
              } />
            </Routes>
          </Suspense>
        </Layout>
      </ErrorBoundary>
    </BrowserRouter>
  );
}; 