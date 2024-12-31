import React from 'react';
import { MagnifyingGlassIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';

interface ProductFiltersProps {
  search: string;
  minPrice: string;
  maxPrice: string;
  sortBy: string;
  onSearchChange: (value: string) => void;
  onMinPriceChange: (value: string) => void;
  onMaxPriceChange: (value: string) => void;
  onSortByChange: (value: string) => void;
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
  onSortByChange,
  onClearFilters,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      {/* Arama ve Temizle */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            id="search"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Ürün adı veya açıklama ile ara..."
          />
        </div>
        <button
          onClick={onClearFilters}
          className="px-6 py-2.5 bg-gray-50 hover:bg-gray-100 text-gray-600 rounded-lg border border-gray-200 transition-colors duration-200 flex items-center justify-center gap-2 min-w-[140px]"
        >
          <AdjustmentsHorizontalIcon className="h-5 w-5" />
          Filtreleri Temizle
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Fiyat Aralığı */}
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            Fiyat Aralığı
          </label>
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <input
                type="number"
                id="minPrice"
                value={minPrice}
                onChange={(e) => onMinPriceChange(e.target.value)}
                className="block w-full pl-3 pr-8 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Min"
                min="0"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">₺</span>
            </div>
            <span className="text-gray-400">-</span>
            <div className="relative flex-1">
              <input
                type="number"
                id="maxPrice"
                value={maxPrice}
                onChange={(e) => onMaxPriceChange(e.target.value)}
                className="block w-full pl-3 pr-8 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Maks"
                min="0"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">₺</span>
            </div>
          </div>
        </div>

        {/* Sıralama */}
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-4">
            Sıralama
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {[
              { value: 'name-asc', label: 'İsim (A-Z)' },
              { value: 'name-desc', label: 'İsim (Z-A)' },
              { value: 'price-asc', label: 'En Düşük Fiyat' },
              { value: 'price-desc', label: 'En Yüksek Fiyat' },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => onSortByChange(option.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  sortBy === option.value
                    ? 'bg-blue-50 text-blue-600 border-2 border-blue-200'
                    : 'bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFilters; 