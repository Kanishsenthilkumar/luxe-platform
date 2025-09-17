import React, { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Filter, Grid, List } from 'lucide-react';
import { useCategoryProducts } from '../hooks/useFirebase';
import { categoryThemes } from '../utils/categoryThemes';
import ProductCard from '../components/ProductCard';

const ProductListing: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  const { products, loading, error } = useCategoryProducts(category || '');
  const theme = categoryThemes[category as keyof typeof categoryThemes];
  
  const filteredProducts = useMemo(() => {
    let filtered = [...products];
    
    // Apply price filter
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // Keep original order for 'featured'
        break;
    }
    
    return filtered;
  }, [products, sortBy, priceRange]);

  if (!theme) {
    return <div>Category not found</div>;
  }

  if (loading) {
    return (
      <div className={`min-h-screen ${theme.background} flex items-center justify-center`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className={`text-xl ${theme.text}`}>Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen ${theme.background} flex items-center justify-center`}>
        <div className="text-center">
          <p className={`text-xl ${theme.text} mb-4`}>Error loading products</p>
          <button 
            onClick={() => window.location.reload()}
            className={`px-6 py-3 ${theme.button} text-white rounded-lg`}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${theme.background}`}>
      {/* Category Header */}
      <section className="relative py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className={`text-5xl md:text-6xl font-light mb-4 ${theme.text}`}>
              {theme.name}
            </h1>
            <p className={`text-xl font-light ${theme.text} opacity-80 max-w-2xl mx-auto`}>
              Discover our curated collection of premium {theme.name.toLowerCase()} fashion
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Filters and Sort */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="flex items-center gap-4">
            <button className={`flex items-center gap-2 px-4 py-2 ${theme.highlight} ${theme.text} rounded-lg border ${theme.border} hover:shadow-md transition-all duration-300`}>
              <Filter className="w-4 h-4" />
              Filters
            </button>
            
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={`px-4 py-2 ${theme.highlight} ${theme.text} rounded-lg border ${theme.border} focus:outline-none focus:ring-2 focus:ring-opacity-50`}
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name A-Z</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-all duration-300 ${viewMode === 'grid' ? theme.button + ' text-white' : theme.highlight + ' ' + theme.text}`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-all duration-300 ${viewMode === 'list' ? theme.button + ' text-white' : theme.highlight + ' ' + theme.text}`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Products Count */}
        <div className="mb-8">
          <p className={`${theme.text} opacity-80`}>
            {filteredProducts.length} products found
          </p>
        </div>

        {/* Products Grid */}
        <div className={`grid gap-8 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductListing;