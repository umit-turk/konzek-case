import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../../container/src/store';
import ProductDetail from './components/ProductDetail';
import './index.css';

// Development modunda standalone çalışabilir
if (process.env.NODE_ENV === 'development') {
  const devRoot = document.getElementById('root');
  if (devRoot) {
    const root = createRoot(devRoot);
    root.render(
      <Provider store={store}>
        <BrowserRouter>
          <ProductDetail />
        </BrowserRouter>
      </Provider>
    );
  }
}

// Container tarafından kullanılmak üzere export
export default ProductDetail; 