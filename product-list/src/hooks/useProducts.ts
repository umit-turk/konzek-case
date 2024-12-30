import { useSelector } from 'react-redux';
import type { RootState } from '../../../container/src/store';
import type { UseProductsReturn } from '../types';

export const useProducts = (): UseProductsReturn => {
  const products = useSelector((state: RootState) => state.products.products);
  const isLoading = useSelector((state: RootState) => state.products.loading);
  const error = useSelector((state: RootState) => state.products.error);

  return {
    products,
    isLoading,
    error,
  };
}; 