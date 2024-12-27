import React from 'react';
import { createRoot } from 'react-dom/client';
import OrderHistory from './components/OrderHistory';

const mount = (el: Element) => {
  const root = createRoot(el);
  root.render(
    <React.StrictMode>
      <OrderHistory />
    </React.StrictMode>
  );
};

if (process.env.NODE_ENV === 'development') {
  const devRoot = document.getElementById('root');
  if (devRoot) {
    mount(devRoot);
  }
}

export { mount }; 