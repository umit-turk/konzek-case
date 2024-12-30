import type { Order } from '../../../container/src/types/index';

export interface UseOrdersReturn {
  orders: Order[];
  isLoading: boolean;
  error: string | null;
} 