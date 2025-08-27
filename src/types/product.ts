export interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  image: string;
  description: string;
  category: string;
  size: string;
  inStock: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}