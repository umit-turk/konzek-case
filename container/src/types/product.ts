export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  stock: number;
}

export interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
} 