import React from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ArrowLeft, MessageCircle, Shield, Truck, RotateCcw, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { categoryThemes } from '../utils/categoryThemes';

const Cart: React.FC = () => {
  const { state, removeFromCart, updateQuantity } = useCart();

  const generateWhatsAppMessage = () => {
    const orderSummary = state.items.map((item, index) => 
      `${index + 1}. ${item.name}${item.selectedSize ? ` (Size: ${item.selectedSize})` : ''} - Qty: ${item.quantity} - ₹${(item.price * item.quantity).toLocaleString('en-IN')}`
    ).join('\n');

    const message = `🛍️ *LUXE Store Order*\n\n${orderSummary}\n\n*Total: ₹${state.total.toLocaleString('en-IN')}*\n\nPlease confirm availability and delivery details.`;
    
    const whatsappNumber = "6379835726"; // Replace with actual WhatsApp number
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    window.open(whatsappURL, '_blank');
  };

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full flex items-center justify-center">
            <ShoppingBag className="w-16 h-16 text-gray-500" />
          </div>
          <h2 className="text-3xl font-light text-white mb-4">Your cart is empty</h2>
          <p className="text-gray-400 mb-8">Discover our curated collection of luxury items</p>
          <Link 
            to="/"
            className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-rose-400 to-pink-500 text-white rounded-full hover:from-rose-500 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link 
              to="/"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-4xl font-light text-white">Shopping Cart</h1>
          </div>
          <span className="text-gray-400">
            {state.items.length} {state.items.length === 1 ? 'item' : 'items'}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {state.items.map((item) => {
              const theme = categoryThemes[item.category];
              return (
                <div key={`${item.id}-${item.selectedSize}`} className="bg-gray-900 rounded-2xl p-6 hover:bg-gray-800 transition-all duration-300">
                  <div className="flex gap-6">
                    {/* Product Image */}
                    <div className="w-32 h-40 rounded-xl overflow-hidden flex-shrink-0">
                      <img 
                        src={item.images[0]}
                        alt={item.name}
                        className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-500"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-medium text-white mb-1">{item.name}</h3>
                          {item.selectedSize && (
                            <p className="text-gray-400">Size: {item.selectedSize}</p>
                          )}
                          <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-2 ${theme.highlight} ${theme.text}`}>
                            {theme.name}
                          </div>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-400 hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 rounded-full border border-gray-600 flex items-center justify-center text-gray-300 hover:border-gray-400 hover:text-white transition-all duration-300"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="text-white font-medium min-w-[2rem] text-center">
                            {item.quantity}
                          </span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 rounded-full border border-gray-600 flex items-center justify-center text-gray-300 hover:border-gray-400 hover:text-white transition-all duration-300"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-2xl font-semibold text-white">
                            ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                          </p>
                          {item.quantity > 1 && (
                            <p className="text-sm text-gray-400">
                              ₹{item.price.toLocaleString('en-IN')} each
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900 rounded-2xl p-8 sticky top-24">
              <h2 className="text-2xl font-light text-white mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-300">
                  <span>Subtotal</span>
                  <span>₹{state.total.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Shipping</span>
                  <span className="text-green-400">Free</span>
                </div>
                <div className="border-t border-gray-700 pt-4">
                  <div className="flex justify-between text-xl font-semibold text-white">
                    <span>Total</span>
                    <span>₹{state.total.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              <button 
                onClick={generateWhatsAppMessage}
                className="w-full py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 mb-4"
              >
                <MessageCircle className="w-5 h-5" />
                Checkout via WhatsApp
              </button>

              <p className="text-xs text-gray-400 text-center leading-relaxed">
                You'll be redirected to WhatsApp with your order details. Our team will confirm availability and arrange delivery.
              </p>

              {/* Trust Indicators */}
              <div className="mt-6 pt-6 border-t border-gray-800 space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <Shield className="w-4 h-4 text-green-400" />
                  <span>Secure Checkout</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <Truck className="w-4 h-4 text-blue-400" />
                  <span>Free Shipping on all orders</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <RotateCcw className="w-4 h-4 text-purple-400" />
                  <span>30-day return policy</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;