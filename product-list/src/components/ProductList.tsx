import React, { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useProducts } from '../hooks/useProducts';
import { LoadingSpinner } from './LoadingSpinner';
import { addItem } from '../../../container/src/store/slices/cartSlice';
import { showToast } from '../../../container/src/store/slices/toastSlice';
import type { RootState } from '../../../container/src/store';

const ProductList: React.FC = memo(() => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products, isLoading, error } = useProducts();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const handleProductClick = useCallback((productId: number) => {
    navigate(`/product/${productId}`);
  }, [navigate]);

  const handleAddToCart = useCallback((e: React.MouseEvent, product: any) => {
    e.stopPropagation();
    dispatch(addItem(product));
    dispatch(showToast({
      message: `${product.name} sepete eklendi`,
      type: 'success',
      duration: 2000
    }));
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <p className="text-red-600 text-xl">
            {error}
          </p>
        </div>
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <p className="text-gray-500 text-xl">
            Ürün bulunamadı
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-10">
          Ürünlerimiz
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map(product => {
            const cartItem = cartItems.find(item => item.id === product.id);
            
            return (
              <div 
                key={product.id}
                className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl border border-gray-100"
                onClick={() => handleProductClick(product.id)}
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
                      onClick={(e) => handleAddToCart(e, product)}
                      className={`w-full mt-4 px-4 py-3 rounded-lg font-semibold text-sm text-white transition-all duration-300 
                        ${cartItem 
                          ? 'bg-green-600 hover:bg-green-700' 
                          : 'bg-blue-600 hover:bg-blue-700'
                        } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                      disabled={isLoading}
                    >
                      {cartItem ? `Sepette (${cartItem.quantity})` : 'Sepete Ekle'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
});

export default ProductList;
