import React, { memo } from 'react';
import { Button } from '../../../container/src/components/common/Button';
import { CART_MESSAGES } from '../constants/messages';
import type { EmptyCartProps } from '../types';

export const EmptyCart: React.FC<EmptyCartProps> = memo(({
  onStartShopping
}) => {
  return (
    <div className="bg-background-main rounded-lg shadow-md overflow-hidden">
      <div className="text-center p-8">
        <p className="text-xl text-text-secondary mb-6">
          {CART_MESSAGES.EMPTY_CART}
        </p>
        <Button
          onClick={onStartShopping}
        >
          Alışverişe Başla
        </Button>
      </div>
    </div>
  );
}); 