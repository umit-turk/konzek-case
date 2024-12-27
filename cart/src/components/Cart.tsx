import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../../container/src/store';
import { DEFAULT_PRODUCT_IMAGE } from '../../../container/src/utils/constants';
import { useCustomNavigate } from '../../../container/src/utils/navigation';

const Cart: React.FC = () => {
  const navigate = useCustomNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    dispatch({
      type: 'cart/updateQuantity',
      payload: { id, quantity: newQuantity },
    });
  };

  const removeItem = (id: number) => {
    dispatch({
      type: 'cart/removeItem',
      payload: id,
    });
    dispatch({
      type: 'toast/showToast',
      payload: {
        message: 'Ürün sepetten kaldırıldı',
        type: 'success',
      },
    });
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (Number(item.price) * item.quantity), 0).toFixed(2);
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      dispatch({
        type: 'toast/showToast',
        payload: {
          message: 'Sipariş vermek için giriş yapmalısınız!',
          type: 'warning',
          duration: 5000,
        },
      });
      navigate('/auth');
      return;
    }

    dispatch({ type: 'cart/clearCart' });
    dispatch({
      type: 'orders/addOrder',
      payload: {
        id: Date.now(),
        date: new Date().toISOString(),
        items: cartItems,
        total: calculateTotal(),
        status: 'Beklemede',
      },
    });
    dispatch({
      type: 'toast/showToast',
      payload: {
        message: 'Siparişiniz başarıyla oluşturuldu!',
        type: 'success',
        duration: 3000,
      },
    });
    navigate('/orders');
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = DEFAULT_PRODUCT_IMAGE;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8 text-gray-800">
        Alışveriş Sepeti
      </h2>
      {cartItems.length === 0 ? (
        <div className="card">
          <div className="text-center p-8">
            <p className="text-xl text-gray-600 mb-6">
              Sepetiniz boş
            </p>
            <button
              onClick={() => navigate('/')}
              className="btn btn-primary"
            >
              Alışverişe Başla
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="space-y-4 mb-8">
            {cartItems.map(item => (
              <div key={item.id} className="card">
                <div className="flex flex-col md:flex-row gap-6 p-4">
                  <div className="w-full md:w-48 h-48 relative">
                    <img
                      src={item.image || DEFAULT_PRODUCT_IMAGE}
                      alt={item.name}
                      onError={handleImageError}
                      className="absolute inset-0 w-full h-full object-cover rounded-md"
                    />
                  </div>
                  <div className="flex-1 flex flex-col">
                    <div>
                      <h3 className="text-xl font-medium text-gray-800 mb-2">
                        {item.name}
                      </h3>
                      <p className="text-xl font-medium text-primary-main">
                        {item.price.toFixed(2)} TL
                      </p>
                    </div>
                    <div className="mt-4 flex items-center gap-4">
                      <div className="flex items-center">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="btn btn-outlined w-10 h-10 p-0 flex items-center justify-center"
                        >
                          -
                        </button>
                        <span className="w-12 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="btn btn-outlined w-10 h-10 p-0 flex items-center justify-center"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="ml-auto text-error-main hover:text-error-dark transition-colors"
                      >
                        Kaldır
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="card">
            <div className="p-6 flex flex-col md:flex-row justify-between items-center gap-6">
              <div>
                <h3 className="text-xl text-gray-800 mb-2">
                  Toplam Tutar
                </h3>
                <p className="text-2xl font-medium text-primary-main">
                  {calculateTotal()} TL
                </p>
              </div>
              <div className="w-full md:w-auto">
                {!isAuthenticated && (
                  <p className="text-warning-main text-sm mb-2 text-center md:text-right">
                    * Sipariş vermek için giriş yapmalısınız
                  </p>
                )}
                <button
                  onClick={handleCheckout}
                  className="btn btn-primary w-full md:w-auto min-w-[200px]"
                >
                  {isAuthenticated ? 'Siparişi Tamamla' : 'Giriş Yap ve Sipariş Ver'}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart; 