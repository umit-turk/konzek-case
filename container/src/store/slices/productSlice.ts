import { createSlice } from '@reduxjs/toolkit';
import type { ProductState } from '../../types/index';
import { mockProducts } from '../../utils/mockData';

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