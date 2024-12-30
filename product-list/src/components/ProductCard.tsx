import React, { memo } from 'react';
import { formatCurrency } from '../utils/currency';
import type { ProductCardProps } from '../types';

export const ProductCard: React.FC<ProductCardProps> = memo(({ product, onProductClick }) => {
  return (
    <div 
      className="product-card cursor-pointer"
      onClick={() => onProductClick(product.id)}
    >
      <img
        src={product.image}
        alt={product.name}
        className="product-image"
      />
      <h3 className="product-title">
        {product.name}
      </h3>
      <div className="flex items-center justify-between">
        <span className="product-price">
          {formatCurrency(product.price)} TL
        </span>
        {product.stock && product.stock > 0 ? (
          <span className="text-sm text-success-main">
            Stokta
          </span>
        ) : (
          <span className="text-sm text-error-main">
            Tükendi
          </span>
        )}
      </div>
    </div>
  );
});
