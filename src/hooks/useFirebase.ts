import { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import { Product } from '../types/Product';

// Hook for products
export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await apiService.getProducts();
        setProducts(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch products');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return {
    products,
    loading,
    error
  };
};

// Hook for real-time orders
export const useOrders = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = ordersService.subscribeToOrders((orders) => {
      setOrders(orders);
      setLoading(false);
      setError(null);
    });

    return () => unsubscribe();
  }, []);

  const updateOrderStatus = async (id: string, status: string, notes?: string) => {
    try {
      await ordersService.updateStatus(id, status, notes);
    } catch (err) {
      setError('Failed to update order status');
      throw err;
    }
  };

  const createOrder = async (orderData: any) => {
    try {
      return await ordersService.createOrder(orderData);
    } catch (err) {
      setError('Failed to create order');
      throw err;
    }
  };

  return {
    orders,
    loading,
    error,
    updateOrderStatus,
    createOrder
  };
};

// Hook for dashboard analytics
export const useDashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0
  });
  const [salesData, setSalesData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [dashboardStats, sales] = await Promise.all([
          analyticsService.getDashboardStats(),
          analyticsService.getSalesData(30)
        ]);
        
        setStats(dashboardStats);
        setSalesData(sales);
        setError(null);
      } catch (err) {
        setError('Failed to fetch dashboard data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return { stats, salesData, loading, error };
};

// Hook for customers
export const useCustomers = () => {
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setLoading(true);
        const customersData = await customersService.getAllWithStats();
        setCustomers(customersData);
        setError(null);
      } catch (err) {
        setError('Failed to fetch customers');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  return { customers, loading, error, refetch: () => window.location.reload() };
};

// Hook for category products (E-commerce site)
export const useCategoryProducts = (category: string) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await apiService.getProducts(category);
        setProducts(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch products');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (category) {
      fetchProducts();
    }
  }, [category]);

  return { products, loading, error };
};