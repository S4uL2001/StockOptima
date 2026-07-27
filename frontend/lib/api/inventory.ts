import { apiClient } from './client';
import { InventoryMetrics, InventoryAlert, InventoryReport, ApiResponse } from '@/types';

export const inventoryApi = {
  // Get inventory metrics
  async getMetrics(): Promise<ApiResponse<InventoryMetrics>> {
    return apiClient.get('/api/inventory/metrics');
  },

  // Get all alerts
  async getAlerts(): Promise<ApiResponse<InventoryAlert[]>> {
    return apiClient.get('/api/inventory/alerts');
  },

  // Get alerts by type
  async getAlertsByType(type: 'critical' | 'warning' | 'info'): Promise<ApiResponse<InventoryAlert[]>> {
    return apiClient.get(`/api/inventory/alerts?type=${type}`);
  },

  // Clear alert
  async clearAlert(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete(`/api/inventory/alerts/${id}`);
  },

  // Generate report
  async generateReport(startDate: string, endDate: string): Promise<ApiResponse<InventoryReport>> {
    return apiClient.post('/api/inventory/reports/generate', {
      startDate,
      endDate,
    });
  },

  // Get recent reports
  async getReports(limit = 10): Promise<ApiResponse<InventoryReport[]>> {
    return apiClient.get(`/api/inventory/reports?limit=${limit}`);
  },
};
