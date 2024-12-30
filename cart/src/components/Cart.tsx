import React, { memo } from 'react';
import { useCart } from '../hooks/useCart';
import { CartItem } from './CartItem';
import { CartSummary } from './CartSummary';
import { EmptyCart } from './EmptyCart';
import { useCustomNavigate } from '../../../container/src/utils/navigation';

export const Cart: React.FC = memo(() => {
  const navigate = useCustomNavigate();
  const { 
    items, 
    isAuthenticated, 
    updateQuantity, 
    removeItem, 
    handleCheckout 
  } = useCart();

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8 text-text-primary">
        Alışveriş Sepeti
      </h2>
      
      {items.length === 0 ? (
        <EmptyCart onStartShopping={() => navigate.navigate('/')} />
      ) : (
        <>
          <div className="space-y-4 mb-8">
            {items.map(item => (
              <CartItem
                key={item.id}
                item={item}
                onUpdateQuantity={updateQuantity}
                onRemove={removeItem}
              />
            ))}
          </div>
          <CartSummary
            items={items}
            onCheckout={handleCheckout}
            isAuthenticated={isAuthenticated}
          />
        </>
      )}
    </div>
  );
}); 
export default Cart;