import type { Product } from '../../../container/src/types/index';

export interface ProductCardProps {
  product: Product;
  onProductClick: (productId: number) => void;
}

export interface ProductListProps {
  products: Product[];
  onProductClick: (productId: number) => void;
}

export interface UseProductsReturn {
  products: Product[];
  isLoading: boolean;
  error: string | null;
} 