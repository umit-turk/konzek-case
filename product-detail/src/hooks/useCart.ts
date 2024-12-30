import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../../../container/src/store/slices/cartSlice';
import { showToast } from '../../../container/src/store/slices/toastSlice';
import type { RootState } from '../../../container/src/store';
import type { Product } from '../../../container/src/types/index';
import type { UseCartReturn } from '../types/hooks';

export const useCart = (): UseCartReturn => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const addToCart = useCallback((product: Product) => {
    dispatch(addItem(product));
    dispatch(showToast({
      message: `${product.name} sepete eklendi`,
      type: 'success',
      duration: 2000,
    }));
  }, [dispatch]);

  const isInCart = useCallback((productId: number) => {
    return cartItems.some(item => item.id === productId);
  }, [cartItems]);

  const getQuantity = useCallback((productId: number) => {
    const item = cartItems.find(item => item.id === productId);
    return item?.quantity || 0;
  }, [cartItems]);

  return {
    addToCart,
    isInCart,
    getQuantity,
  };
}; 