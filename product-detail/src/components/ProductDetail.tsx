import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../container/src/store';
import { addItem } from '../../../container/src/store/slices/cartSlice';
import { showToast } from '../../../container/src/store/slices/toastSlice';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  
  const product = useSelector((state: RootState) => 
    state.products.products.find(p => p.id === Number(id))
  );
  const cartItem = useSelector((state: RootState) => 
    state.cart.items.find(item => item.id === Number(id))
  );

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>Ürün bulunamadı.</p>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    dispatch(addItem(product));
    dispatch(showToast({ 
      message: `${product.name} sepete eklendi`, 
      type: 'success',
      duration: 2000 
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          {/* Ürün Görseli */}
          <div className="md:w-1/2">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-96 object-cover"
            />
          </div>

          {/* Ürün Bilgileri */}
          <div className="md:w-1/2 p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {product.name}
            </h1>
            
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                Ürün Açıklaması
              </h2>
              <p className="text-gray-600">
                {product.description}
              </p>
            </div>

            <div className="mb-8">
              <span className="text-4xl font-bold text-primary-main">
                {product.price.toLocaleString('tr-TR')} TL
              </span>
            </div>

            <button
              onClick={handleAddToCart}
              className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                cartItem 
                  ? 'bg-success-main text-white hover:bg-success-dark'
                  : 'bg-primary-main text-white hover:bg-primary-dark'
              }`}
            >
              {cartItem ? `Sepette (${cartItem.quantity})` : 'Sepete Ekle'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail; 