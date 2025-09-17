import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Sparkles } from 'lucide-react';
import { useProducts } from '../hooks/useFirebase';
import { categoryThemes } from '../utils/categoryThemes';
import ProductCard from '../components/ProductCard';

const Homepage: React.FC = () => {
  const { products, loading } = useProducts();
  
  const featuredProducts = products.slice(0, 8);
  const newArrivals = products.filter(p => p.isNew).slice(0, 6);
  const saleProducts = products.filter(p => p.isSale).slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen bg-black overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black z-10"></div>
        <img 
          src="https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg" 
          alt="Hero"
          className="w-full h-full object-cover opacity-70 filter grayscale"
        />
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-6xl md:text-8xl font-light mb-6 tracking-wide">
              <span className="bg-gradient-to-r from-rose-400 via-amber-300 to-pink-400 bg-clip-text text-transparent">
                LUXE
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 font-light tracking-wider opacity-90">
              Curated Fashion for the Discerning
            </p>
            <Link 
              to="/category/women"
              className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-rose-400 to-pink-500 text-white font-medium rounded-full hover:from-rose-500 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
            >
              Explore Collection
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Category Sections */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Object.entries(categoryThemes).map(([key, theme]) => (
              <Link 
                key={key}
                to={`/category/${key}`}
                className="group relative h-80 rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-500"
              >
                <div className={`absolute inset-0 ${theme.background} opacity-90`}></div>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <h3 className={`text-3xl font-light mb-2 ${theme.text}`}>
                      {theme.name}
                    </h3>
                    <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-current to-transparent mx-auto opacity-60"></div>
                  </div>
                </div>
                <div className="absolute bottom-4 right-4">
                  <ArrowRight className={`w-6 h-6 ${theme.text} transform group-hover:translate-x-1 transition-transform duration-300`} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      {newArrivals.length > 0 && (
        <section className="py-16 bg-zinc-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-light text-gray-900 mb-4 flex items-center justify-center">
                <Sparkles className="w-8 h-8 mr-3 text-amber-500" />
                New Arrivals
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Discover the latest additions to our curated collection
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {newArrivals.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Products */}
      <section className="py-16 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-light text-white mb-4 flex items-center justify-center">
              <Star className="w-8 h-8 mr-3 text-amber-500" />
              Featured Collection
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Handpicked pieces that define luxury and elegance
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} darkMode />
            ))}
          </div>
        </div>
      </section>

      {/* Sale Section */}
      {saleProducts.length > 0 && (
        <section className="py-16 bg-gradient-to-r from-red-900 via-red-800 to-red-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-light text-white mb-4">
                Exclusive Sale
              </h2>
              <p className="text-red-100 max-w-2xl mx-auto">
                Limited time offers on selected luxury pieces
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {saleProducts.map(product => (
                <ProductCard key={product.id} product={product} darkMode />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Editorial Banner */}
      <section className="relative h-96 bg-gray-900 overflow-hidden">
        <img 
          src="https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg"
          alt="Editorial"
          className="w-full h-full object-cover filter grayscale opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-lg">
              <h3 className="text-4xl font-light text-white mb-4">
                The Art of Luxury
              </h3>
              <p className="text-xl text-gray-300 mb-6 font-light leading-relaxed">
                Where exceptional craftsmanship meets timeless design
              </p>
              <Link 
                to="/category/women"
                className="inline-flex items-center px-6 py-3 border border-white text-white hover:bg-white hover:text-black transition-all duration-300"
              >
                Discover More
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;