import React, { memo } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../../../container/src/store/slices/cartSlice';
import { showToast } from '../../../container/src/store/slices/toastSlice';
import { Product } from '../../../container/src/types/index';

interface ProductCardProps {
  product: Product;
  cartItem?: {
    id: number;
    quantity: number;
    stock?: number;
  };
  onProductClick: (productId: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = memo(({ product, cartItem, onProductClick }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (product.stock && product.stock > 0) {
      dispatch(addItem(product));
      dispatch(showToast({
        message: `${product.name} sepete eklendi`,
        type: 'success',
        duration: 2000
      }));
    }
  };

  return (
    <div 
      className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl border border-gray-100"
      onClick={() => onProductClick(product.id)}
    >
      <div className="relative group">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        {cartItem && (
          <div className="absolute top-3 right-3 bg-blue-600 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm font-medium shadow-lg transform transition-transform duration-300 hover:scale-110">
            {cartItem.quantity}
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 min-h-[3.5rem]">
          {product.name}
        </h3>
        <p className="mt-2 text-sm text-gray-500 line-clamp-2 min-h-[2.5rem]">
          {product.description}
        </p>
        <div className="mt-4">
          <span className="text-2xl font-bold text-blue-600">
            {product.price.toLocaleString('tr-TR')} TL
          </span>
          <button
            onClick={handleAddToCart}
            className={`w-full mt-4 px-4 py-3 rounded-lg font-semibold text-sm text-white transition-all duration-300 
              ${cartItem 
                ? 'bg-green-600 hover:bg-green-700' 
                : product.stock && product.stock > 0 ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 hover:bg-gray-500'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
            disabled={!product.stock || product.stock <= 0}
          >
            {cartItem ? `Sepette (${cartItem.quantity})` : product.stock && product.stock > 0 ? 'Sepete Ekle' : 'Stokta Yok'}
          </button>
        </div>
      </div>
    </div>
  );
});

export default ProductCard;
