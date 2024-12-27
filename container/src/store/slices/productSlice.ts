import { createSlice } from '@reduxjs/toolkit';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

const mockProducts: Product[] = [
  {
    id: 1,
    name: "iPhone 14 Pro",
    description: "Apple'ın en yeni amiral gemisi telefonu",
    price: 42999,
    image: "https://picsum.photos/400/300"
  },
  {
    id: 2,
    name: "MacBook Pro M2",
    description: "16 inç Retina ekran, M2 Pro çip",
    price: 72999,
    image: "https://picsum.photos/400/301"
  },
  {
    id: 3,
    name: "iPad Air",
    description: "10.9 inç Liquid Retina ekran",
    price: 19999,
    image: "https://picsum.photos/400/302"
  },
  {
    id: 4,
    name: "AirPods Pro",
    description: "Aktif gürültü önleme özellikli kablosuz kulaklık",
    price: 7999,
    image: "https://picsum.photos/400/303"
  },
  {
    id: 5,
    name: "Apple Watch Series 8",
    description: "Gelişmiş sağlık özellikleri",
    price: 12999,
    image: "https://picsum.photos/400/304"
  },
  {
    id: 6,
    name: "iMac 24",
    description: "M1 çipli, 4.5K Retina ekran",
    price: 39999,
    image: "https://picsum.photos/400/305"
  }
];

export interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: mockProducts,
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    fetchProducts: (state) => {
      state.products = mockProducts;
      state.loading = false;
      state.error = null;
    }
  }
});

export const { fetchProducts } = productSlice.actions;
export default productSlice.reducer; 