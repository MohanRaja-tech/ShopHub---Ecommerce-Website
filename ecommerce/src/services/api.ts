import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Users API
export const usersAPI = {
  getAll: () => api.get('/users'),
  create: (userData: any) => api.post('/users', userData),
  update: (id: string, userData: any) => api.put(`/users/${id}`, userData),
  delete: (id: string) => api.delete(`/users/${id}`),
};

// Products API
export const productsAPI = {
  getAll: () => api.get('/products'),
  create: (productData: any) => api.post('/products', productData),
  update: (id: string, productData: any) => api.put(`/products/${id}`, productData),
  delete: (id: string) => api.delete(`/products/${id}`),
};

// Orders API
export const ordersAPI = {
  getAll: () => api.get('/orders'),
  create: (orderData: any) => api.post('/orders', orderData),
  updateStatus: (id: string, status: string) => api.put(`/orders/${id}/status`, { status }),
};

// Analytics API
export const analyticsAPI = {
  getAll: () => api.get('/analytics'),
};

// Auth API
export const authAPI = {
  login: (email: string, password: string) => api.post('/auth/login', { email, password }),
  register: (userData: any) => api.post('/auth/register', userData),
};

export default api;