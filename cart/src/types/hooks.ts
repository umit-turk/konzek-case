import type { CartItem } from '../../../container/src/store/slices/cartSlice';

export interface UseCartReturn {
  items: CartItem[];
  total: number;
  itemCount: number;
  isAuthenticated: boolean;
  updateQuantity: (id: number, quantity: number) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
  handleCheckout: () => void;
}

export interface UseCartValidationReturn {
  validateQuantity: (quantity: number) => boolean;
  validateStock: (itemId: number, quantity: number) => boolean;
  errors: {
    quantity?: string;
    stock?: string;
  };
} 