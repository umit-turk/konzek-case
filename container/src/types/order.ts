export interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: number;
  date: string;
  items: OrderItem[];
  total: number;
  status: 'Beklemede' | 'Onaylandı' | 'Kargoda' | 'Tamamlandı';
}

export interface OrderState {
  orders: Order[];
  loading: boolean;
  error: string | null;
} 