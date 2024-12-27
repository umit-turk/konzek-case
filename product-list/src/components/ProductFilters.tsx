import React from 'react';

interface ProductFiltersProps {
  search: string;
  minPrice: string;
  maxPrice: string;
  sortBy: 'name' | 'price_asc' | 'price_desc';
  onSearchChange: (search: string) => void;
  onMinPriceChange: (minPrice: string) => void;
  onMaxPriceChange: (maxPrice: string) => void;
  onSortChange: (sortBy: 'name' | 'price_asc' | 'price_desc') => void;
  onClearFilters: () => void;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
  search,
  minPrice,
  maxPrice,
  sortBy,
  onSearchChange,
  onMinPriceChange,
  onMaxPriceChange,
  onSortChange,
  onClearFilters,
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Arama */}
        <div className="flex flex-col">
          <label htmlFor="search" className="text-sm font-medium text-gray-700 mb-1">
            Ürün Ara
          </label>
          <input
            type="text"
            id="search"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Ürün adı veya açıklama..."
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-main focus:border-transparent"
          />
        </div>

        {/* Minimum Fiyat */}
        <div className="flex flex-col">
          <label htmlFor="minPrice" className="text-sm font-medium text-gray-700 mb-1">
            Minimum Fiyat
          </label>
          <input
            type="number"
            id="minPrice"
            value={minPrice}
            onChange={(e) => onMinPriceChange(e.target.value)}
            placeholder="0"
            min="0"
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-main focus:border-transparent"
          />
        </div>

        {/* Maximum Fiyat */}
        <div className="flex flex-col">
          <label htmlFor="maxPrice" className="text-sm font-medium text-gray-700 mb-1">
            Maximum Fiyat
          </label>
          <input
            type="number"
            id="maxPrice"
            value={maxPrice}
            onChange={(e) => onMaxPriceChange(e.target.value)}
            placeholder="999999"
            min="0"
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-main focus:border-transparent"
          />
        </div>

        {/* Sıralama */}
        <div className="flex flex-col">
          <label htmlFor="sortBy" className="text-sm font-medium text-gray-700 mb-1">
            Sıralama
          </label>
          <select
            id="sortBy"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as 'name' | 'price_asc' | 'price_desc')}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-main focus:border-transparent"
          >
            <option value="name">İsme Göre</option>
            <option value="price_asc">Fiyat (Artan)</option>
            <option value="price_desc">Fiyat (Azalan)</option>
          </select>
        </div>
        {/* Filtreleri Temizle */}
        <div className="flex flex-col">
          <label htmlFor="clearFilters" className="text-sm font-medium text-gray-700 mb-1">
            Filtreleri Temizle
          </label>
          <button onClick={onClearFilters} className="btn-primary py-2">Temizle</button>
        </div>
      </div>
    </div>
  );
};

export default ProductFilters; 