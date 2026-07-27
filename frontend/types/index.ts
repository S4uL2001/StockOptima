/**
 * Core types and interfaces for StockOptima
 */

// Product/Inventory Types
export interface Product {
  id: string;
  name: string;
  sku: string;
  description?: string;
  currentStock: number;
  unitCost: number;
  sellingPrice: number;
  category?: string;
  supplier?: string;
  leadTime: number; // days
  reorderPoint: number;
  economicOrderQuantity: number;
  safetyStock: number;
  demand?: number;
  lastUpdated: string;
}

export interface InventoryAlert {
  id: string;
  productId: string;
  productName: string;
  type: 'critical' | 'warning' | 'info';
  message: string;
  suggestedAction?: string;
  createdAt: string;
}

export interface InventoryMetrics {
  totalProducts: number;
  lowStockProducts: number;
  criticalProducts: number;
  totalInventoryValue: number;
  averageTurnover: number;
  stockoutRisk: number;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// User/Auth Types
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'manager' | 'viewer';
  businessName?: string;
  businessType?: string;
}

// Report Types
export interface InventoryReport {
  id: string;
  name: string;
  generatedAt: string;
  period: {
    startDate: string;
    endDate: string;
  };
  metrics: InventoryMetrics;
  topProducts: Product[];
  criticalAlerts: InventoryAlert[];
}

// Chart Data Types
export interface ChartDataPoint {
  name: string;
  value: number;
  fill?: string;
}

export interface TimeSeriesData {
  timestamp: string;
  value: number;
}
