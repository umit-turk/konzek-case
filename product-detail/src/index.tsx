import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from '../../container/src/store';
import ProductDetail from './components/ProductDetail';
import './index.css';

const mount = (el: Element) => {
  createRoot(el).render(
    <Provider store={store}>
      <ProductDetail />
    </Provider>
  );
};

// Standalone geliştirme için
if (process.env.NODE_ENV === 'development') {
  const devRoot = document.getElementById('root');
  if (devRoot) {
    mount(devRoot);
  }
}

// Container tarafından kullanılmak üzere
export { mount }; 