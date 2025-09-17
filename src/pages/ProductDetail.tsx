import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Heart, Share2, ShoppingBag, Star, Truck, Shield, RotateCcw } from 'lucide-react';
import { categoryThemes } from '../utils/categoryThemes';
import { useCart } from '../context/CartContext';
import { apiService } from '../services/api';
import ProductCard from '../components/ProductCard';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState(0);
  const [isSpotlight, setIsSpotlight] = useState(false);

  React.useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const productData = await apiService.getProduct(id);
        setProduct(productData);
        setError(null);
      } catch (err) {
        setError('Failed to load product');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);
  
  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-xl text-white">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-white mb-4">{error || 'Product not found'}</p>
          <Link 
            to="/"
            className="px-6 py-3 bg-gradient-to-r from-rose-400 to-pink-500 text-white rounded-lg"
          >
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  const theme = categoryThemes[product.category];
  // Note: You'll need to implement related products fetch from Firebase
  const relatedProducts: any[] = [];

  const handleAddToCart = () => {
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      alert('Please select a size');
      return;
    }
    addToCart(product, selectedSize);
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Spotlight Mode Overlay */}
      {isSpotlight && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
          onClick={() => setIsSpotlight(false)}
        >
          <div className="relative max-w-4xl max-h-full p-8">
            <img 
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-contain rounded-lg shadow-2xl"
              style={{
                filter: 'none',
                animation: 'spotlight 0.8s ease-out'
              }}
            />
            <button 
              onClick={() => setIsSpotlight(false)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 text-xl"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-gray-400 mb-8">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <Link to={`/category/${product.category}`} className="hover:text-white transition-colors capitalize">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-white">{product.name}</span>
        </div>

        <Link 
          to={`/category/${product.category}`}
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to {theme.name}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div 
              className="relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer group"
              onClick={() => setIsSpotlight(true)}
            >
              <img 
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
              <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-all duration-300">
                <p className="text-sm font-light">Click for spotlight view</p>
              </div>
            </div>

            {/* Thumbnail Gallery */}
            {product.images.length > 1 && (
              <div className="flex gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative w-20 h-24 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                      selectedImage === index 
                        ? `border-gradient-to-r ${theme.accent}` 
                        : 'border-gray-600 hover:border-gray-400'
                    }`}
                  >
                    <img 
                      src={image}
                      alt=""
                      className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-300"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-light text-white mb-2">{product.name}</h1>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-3xl font-semibold text-white">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
              </div>
              
              <div className="flex items-center gap-2 mb-6">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-gray-400 text-sm">(127 reviews)</span>
              </div>
            </div>

            <p className="text-gray-300 text-lg leading-relaxed">
              {product.description}
            </p>

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-white font-medium">Size</h3>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border rounded-lg transition-all duration-300 ${
                        selectedSize === size 
                          ? `${theme.button} text-white border-transparent` 
                          : 'border-gray-600 text-gray-300 hover:border-gray-400 hover:text-white'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-white font-medium">Color</h3>
                <div className="flex gap-3">
                  {product.colors.map(color => (
                    <div key={color} className="text-center">
                      <div className="w-10 h-10 rounded-full border-2 border-gray-600 mb-1 cursor-pointer hover:border-gray-400 transition-colors"></div>
                      <span className="text-xs text-gray-400">{color}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button 
                onClick={handleAddToCart}
                className={`flex-1 py-4 px-6 ${theme.button} text-white rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2`}
              >
                <ShoppingBag className="w-5 h-5" />
                Add to Cart
              </button>
              
              <button className="p-4 border border-gray-600 text-gray-300 rounded-xl hover:border-gray-400 hover:text-white transition-all duration-300">
                <Heart className="w-5 h-5" />
              </button>
              
              <button className="p-4 border border-gray-600 text-gray-300 rounded-xl hover:border-gray-400 hover:text-white transition-all duration-300">
                <Share2 className="w-5 h-5" />
              </button>
            </div>

            {/* Product Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-8 border-t border-gray-800">
              <div className="flex items-center gap-3 text-gray-300">
                <Truck className="w-5 h-5 text-green-400" />
                <span className="text-sm">Free Delivery</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Shield className="w-5 h-5 text-blue-400" />
                <span className="text-sm">Authentic Guarantee</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <RotateCcw className="w-5 h-5 text-purple-400" />
                <span className="text-sm">Easy Returns</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-light text-white mb-8 text-center">
                Complete the Look
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {relatedProducts.map(product => (
                  <ProductCard key={product.id} product={product} darkMode />
                ))}
              </div>
            </div>
          </section>
        )}
      </div>

      <style jsx>{`
        @keyframes spotlight {
          from {
            filter: grayscale(100%);
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            filter: grayscale(0%);
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default ProductDetail;