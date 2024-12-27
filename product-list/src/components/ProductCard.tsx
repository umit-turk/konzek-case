import React, { memo } from 'react';
import type { Product, CartItem } from '../../../container/src/types/index';

interface ProductCardProps {
  product: Product;
  cartItem?: CartItem;
  onAddToCart: (product: Product) => void;
  onProductClick: (product: Product) => void;
  isLoading?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = memo(({
  product,
  cartItem,
  onAddToCart,
  onProductClick,
  isLoading = false
}) => {
  const { name, description, price, image } = product;

  return (
    <article 
      className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
      onClick={() => onProductClick(product)}
    >
      <div className="p-4">
        <div className="aspect-w-16 aspect-h-9 mb-4">
          <img
            src={image}
            alt={name}
            className="w-full h-48 object-cover rounded-lg"
            loading="lazy"
          />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-gray-800 line-clamp-1">
            {name}
          </h2>
          <p className="text-gray-600 line-clamp-2">
            {description}
          </p>
          <div className="flex justify-between items-center pt-2">
            <span className="text-2xl font-bold text-primary-main">
              {price.toLocaleString('tr-TR')} TL
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(product);
              }}
              className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                cartItem 
                  ? 'bg-success-main text-white hover:bg-success-dark'
                  : 'bg-primary-main text-white hover:bg-primary-dark'
              }`}
              disabled={isLoading}
              aria-label={cartItem ? `Sepette ${cartItem.quantity} adet var` : 'Sepete Ekle'}
            >
              {cartItem ? `Sepette (${cartItem.quantity})` : 'Sepete Ekle'}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard; 