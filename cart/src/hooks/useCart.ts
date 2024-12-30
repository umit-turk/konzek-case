import { useSelector, useDispatch } from 'react-redux';
import { useCustomNavigate } from '../../../container/src/utils/navigation';
import type { RootState } from '../../../container/src/store';
import { CART_MESSAGES } from '../constants/messages';
import type { UseCartReturn } from '../types';

export const useCart = (): UseCartReturn => {
  const dispatch = useDispatch();
  const navigate = useCustomNavigate();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) return;
    dispatch({
      type: 'cart/updateQuantity',
      payload: { id, quantity },
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
        message: CART_MESSAGES.ITEM_REMOVED,
        type: 'success',
      },
    });
  };

  const clearCart = () => {
    dispatch({ type: 'cart/clearCart' });
  };

  const total = cartItems.reduce(
    (sum, item) => sum + (Number(item.price) * item.quantity), 
    0
  );

  const itemCount = cartItems.reduce(
    (count, item) => count + item.quantity, 
    0
  );

  const handleCheckout = () => {
    if (!isAuthenticated) {
      dispatch({
        type: 'toast/showToast',
        payload: {
          message: CART_MESSAGES.AUTH_REQUIRED,
          type: 'warning',
          duration: 5000,
        },
      });
      navigate.navigate('/auth');
      return;
    }

    clearCart();
    dispatch({
      type: 'orders/addOrder',
      payload: {
        id: Date.now(),
        date: new Date().toISOString(),
        items: cartItems,
        total: total.toFixed(2),
        status: 'Beklemede',
      },
    });
    dispatch({
      type: 'toast/showToast',
      payload: {
        message: CART_MESSAGES.ORDER_SUCCESS,
        type: 'success',
        duration: 3000,
      },
    });
    navigate.navigate('/orders');
  };

  return {
    items: cartItems,
    total,
    itemCount,
    isAuthenticated,
    updateQuantity,
    removeItem,
    clearCart,
    handleCheckout,
  };
}; 