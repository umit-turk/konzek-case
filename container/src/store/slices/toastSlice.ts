import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ToastState {
  isVisible: boolean;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration: number;
}

const initialState: ToastState = {
  isVisible: false,
  message: '',
  type: 'info',
  duration: 3000,
};

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    showToast: (state, action: PayloadAction<{ message: string; type?: ToastState['type']; duration?: number }>) => {
      state.isVisible = true;
      state.message = action.payload.message;
      state.type = action.payload.type || 'info';
      state.duration = action.payload.duration || 3000;
    },
    hideToast: (state) => {
      state.isVisible = false;
    },
  },
});

export const { showToast, hideToast } = toastSlice.actions;
export default toastSlice.reducer; 