import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, ArrowRight } from 'lucide-react';
import { Product } from '../types/Product';
import { categoryThemes } from '../utils/categoryThemes';

interface ProductCardProps {
  product: Product;
  darkMode?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, darkMode = false }) => {
  const theme = categoryThemes[product.category];

  return (
    <div className={`group relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      {/* Product Image */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <img 
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-110"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.isNew && (
            <span className="px-3 py-1 bg-gradient-to-r from-amber-400 to-yellow-500 text-black text-xs font-medium rounded-full">
              NEW
            </span>
          )}
          {product.isSale && (
            <span className="px-3 py-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-medium rounded-full">
              SALE
            </span>
          )}
        </div>

        {/* Quick Actions */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-8 group-hover:translate-x-0">
          <button className="p-2 bg-white/90 hover:bg-white rounded-full shadow-lg backdrop-blur-sm transition-all duration-300">
            <Heart className="w-4 h-4 text-gray-700" />
          </button>
          <button className="p-2 bg-white/90 hover:bg-white rounded-full shadow-lg backdrop-blur-sm transition-all duration-300">
            <ShoppingBag className="w-4 h-4 text-gray-700" />
          </button>
        </div>

        {/* Category Color Strip */}
        <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${theme.accent} opacity-0 group-hover:opacity-100 transition-all duration-300`}></div>
      </div>

      {/* Product Info */}
      <div className="p-6">
        <Link to={`/product/${product.id}`}>
          <h3 className={`text-lg font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-900'} group-hover:${theme.text} transition-colors duration-300`}>
            {product.name}
          </h3>
        </Link>
        
        <div className="flex items-center gap-3 mb-4">
          <span className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            ₹{product.price.toLocaleString('en-IN')}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through">
              ₹{product.originalPrice.toLocaleString('en-IN')}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <Link 
          to={`/product/${product.id}`}
          className={`w-full py-3 px-4 ${theme.button} text-white text-center rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2`}
        >
          View Details
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;