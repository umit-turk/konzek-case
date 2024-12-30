import { useSelector } from 'react-redux';
import type { RootState } from '../../../container/src/store';
import type { UseOrdersReturn } from '../types';

export const useOrders = (): UseOrdersReturn => {
  const orders = useSelector((state: RootState) => state.orders.orders);
  const isLoading = useSelector((state: RootState) => state.orders.loading);
  const error = useSelector((state: RootState) => state.orders.error);

  return {
    orders,
    isLoading,
    error,
  };
}; 