

import type { Product, CartItem } from '../../../container/src/types/index';

export interface ProductCardProps {
  product: Product;
  cartItem?: CartItem;
  onAddToCart: (product: Product) => void;
  onProductClick: (product: Product) => void;
  isLoading?: boolean;
}

export interface ProductGridProps {
  products: Product[];
  cartItems: CartItem[];
  onAddToCart: (product: Product) => void;
  onProductClick: (product: Product) => void;
  isLoading?: boolean;
}

export interface ProductFiltersProps {
  filters: {
    search: string;
    minPrice: string;
    maxPrice: string;
    sortBy: 'name' | 'price_asc' | 'price_desc';
  };
  onSearchChange: (search: string) => void;
  onMinPriceChange: (minPrice: string) => void;
  onMaxPriceChange: (maxPrice: string) => void;
  onSortChange: (sortBy: 'name' | 'price_asc' | 'price_desc') => void;
  onClearFilters: () => void;
} 