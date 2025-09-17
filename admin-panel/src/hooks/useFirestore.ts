import { useState, useEffect } from 'react';
import { productsService, ordersService } from '../services/firestore';
import { Product, Order } from '../types/Product';

// Hook for products
export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await productsService.getAll();
      setProducts(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch products');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addProduct = async (product: Omit<Product, 'id'>) => {
    try {
      await productsService.add(product);
      await fetchProducts(); // Refresh the list
    } catch (err) {
      setError('Failed to add product');
      throw err;
    }
  };

  const updateProduct = async (id: string, updates: Partial<Product>) => {
    try {
      await productsService.update(id, updates);
      await fetchProducts(); // Refresh the list
    } catch (err) {
      setError('Failed to update product');
      throw err;
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      await productsService.delete(id);
      await fetchProducts(); // Refresh the list
    } catch (err) {
      setError('Failed to delete product');
      throw err;
    }
  };

  return {
    products,
    loading,
    error,
    addProduct,
    updateProduct,
    deleteProduct,
    refetch: fetchProducts
  };
};

// Hook for orders
export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await ordersService.getAll();
      setOrders(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch orders');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateOrderStatus = async (id: string, status: Order['status']) => {
    try {
      await ordersService.updateStatus(id, status);
      await fetchOrders(); // Refresh the list
    } catch (err) {
      setError('Failed to update order status');
      throw err;
    }
  };

  return {
    orders,
    loading,
    error,
    updateOrderStatus,
    refetch: fetchOrders
  };
};