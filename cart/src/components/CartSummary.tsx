import React, { memo } from 'react';
import { Button } from '../../../container/src/components/common/Button';
import { CART_MESSAGES } from '../constants/messages';
import type { CartSummaryProps } from '../types';

export const CartSummary: React.FC<CartSummaryProps> = memo(({
  items,
  onCheckout,
  isAuthenticated,
  isLoading
}) => {
  const total = items.reduce(
    (sum, item) => sum + (Number(item.price) * item.quantity), 
    0
  );

  return (
    <div className="bg-background-main rounded-lg shadow-md overflow-hidden">
      <div className="p-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h3 className="text-xl text-text-primary mb-2">
            Toplam Tutar
          </h3>
          <p className="text-2xl font-medium text-primary-main">
            {total.toFixed(2)} TL
          </p>
        </div>
        <div className="w-full md:w-auto">
          {!isAuthenticated && (
            <p className="text-warning-main text-sm mb-2 text-center md:text-right">
              {CART_MESSAGES.AUTH_WARNING}
            </p>
          )}
          <Button
            onClick={onCheckout}
            fullWidth
            loading={isLoading}
            disabled={isLoading}
            className="md:w-auto min-w-button"
          >
            {isAuthenticated ? 'Siparişi Tamamla' : 'Giriş Yap ve Sipariş Ver'}
          </Button>
        </div>
      </div>
    </div>
  );
}); 