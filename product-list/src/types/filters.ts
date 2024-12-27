import type { Product } from '../../../container/src/types/index';

export type SortOption = 'name' | 'price_asc' | 'price_desc';

export interface Filters {
  search: string;
  minPrice: string;
  maxPrice: string;
  sortBy: SortOption;
}

export interface UseProductFiltersProps {
  products: Product[];
}

export interface UseProductFiltersReturn {
  filters: Filters;
  filteredProducts: Product[];
  handleSearchChange: (search: string) => void;
  handleMinPriceChange: (minPrice: string) => void;
  handleMaxPriceChange: (maxPrice: string) => void;
  handleSortChange: (sortBy: SortOption) => void;
  handleClearFilters: () => void;
} 