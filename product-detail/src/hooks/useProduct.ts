import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import type { RootState } from '../../../container/src/store';
import type { UseProductReturn } from '../types/hooks';

export const useProduct = (): UseProductReturn => {
  const { id } = useParams<{ id: string }>();
  const product = useSelector((state: RootState) => 
    state.products.products.find(p => p.id === Number(id))
  );
  const isLoading = useSelector((state: RootState) => state.products.loading);
  const error = useSelector((state: RootState) => state.products.error);

  return {
    product,
    isLoading,
    error,
  };
}; 