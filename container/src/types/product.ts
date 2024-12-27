export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

export interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
} 