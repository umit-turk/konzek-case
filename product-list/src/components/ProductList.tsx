import React, { memo, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useProducts } from '../hooks/useProducts';
import { LoadingSpinner } from './LoadingSpinner';
import type { RootState } from '../../../container/src/store';
import ProductFilters from './ProductFilters';
import ProductCard from './ProductCard';

const ProductList: React.FC = memo(() => {
  const navigate = useNavigate();
  const { products, isLoading, error } = useProducts();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  // Filtreleme state'leri
  const [search, setSearch] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortBy, setSortBy] = useState('name-asc');

  // Filtreleri temizle
  const handleClearFilters = useCallback(() => {
    setSearch('');
    setMinPrice('');
    setMaxPrice('');
    setSortBy('name-asc');
  }, []);

  // Filtrelenmiş ürünleri hesapla
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase()) ||
                         product.description.toLowerCase().includes(search.toLowerCase());
    const matchesMinPrice = !minPrice || product.price >= Number(minPrice);
    const matchesMaxPrice = !maxPrice || product.price <= Number(maxPrice);

    return matchesSearch && matchesMinPrice && matchesMaxPrice;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'name-asc':
        return a.name.localeCompare(b.name);
      case 'name-desc':
        return b.name.localeCompare(a.name);
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      default:
        return 0;
    }
  });

  const handleProductClick = useCallback((productId: number) => {
    navigate(`/product/${productId}`);
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <p className="text-red-600 text-xl">
            {error}
          </p>
        </div>
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <p className="text-gray-500 text-xl">
            Ürün bulunamadı
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-10">
          Ürünlerimiz
        </h1>
        <ProductFilters 
          search={search}
          minPrice={minPrice}
          maxPrice={maxPrice}
          sortBy={sortBy}
          onSearchChange={setSearch}
          onMinPriceChange={setMinPrice}
          onMaxPriceChange={setMaxPrice}
          onSortByChange={setSortBy}
          onClearFilters={handleClearFilters}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              cartItem={cartItems.find(item => item.id === product.id)}
              onProductClick={handleProductClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
});

export default ProductList;
