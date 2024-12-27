import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { OrderState, Order } from '../../types/index';


const initialState: OrderState = {
    orders: [],
    loading: false,
    error: null,
};

const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        addOrder: (state, action: PayloadAction<Order>) => {
            state.orders.push(action.payload);
        },
        updateOrderStatus: (state, action: PayloadAction<{ id: number; status: Order['status'] }>) => {
            const order = state.orders.find(order => order.id === action.payload.id);
            if (order) {
                order.status = action.payload.status;
            }
        },
    },
});

export const { addOrder, updateOrderStatus } = orderSlice.actions;
export default orderSlice.reducer; 