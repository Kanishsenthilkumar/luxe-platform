import { apiService } from './api';
import { Product, Order } from '../types/Product';

// Products Service
export const productsService = {
  // Get all products
  async getAll(): Promise<Product[]> {
    return apiService.getProducts();
  },

  // Get product by ID
  async getById(id: string): Promise<Product | null> {
    return apiService.getProduct(id);
  },

  // Add new product
  async add(product: Omit<Product, 'id'>): Promise<string> {
    const response = await apiService.createProduct(product);
    return response.id;
  },

  // Update product
  async update(id: string, updates: Partial<Product>): Promise<void> {
    await apiService.updateProduct(id, updates);
  },

  // Delete product
  async delete(id: string): Promise<void> {
    await apiService.deleteProduct(id);
  }
};

// Orders Service
export const ordersService = {
  // Get all orders
  async getAll(): Promise<Order[]> {
    try {
      const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
        updatedAt: doc.data().updatedAt?.toDate()
      })) as Order[];
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  },

  // Get order by ID
  async getById(id: string): Promise<Order | null> {
    try {
      const docRef = doc(db, 'orders', id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return {
          id: docSnap.id,
          ...docSnap.data(),
          createdAt: docSnap.data().createdAt?.toDate(),
          updatedAt: docSnap.data().updatedAt?.toDate()
        } as Order;
      }
      return null;
    } catch (error) {
      console.error('Error fetching order:', error);
      throw error;
    }
  },

  // Update order status
  async updateStatus(id: string, status: Order['status']): Promise<void> {
    try {
      const docRef = doc(db, 'orders', id);
      await updateDoc(docRef, {
        status,
        updatedAt: Timestamp.now()
      });
    } catch (error) {
      console.error('Error updating order status:', error);
      throw error;
    }
  },

  // Get orders by status
  async getByStatus(status: Order['status']): Promise<Order[]> {
    try {
      const q = query(
        collection(db, 'orders'), 
        where('status', '==', status),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
        updatedAt: doc.data().updatedAt?.toDate()
      })) as Order[];
    } catch (error) {
      console.error('Error fetching orders by status:', error);
      throw error;
    }
  }
};

// Users Service
export const usersService = {
  // Get user profile
  async getProfile(uid: string): Promise<any> {
    try {
      const docRef = doc(db, 'users', uid);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return {
          id: docSnap.id,
          ...docSnap.data()
        };
      }
      return null;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  },

  // Create or update user profile
  async updateProfile(uid: string, data: any): Promise<void> {
    try {
      const docRef = doc(db, 'users', uid);
      await updateDoc(docRef, {
        ...data,
        updatedAt: Timestamp.now()
      });
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  }
};