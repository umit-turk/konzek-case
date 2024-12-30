import React from 'react';
import {Navigation} from './Navigation';
import Footer from './Footer';
import Toast from './common/Toast';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation />
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <Toast />
      <Footer />
    </div>
  );
}; 