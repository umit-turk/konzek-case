import React, { memo } from 'react';
import { useProduct } from '../hooks/useProduct';
import { ProductGallery } from './ProductGallery';
import { ProductInfo } from './ProductInfo';
import { ProductActions } from './ProductActions';
import { LoadingSpinner } from './LoadingSpinner';

const ProductDetail: React.FC = memo(() => {
  const { product, isLoading } = useProduct();

  if (isLoading) {
    return (
      <div className="flex-center min-h-[400px]">
        <LoadingSpinner />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="card p-6 text-center">
          <p className="text-xl text-text-secondary">
            Ürün bulunamadı
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="card">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
          <ProductGallery images={[product.image]} />
          <div className="space-y-6">
            <ProductInfo product={product} />
            <ProductActions product={product} />
          </div>
        </div>
      </div>
    </div>
  );
});

export default ProductDetail;