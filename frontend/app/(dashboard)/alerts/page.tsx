'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardBody, Badge, Button } from '@/components/ui';
import { formatTimeAgo } from '@/lib/utils';

interface Alert {
  id: string;
  sku: string;
  type: 'critical' | 'warning' | 'info';
  message: string;
  suggestedAction?: string;
  createdAt: string;
}

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [filter, setFilter] = useState<'all' | 'critical' | 'warning' | 'info'>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const mockAlerts: Alert[] = [
        {
          id: '1',
          sku: 'SKU002',
          type: 'critical',
          message: 'Stock crítico - Por debajo del punto de reorden',
          suggestedAction: 'Realizar pedido inmediato de 180 unidades',
          createdAt: new Date(Date.now() - 30 * 60000).toISOString(),
        },
        {
          id: '2',
          sku: 'SKU003',
          type: 'critical',
          message: 'Riesgo de faltante en los próximos días',
          suggestedAction: 'Acelerar entrega del proveedor',
          createdAt: new Date(Date.now() - 2 * 60 * 60000).toISOString(),
        },
        {
          id: '3',
          sku: 'SKU001',
          type: 'warning',
          message: 'Stock aproximándose al punto de reorden',
          suggestedAction: 'Prepara el pedido para la próxima semana',
          createdAt: new Date(Date.now() - 24 * 60 * 60000).toISOString(),
        },
      ];
      setAlerts(mockAlerts);
      setLoading(false);
    }, 500);
  }, []);

  const filteredAlerts = alerts.filter((a) => filter === 'all' || a.type === filter);
  const alertStats = {
    total: alerts.length,
    critical: alerts.filter((a) => a.type === 'critical').length,
    warning: alerts.filter((a) => a.type === 'warning').length,
    info: alerts.filter((a) => a.type === 'info').length,
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Alertas</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Monitoreo de problemas y recomendaciones de acción
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardBody>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {alertStats.total}
            </p>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <p className="text-sm text-gray-600 dark:text-gray-400">Críticas</p>
            <p className="text-3xl font-bold text-red-600">{alertStats.critical}</p>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <p className="text-sm text-gray-600 dark:text-gray-400">Advertencias</p>
            <p className="text-3xl font-bold text-yellow-600">{alertStats.warning}</p>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <p className="text-sm text-gray-600 dark:text-gray-400">Informativas</p>
            <p className="text-3xl font-bold text-blue-600">{alertStats.info}</p>
          </CardBody>
        </Card>
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-2 flex-wrap">
        {(['all', 'critical', 'warning', 'info'] as const).map((type) => (
          <Button
            key={type}
            variant={filter === type ? 'primary' : 'outline'}
            onClick={() => setFilter(type)}
          >
            {type === 'all' ? 'Todas' : type.charAt(0).toUpperCase() + type.slice(1)}
          </Button>
        ))}
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        {loading ? (
          <Card>
            <CardBody className="text-center py-12">
              <div className="animate-spin h-8 w-8 border-4 border-blue-600 border-r-transparent rounded-full mx-auto" />
            </CardBody>
          </Card>
        ) : filteredAlerts.length === 0 ? (
          <Card>
            <CardBody className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">No hay alertas 🎉</p>
            </CardBody>
          </Card>
        ) : (
          filteredAlerts.map((alert) => (
            <Card key={alert.id} hover>
              <CardBody>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Badge variant={alert.type} size="md">
                      {alert.type.toUpperCase()}
                    </Badge>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {alert.sku}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {alert.message}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-500 whitespace-nowrap ml-4">
                    {formatTimeAgo(alert.createdAt)}
                  </p>
                </div>
                {alert.suggestedAction && (
                  <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg">
                    <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
                      💡 Acción recomendada:
                    </p>
                    <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                      {alert.suggestedAction}
                    </p>
                  </div>
                )}
              </CardBody>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
