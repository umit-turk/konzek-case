import { useState, useMemo } from 'react';
import type { Product } from '../../../container/src/types/index';

interface UseProductFiltersProps {
  products: Product[];
}

interface Filters {
  search: string;
  minPrice: string;
  maxPrice: string;
  sortBy: 'name' | 'price_asc' | 'price_desc';
}

export const useProductFilters = ({ products }: UseProductFiltersProps) => {
  const [filters, setFilters] = useState<Filters>({
    search: '',
    minPrice: '',
    maxPrice: '',
    sortBy: 'name'
  });

  const filteredProducts = useMemo(() => {
    return products
      .filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                            product.description.toLowerCase().includes(filters.search.toLowerCase());
        
        const matchesMinPrice = !filters.minPrice || product.price >= Number(filters.minPrice);
        const matchesMaxPrice = !filters.maxPrice || product.price <= Number(filters.maxPrice);

        return matchesSearch && matchesMinPrice && matchesMaxPrice;
      })
      .sort((a, b) => {
        switch (filters.sortBy) {
          case 'price_asc':
            return a.price - b.price;
          case 'price_desc':
            return b.price - a.price;
          case 'name':
          default:
            return a.name.localeCompare(b.name);
        }
      });
  }, [products, filters]);

  const handleSearchChange = (search: string) => {
    setFilters(prev => ({ ...prev, search }));
  };

  const handleMinPriceChange = (minPrice: string) => {
    setFilters(prev => ({ ...prev, minPrice }));
  };

  const handleMaxPriceChange = (maxPrice: string) => {
    setFilters(prev => ({ ...prev, maxPrice }));
  };

  const handleSortChange = (sortBy: Filters['sortBy']) => {
    setFilters(prev => ({ ...prev, sortBy }));
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      minPrice: '',
      maxPrice: '',
      sortBy: 'name'
    });
  };

  return {
    filters,
    filteredProducts,
    handleSearchChange,
    handleMinPriceChange,
    handleMaxPriceChange,
    handleSortChange,
    handleClearFilters
  };
}; 