import React, { memo } from 'react';
import { useCart } from '../hooks/useCart';
import type { Product } from '../../../container/src/types/';

interface ProductActionsProps {
  product: Product;
}

export const ProductActions: React.FC<ProductActionsProps> = memo(({ product }) => {
  const { addToCart, isInCart, getQuantity } = useCart();
  const quantity = getQuantity(product.id);

  return (
    <div className="space-y-4">
      <button
        onClick={() => addToCart(product)}
        disabled={product.stock === 0}
        className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-all duration-200 ${
          isInCart(product.id)
            ? 'bg-success-main hover:bg-success-dark'
            : product.stock === 0
              ? 'bg-error-main cursor-not-allowed'
              : 'bg-primary-main hover:bg-primary-dark'
        }`}
      >
        {quantity > 0 
          ? `Sepette (${quantity})` 
          : product.stock === 0 
            ? 'Tükendi' 
            : 'Sepete Ekle'
        }
      </button>
    </div>
  );
}); 