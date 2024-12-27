import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { ToastState } from '../../types/index';

const initialState: ToastState = {
  isVisible: false,
  message: '',
  type: 'info',
  duration: 3000
};

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    showToast: (state, action: PayloadAction<Omit<ToastState, 'isVisible'>>) => {
      state.isVisible = true;
      state.message = action.payload.message;
      state.type = action.payload.type;
      state.duration = action.payload.duration;
    },
    hideToast: (state) => {
      state.isVisible = false;
    }
  }
});

export const { showToast, hideToast } = toastSlice.actions;
export default toastSlice.reducer; 