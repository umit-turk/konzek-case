import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from '../../container/src/store';
import './index.css';
import OrderHistory from './components/OrderHistory';

// Development modunda standalone çalışabilir
if (process.env.NODE_ENV === 'development') {
  const devRoot = document.getElementById('root');
  if (devRoot) {
    const root = createRoot(devRoot);
    root.render(
      <Provider store={store}>
        <OrderHistory />
      </Provider>
    );
  }
}

// Container tarafından kullanılmak üzere export
export default OrderHistory; 

