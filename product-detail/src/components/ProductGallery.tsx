import React, { memo } from 'react';

interface ProductGalleryProps {
  images: string[];
}

export const ProductGallery: React.FC<ProductGalleryProps> = memo(({ images }) => {
  return (
    <div className="aspect-square">
      <img
        src={images[0]}
        alt="Ürün"
        className="product-image"
      />
    </div>
  );
}); 