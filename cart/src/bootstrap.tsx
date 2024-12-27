import React from 'react';
import { createRoot } from 'react-dom/client';
import Cart from './components/Cart';

const mount = (el: Element) => {
  const root = createRoot(el);
  root.render(
    <React.StrictMode>
      <Cart />
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