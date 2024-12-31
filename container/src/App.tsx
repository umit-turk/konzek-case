import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ErrorBoundary from './components/common/ErrorBoundary';
import { Layout } from './components/Layout';
import { AppRoutes } from './routes/index';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Layout>
          <AppRoutes />
        </Layout>
      </ErrorBoundary>
    </BrowserRouter>
  );
}; 