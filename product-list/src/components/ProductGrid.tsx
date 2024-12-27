import React, { memo } from 'react';
import type { Product, CartItem } from '../../../container/src/types/index';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  cartItems: CartItem[];
  onAddToCart: (product: Product) => void;
  onProductClick: (product: Product) => void;
  isLoading?: boolean;
}

const ProductGrid: React.FC<ProductGridProps> = memo(({
  products,
  cartItems,
  onAddToCart,
  onProductClick,
  isLoading = false
}) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 text-lg">
          Aradığınız kriterlere uygun ürün bulunamadı.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => {
        const cartItem = cartItems.find(item => item.id === product.id);
        
        return (
          <ProductCard
            key={product.id}
            product={product}
            cartItem={cartItem}
            onAddToCart={onAddToCart}
            onProductClick={onProductClick}
            isLoading={isLoading}
          />
        );
      })}
    </div>
  );
});

ProductGrid.displayName = 'ProductGrid';

export default ProductGrid; 