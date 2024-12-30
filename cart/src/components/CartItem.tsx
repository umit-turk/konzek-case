import React, { memo } from 'react';
import { DEFAULT_PRODUCT_IMAGE } from '../../../container/src/utils/constants';
import { Button } from '../../../container/src/components/common/Button';
import type { CartItemProps } from '../types';

export const CartItem: React.FC<CartItemProps> = memo(({
  item,
  onUpdateQuantity,
  onRemove,
}) => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = DEFAULT_PRODUCT_IMAGE;
  };

  return (
    <div className="bg-background-main rounded-lg shadow-md overflow-hidden">
      <div className="flex flex-col md:flex-row gap-6 p-4">
        <div className="w-full md:w-48 h-product-image relative">
          <img
            src={item.image || DEFAULT_PRODUCT_IMAGE}
            alt={item.name}
            onError={handleImageError}
            className="absolute inset-0 w-full h-full object-cover rounded-md"
          />
        </div>
        <div className="flex-1 flex flex-col">
          <div>
            <h3 className="text-xl font-medium text-text-primary mb-2">
              {item.name}
            </h3>
            <p className="text-xl font-medium text-primary-main">
              {item.price.toFixed(2)} TL
            </p>
          </div>
          <div className="mt-4 flex items-center gap-4">
            <div className="flex items-center">
              <Button
                variant="outline"
                onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                className="!w-10 !h-10 !p-0 flex items-center justify-center"
              >
                -
              </Button>
              <span className="w-12 text-center">
                {item.quantity}
              </span>
              <Button
                variant="outline"
                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                className="!w-10 !h-10 !p-0 flex items-center justify-center"
              >
                +
              </Button>
            </div>
            <Button
              variant="text"
              onClick={() => onRemove(item.id)}
              className="ml-auto text-error-main hover:text-error-dark"
            >
              Kaldır
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}); 