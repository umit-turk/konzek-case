import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Routes from './Routes';
import Toast from './components/common/Toast';
import ErrorBoundary from './components/common/ErrorBoundary';
import LoadingSpinner from './components/common/LoadingSpinner';

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Navigation />
          <main className="flex-grow container mx-auto px-4 py-8">
            <Suspense fallback={<LoadingSpinner />}>
              <Routes />
            </Suspense>
          </main>
          <Toast />
          <Footer />
        </div>
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default React.memo(App); 