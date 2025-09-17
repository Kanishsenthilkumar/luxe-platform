import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Search, Menu } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Header: React.FC = () => {
  const { state } = useCart();

  return (
    <header className="bg-black text-white shadow-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-rose-400 to-amber-400 bg-clip-text text-transparent">
            LUXE
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/category/women" className="hover:text-rose-400 transition-colors duration-300">
              Women
            </Link>
            <Link to="/category/men" className="hover:text-slate-400 transition-colors duration-300">
              Men
            </Link>
            <Link to="/category/kids" className="hover:text-amber-400 transition-colors duration-300">
              Kids
            </Link>
            <Link to="/category/accessories" className="hover:text-red-400 transition-colors duration-300">
              Accessories
            </Link>
          </nav>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            <Search className="w-5 h-5 hover:text-gray-300 cursor-pointer transition-colors" />
            <Link to="/cart" className="relative">
              <ShoppingBag className="w-5 h-5 hover:text-gray-300 transition-colors" />
              {state.items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-gradient-to-r from-rose-400 to-pink-500 text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {state.items.length}
                </span>
              )}
            </Link>
            <Menu className="w-5 h-5 md:hidden hover:text-gray-300 cursor-pointer transition-colors" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;