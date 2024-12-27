import type { CartItem } from '../../../container/src/types/index';

export interface UseCartReturn {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
}

export interface UseCartValidationReturn {
  validateQuantity: (quantity: number) => boolean;
  validateStock: (itemId: number, quantity: number) => boolean;
  errors: {
    quantity?: string;
    stock?: string;
  };
} 