'use client';

import React, { useState, useEffect } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Badge,
  Alert,
  LoadingCards,
} from '@/components/ui';
import { formatCurrency, formatNumber } from '@/lib/utils';
import UploadInventoryModal from '@/components/features/UploadInventoryModal';
import StatCard from '@/components/features/StatCard';
import RecentAlerts from '@/components/features/RecentAlerts';
import InventoryChart from '@/components/features/InventoryChart';

export default function Dashboard() {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [metrics, setMetrics] = useState({
    totalProducts: 0,
    lowStockProducts: 0,
    criticalProducts: 0,
    totalInventoryValue: 0,
  });
  const [loading, setLoading] = useState(true);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setMetrics({
        totalProducts: 156,
        lowStockProducts: 12,
        criticalProducts: 3,
        totalInventoryValue: 45620.50,
      });
      setAlerts([
        {
          id: '1',
          productName: 'Producto A',
          type: 'critical',
          message: 'Stock crítico - Requiere reabastecimiento inmediato',
        },
        {
          id: '2',
          productName: 'Producto B',
          type: 'warning',
          message: 'Stock bajo - Se recomienda hacer pedido',
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Bienvenido al sistema de optimización de inventarios
          </p>
        </div>
        <LoadingCards />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Monitoreo y optimización de tu inventario
          </p>
        </div>
        <Button
          variant="primary"
          size="lg"
          onClick={() => setIsUploadModalOpen(true)}
          icon={
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          }
        >
          Cargar Inventario
        </Button>
      </div>

      {/* Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total de Productos"
          value={formatNumber(metrics.totalProducts)}
          icon="📦"
          color="blue"
        />
        <StatCard
          label="Stock Bajo"
          value={formatNumber(metrics.lowStockProducts)}
          icon="⚠️"
          color="yellow"
        />
        <StatCard
          label="Stock Crítico"
          value={formatNumber(metrics.criticalProducts)}
          icon="🚨"
          color="red"
        />
        <StatCard
          label="Valor del Inventario"
          value={formatCurrency(metrics.totalInventoryValue)}
          icon="💰"
          color="green"
        />
      </div>

      {/* Recent Alerts */}
      {alerts.length > 0 && (
        <Card>
          <CardHeader
            title="Alertas Recientes"
            subtitle="Acciones recomendadas para optimizar tu inventario"
          />
          <CardBody>
            <RecentAlerts alerts={alerts} />
          </CardBody>
        </Card>
      )}

      {/* Charts Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader title="Distribución de Stock" />
          <CardBody>
            <InventoryChart type="distribution" />
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Tendencia de Movimiento" />
          <CardBody>
            <InventoryChart type="trend" />
          </CardBody>
        </Card>
      </div>

      {/* Upload Modal */}
      <UploadInventoryModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onSuccess={() => {
          setIsUploadModalOpen(false);
          // Refresh metrics
        }}
      />
    </div>
  );
}
