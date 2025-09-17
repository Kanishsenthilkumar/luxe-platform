import { Product } from '../types/Product';

export const products: Product[] = [
  // Women's Collection (Rose Gold Theme)
  {
    id: 'w1',
    name: 'Silk Evening Gown',
    price: 24999,
    originalPrice: 29999,
    category: 'women',
    images: [
      'https://images.pexels.com/photos/1721558/pexels-photo-1721558.jpeg',
      'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg'
    ],
    description: 'Elegant silk evening gown with intricate beadwork',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black', 'Navy', 'Burgundy'],
    inStock: true,
    isSale: true
  },
  {
    id: 'w2',
    name: 'Designer Blazer',
    price: 18999,
    category: 'women',
    images: [
      'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg',
      'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg'
    ],
    description: 'Tailored blazer in premium wool blend',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black', 'Grey', 'Navy'],
    inStock: true,
    isNew: true
  },
  {
    id: 'w3',
    name: 'Cashmere Sweater',
    price: 15999,
    category: 'women',
    images: [
      'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg',
      'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg'
    ],
    description: 'Luxurious cashmere sweater with ribbed details',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Cream', 'Black', 'Camel'],
    inStock: true
  },
  {
    id: 'w4',
    name: 'Silk Midi Dress',
    price: 12999,
    category: 'women',
    images: [
      'https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg',
      'https://images.pexels.com/photos/1721558/pexels-photo-1721558.jpeg'
    ],
    description: 'Flowing silk midi dress with delicate print',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Rose', 'Navy', 'Emerald'],
    inStock: true
  },
  {
    id: 'w5',
    name: 'Leather Trench Coat',
    price: 35999,
    category: 'women',
    images: [
      'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg',
      'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg'
    ],
    description: 'Premium leather trench coat with modern cut',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black', 'Tan', 'Brown'],
    inStock: true
  },
  {
    id: 'w6',
    name: 'Embellished Top',
    price: 8999,
    category: 'women',
    images: [
      'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg',
      'https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg'
    ],
    description: 'Sequined top perfect for evening occasions',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Gold', 'Silver', 'Rose Gold'],
    inStock: true
  },
  {
    id: 'w7',
    name: 'Wide Leg Trousers',
    price: 11999,
    category: 'women',
    images: [
      'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg',
      'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg'
    ],
    description: 'High-waisted wide leg trousers in luxe fabric',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black', 'Navy', 'Charcoal'],
    inStock: true
  },
  {
    id: 'w8',
    name: 'Satin Slip Dress',
    price: 9999,
    category: 'women',
    images: [
      'https://images.pexels.com/photos/1721558/pexels-photo-1721558.jpeg',
      'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg'
    ],
    description: 'Minimalist satin slip dress with adjustable straps',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Champagne', 'Black', 'Blush'],
    inStock: true
  },
  {
    id: 'w9',
    name: 'Wool Coat',
    price: 28999,
    category: 'women',
    images: [
      'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg',
      'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg'
    ],
    description: 'Classic wool coat with timeless silhouette',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Camel', 'Black', 'Grey'],
    inStock: true
  },
  {
    id: 'w10',
    name: 'Designer Jumpsuit',
    price: 16999,
    category: 'women',
    images: [
      'https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg',
      'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg'
    ],
    description: 'Sophisticated jumpsuit with tailored fit',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black', 'Navy', 'Burgundy'],
    inStock: true
  },

  // Men's Collection (Metallic Silver Theme)
  {
    id: 'm1',
    name: 'Italian Suit',
    price: 45999,
    category: 'men',
    images: [
      'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg',
      'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg'
    ],
    description: 'Hand-tailored Italian wool suit',
    sizes: ['38', '40', '42', '44', '46', '48'],
    colors: ['Charcoal', 'Navy', 'Black'],
    inStock: true
  },
  {
    id: 'm2',
    name: 'Cashmere Overcoat',
    price: 32999,
    category: 'men',
    images: [
      'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg',
      'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg'
    ],
    description: 'Luxurious cashmere overcoat for formal occasions',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Charcoal', 'Camel', 'Navy'],
    inStock: true
  },
  {
    id: 'm3',
    name: 'Silk Dress Shirt',
    price: 8999,
    category: 'men',
    images: [
      'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg',
      'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg'
    ],
    description: 'Premium silk dress shirt with mother-of-pearl buttons',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['White', 'Light Blue', 'Cream'],
    inStock: true
  },
  {
    id: 'm4',
    name: 'Wool Turtleneck',
    price: 12999,
    category: 'men',
    images: [
      'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg',
      'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg'
    ],
    description: 'Fine merino wool turtleneck sweater',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'Grey', 'Navy'],
    inStock: true
  },
  {
    id: 'm5',
    name: 'Leather Jacket',
    price: 25999,
    category: 'men',
    images: [
      'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg',
      'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg'
    ],
    description: 'Classic leather jacket with modern details',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'Brown', 'Cognac'],
    inStock: true
  },
  {
    id: 'm6',
    name: 'Formal Trousers',
    price: 9999,
    category: 'men',
    images: [
      'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg',
      'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg'
    ],
    description: 'Tailored formal trousers in premium fabric',
    sizes: ['30', '32', '34', '36', '38', '40'],
    colors: ['Charcoal', 'Navy', 'Black'],
    inStock: true
  },
  {
    id: 'm7',
    name: 'Cashmere Scarf',
    price: 5999,
    category: 'men',
    images: [
      'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg',
      'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg'
    ],
    description: 'Soft cashmere scarf with subtle pattern',
    sizes: ['One Size'],
    colors: ['Grey', 'Navy', 'Burgundy'],
    inStock: true
  },
  {
    id: 'm8',
    name: 'Polo Shirt',
    price: 6999,
    category: 'men',
    images: [
      'https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg',
      'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg'
    ],
    description: 'Premium cotton polo with refined collar',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['White', 'Navy', 'Grey'],
    inStock: true
  },
  {
    id: 'm9',
    name: 'Dress Shoes',
    price: 19999,
    category: 'men',
    images: [
      'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg',
      'https://images.pexels.com/photos/1598508/pexels-photo-1598508.jpeg'
    ],
    description: 'Handcrafted leather dress shoes',
    sizes: ['7', '8', '9', '10', '11', '12'],
    colors: ['Black', 'Brown', 'Cognac'],
    inStock: true
  },
  {
    id: 'm10',
    name: 'Luxury Watch',
    price: 89999,
    category: 'men',
    images: [
      'https://images.pexels.com/photos/1697214/pexels-photo-1697214.jpeg',
      'https://images.pexels.com/photos/1697215/pexels-photo-1697215.jpeg'
    ],
    description: 'Swiss-made luxury timepiece with leather strap',
    sizes: ['One Size'],
    colors: ['Gold', 'Silver', 'Rose Gold'],
    inStock: true
  },

  // Kids Collection (Champagne Theme)
  {
    id: 'k1',
    name: 'Designer Dress',
    price: 4999,
    category: 'kids',
    images: [
      'https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg',
      'https://images.pexels.com/photos/1721558/pexels-photo-1721558.jpeg'
    ],
    description: 'Adorable designer dress for special occasions',
    sizes: ['2T', '3T', '4T', '5T', '6T'],
    colors: ['Pink', 'White', 'Lavender'],
    inStock: true
  },
  {
    id: 'k2',
    name: 'Formal Suit Set',
    price: 7999,
    category: 'kids',
    images: [
      'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg',
      'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg'
    ],
    description: 'Three-piece formal suit for young gentlemen',
    sizes: ['2T', '3T', '4T', '5T', '6T'],
    colors: ['Navy', 'Black', 'Grey'],
    inStock: true
  },
  {
    id: 'k3',
    name: 'Cashmere Cardigan',
    price: 5999,
    category: 'kids',
    images: [
      'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg',
      'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg'
    ],
    description: 'Soft cashmere cardigan with pearl buttons',
    sizes: ['2T', '3T', '4T', '5T', '6T'],
    colors: ['Cream', 'Pink', 'Blue'],
    inStock: true
  },
  {
    id: 'k4',
    name: 'Party Dress',
    price: 6999,
    category: 'kids',
    images: [
      'https://images.pexels.com/photos/1721558/pexels-photo-1721558.jpeg',
      'https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg'
    ],
    description: 'Sparkly party dress with tulle skirt',
    sizes: ['2T', '3T', '4T', '5T', '6T'],
    colors: ['Gold', 'Silver', 'Rose'],
    inStock: true
  },
  {
    id: 'k5',
    name: 'Wool Coat',
    price: 8999,
    category: 'kids',
    images: [
      'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg',
      'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg'
    ],
    description: 'Elegant wool coat for winter occasions',
    sizes: ['2T', '3T', '4T', '5T', '6T'],
    colors: ['Navy', 'Camel', 'Red'],
    inStock: true
  },
  {
    id: 'k6',
    name: 'Silk Blouse',
    price: 3999,
    category: 'kids',
    images: [
      'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg',
      'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg'
    ],
    description: 'Delicate silk blouse with bow details',
    sizes: ['2T', '3T', '4T', '5T', '6T'],
    colors: ['White', 'Pink', 'Cream'],
    inStock: true
  },
  {
    id: 'k7',
    name: 'Designer Jeans',
    price: 4499,
    category: 'kids',
    images: [
      'https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg',
      'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg'
    ],
    description: 'Premium denim jeans with embroidered details',
    sizes: ['2T', '3T', '4T', '5T', '6T'],
    colors: ['Blue', 'Black', 'White'],
    inStock: true
  },
  {
    id: 'k8',
    name: 'Knit Sweater',
    price: 3999,
    category: 'kids',
    images: [
      'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg',
      'https://images.pexels.com/photos/1721558/pexels-photo-1721558.jpeg'
    ],
    description: 'Cozy knit sweater with playful patterns',
    sizes: ['2T', '3T', '4T', '5T', '6T'],
    colors: ['Pink', 'Blue', 'Yellow'],
    inStock: true
  },
  {
    id: 'k9',
    name: 'Formal Shoes',
    price: 5999,
    category: 'kids',
    images: [
      'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg',
      'https://images.pexels.com/photos/1598508/pexels-photo-1598508.jpeg'
    ],
    description: 'Polished formal shoes for special events',
    sizes: ['8', '9', '10', '11', '12', '13'],
    colors: ['Black', 'Brown'],
    inStock: true
  },
  {
    id: 'k10',
    name: 'Summer Dress',
    price: 3499,
    category: 'kids',
    images: [
      'https://images.pexels.com/photos/1721558/pexels-photo-1721558.jpeg',
      'https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg'
    ],
    description: 'Light summer dress with floral prints',
    sizes: ['2T', '3T', '4T', '5T', '6T'],
    colors: ['Floral', 'Dots', 'Stripes'],
    inStock: true
  },

  // Accessories Collection (Burgundy + Gold Theme)
  {
    id: 'a1',
    name: 'Leather Handbag',
    price: 22999,
    category: 'accessories',
    images: [
      'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg',
      'https://images.pexels.com/photos/1697214/pexels-photo-1697214.jpeg'
    ],
    description: 'Premium leather handbag with gold hardware',
    sizes: ['One Size'],
    colors: ['Black', 'Brown', 'Burgundy'],
    inStock: true
  },
  {
    id: 'a2',
    name: 'Diamond Earrings',
    price: 45999,
    category: 'accessories',
    images: [
      'https://images.pexels.com/photos/1697214/pexels-photo-1697214.jpeg',
      'https://images.pexels.com/photos/1697215/pexels-photo-1697215.jpeg'
    ],
    description: 'Elegant diamond stud earrings in 18k gold',
    sizes: ['One Size'],
    colors: ['Gold', 'White Gold', 'Rose Gold'],
    inStock: true
  },
  {
    id: 'a3',
    name: 'Silk Scarf',
    price: 7999,
    category: 'accessories',
    images: [
      'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg',
      'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg'
    ],
    description: 'Hand-printed silk scarf with artistic design',
    sizes: ['One Size'],
    colors: ['Burgundy', 'Navy', 'Emerald'],
    inStock: true
  },
  {
    id: 'a4',
    name: 'Designer Sunglasses',
    price: 15999,
    category: 'accessories',
    images: [
      'https://images.pexels.com/photos/1697214/pexels-photo-1697214.jpeg',
      'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg'
    ],
    description: 'Luxury sunglasses with UV protection',
    sizes: ['One Size'],
    colors: ['Black', 'Tortoise', 'Gold'],
    inStock: true
  },
  {
    id: 'a5',
    name: 'Pearl Necklace',
    price: 35999,
    category: 'accessories',
    images: [
      'https://images.pexels.com/photos/1697215/pexels-photo-1697215.jpeg',
      'https://images.pexels.com/photos/1697214/pexels-photo-1697214.jpeg'
    ],
    description: 'Cultured pearl necklace with gold clasp',
    sizes: ['One Size'],
    colors: ['White', 'Cream', 'Grey'],
    inStock: true
  },
  {
    id: 'a6',
    name: 'Leather Belt',
    price: 8999,
    category: 'accessories',
    images: [
      'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg',
      'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg'
    ],
    description: 'Handcrafted leather belt with gold buckle',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Brown', 'Tan'],
    inStock: true
  },
  {
    id: 'a7',
    name: 'Designer Wallet',
    price: 12999,
    category: 'accessories',
    images: [
      'https://images.pexels.com/photos/1598508/pexels-photo-1598508.jpeg',
      'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg'
    ],
    description: 'Luxury leather wallet with multiple compartments',
    sizes: ['One Size'],
    colors: ['Black', 'Brown', 'Navy'],
    inStock: true
  },
  {
    id: 'a8',
    name: 'Gold Bracelet',
    price: 25999,
    category: 'accessories',
    images: [
      'https://images.pexels.com/photos/1697214/pexels-photo-1697214.jpeg',
      'https://images.pexels.com/photos/1697215/pexels-photo-1697215.jpeg'
    ],
    description: '18k gold bracelet with intricate design',
    sizes: ['One Size'],
    colors: ['Gold', 'Rose Gold', 'White Gold'],
    inStock: true
  },
  {
    id: 'a9',
    name: 'Silk Tie',
    price: 4999,
    category: 'accessories',
    images: [
      'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg',
    ]
  }
]
// This file is now deprecated - products are managed through Firebase
// Use the useProducts hook or productsService to fetch products from Firestore

import { Product } from '../types/Product';

// Keep this for initial data seeding if needed
export const sampleProducts: Product[] = [];