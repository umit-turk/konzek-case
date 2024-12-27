import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Routes from './Routes';
import Toast from './components/common/Toast';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navigation />
        <main className="flex-grow">
          <Routes />
        </main>
        <Toast />
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App; 