import React, { memo } from 'react';
import { formatCurrency } from '../utils/currency';
import type { Product } from '../../../container/src/types/index';

interface ProductInfoProps {
  product: Product;
}

export const ProductInfo: React.FC<ProductInfoProps> = memo(({ product }) => {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl md:text-3xl font-semibold text-text-primary">
        {product.name}
      </h1>
      
      <div>
        <h2 className="text-lg font-medium text-text-primary mb-2">
          Ürün Açıklaması
        </h2>
        <p className="text-text-secondary">
          {product.description}
        </p>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-text-secondary mb-1">
            Stok Durumu
          </p>
          <span className={`px-3 py-1 rounded-full text-sm ${
            product.stock && product.stock > 0 
              ? 'bg-success-main text-white' 
              : 'bg-error-main text-white'
          }`}>
            {product.stock && product.stock > 0 ? 'Stokta' : 'Tükendi'}
          </span>
        </div>
        <div className="text-right">
          <p className="text-sm text-text-secondary mb-1">
            Fiyat
          </p>
          <span className="text-2xl font-semibold text-primary-main">
            {formatCurrency(product.price)} TL
          </span>
        </div>
      </div>
    </div>
  );
}); 