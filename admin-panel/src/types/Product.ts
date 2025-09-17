export interface Product {
  id?: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: 'women' | 'men' | 'kids' | 'accessories';
  images: string[];
  description: string;
  sizes?: string[];
  colors?: string[];
  inStock: boolean;
  isNew?: boolean;
  isSale?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Order {
  id?: string;
  customerName: string;
  customerPhone: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: Date;
  updatedAt?: Date;
}

export interface OrderItem {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface User {
  id: string;
  email: string;
  role: 'admin' | 'customer';
  createdAt: Date;
  updatedAt?: Date;
}