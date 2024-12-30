import type { CartItem } from '../../../container/src/types/index';

export interface CartItemProps {
  item: CartItem;
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
}

export interface CartListProps {
  items: CartItem[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
  isLoading?: boolean;
}

export interface CartSummaryProps {
  items: CartItem[];
  onCheckout: () => void;
  isAuthenticated: boolean;
  isLoading?: boolean;
}

export interface EmptyCartProps {
  onStartShopping: () => void;
}

export interface QuantityInputProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  disabled?: boolean;
} 