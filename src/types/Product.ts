export interface Product {
  id: string;
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
}