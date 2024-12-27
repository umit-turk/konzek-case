import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../../container/src/store';
import { fetchProducts } from '../../../container/src/store/slices/productSlice';
import { addItem } from '../../../container/src/store/slices/cartSlice';
import { showToast } from '../../../container/src/store/slices/toastSlice';
import { useProductFilters } from '../hooks/useProductFilters';
import ProductFilters from './ProductFilters';
import ProductGrid from './ProductGrid';

const ProductList: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state: RootState) => state.products);
  const { items: cartItems } = useSelector((state: RootState) => state.cart);

  const {
    filters,
    filteredProducts,
    handleSearchChange,
    handleMinPriceChange,
    handleMaxPriceChange,
    handleSortChange,
    handleClearFilters
  } = useProductFilters({ products });

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddToCart = useCallback((product) => {
    dispatch(addItem(product));
    dispatch(showToast({ 
      message: `${product.name} sepete eklendi`, 
      type: 'success',
      duration: 2000 
    }));
  }, [dispatch]);

  const handleProductClick = useCallback((product) => {
    navigate(`/product/${product.id}`);
  }, [navigate]);

  

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="h-48 bg-gray-200 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>Ürünler yüklenirken bir hata oluştu.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Ürünler</h1>
      
      <ProductFilters
        search={filters.search}
        minPrice={filters.minPrice}
        maxPrice={filters.maxPrice}
        sortBy={filters.sortBy}
        onSearchChange={handleSearchChange}
        onMinPriceChange={handleMinPriceChange}
        onMaxPriceChange={handleMaxPriceChange}
        onSortChange={handleSortChange}
        onClearFilters={handleClearFilters}
      />

      <ProductGrid
        products={filteredProducts}
        cartItems={cartItems}
        onAddToCart={handleAddToCart}
        onProductClick={handleProductClick}
        isLoading={loading}
      />
    </div>
  );
};

export default ProductList; 