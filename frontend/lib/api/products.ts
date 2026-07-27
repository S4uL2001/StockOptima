import { apiClient } from './client';
import { Product, ApiResponse, PaginatedResponse } from '@/types';

export const productsApi = {
  // Get all products
  async getAll(page = 1, pageSize = 20): Promise<PaginatedResponse<Product>> {
    return apiClient.get(`/api/products?page=${page}&pageSize=${pageSize}`);
  },

  // Get single product
  async getById(id: string): Promise<ApiResponse<Product>> {
    return apiClient.get(`/api/products/${id}`);
  },

  // Create product
  async create(data: Omit<Product, 'id' | 'lastUpdated'>): Promise<ApiResponse<Product>> {
    return apiClient.post('/api/products', data);
  },

  // Update product
  async update(id: string, data: Partial<Product>): Promise<ApiResponse<Product>> {
    return apiClient.put(`/api/products/${id}`, data);
  },

  // Delete product
  async delete(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete(`/api/products/${id}`);
  },

  // Search products
  async search(query: string): Promise<PaginatedResponse<Product>> {
    return apiClient.get(`/api/products/search?q=${encodeURIComponent(query)}`);
  },

  // Get low stock products
  async getLowStock(): Promise<ApiResponse<Product[]>> {
    return apiClient.get('/api/products/alerts/low-stock');
  },

  // Get critical stock products
  async getCritical(): Promise<ApiResponse<Product[]>> {
    return apiClient.get('/api/products/alerts/critical');
  },
};
