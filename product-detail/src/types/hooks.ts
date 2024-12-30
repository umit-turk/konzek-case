import type { Product } from '../../../container/src/types/index';

export interface UseProductReturn {
  product: Product | undefined;
  isLoading: boolean;
  error: string | null;
}

export interface UseCartReturn {
  addToCart: (product: Product) => void;
  isInCart: (productId: number) => boolean;
  getQuantity: (productId: number) => number;
} 