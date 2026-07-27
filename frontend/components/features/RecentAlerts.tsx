'use client';

import React from 'react';
import Badge from '@/components/ui/Badge';
import { formatTimeAgo } from '@/lib/utils';

interface Alert {
  id: string;
  productName: string;
  type: 'critical' | 'warning' | 'info' | 'success';
  message: string;
  createdAt?: string;
}

interface RecentAlertsProps {
  alerts: Alert[];
  maxItems?: number;
}

const RecentAlerts: React.FC<RecentAlertsProps> = ({ alerts, maxItems = 5 }) => {
  const displayAlerts = alerts.slice(0, maxItems);

  return (
    <div className="space-y-3">
      {displayAlerts.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-center py-8">
          No hay alertas en este momento ✅
        </p>
      ) : (
        displayAlerts.map((alert) => (
          <div
            key={alert.id}
            className="flex items-start justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-600/50 transition-colors"
          >
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <p className="font-medium text-gray-900 dark:text-white">
                  {alert.productName}
                </p>
                <Badge variant={alert.type} size="sm">
                  {alert.type.toUpperCase()}
                </Badge>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {alert.message}
              </p>
              {alert.createdAt && (
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                  {formatTimeAgo(alert.createdAt)}
                </p>
              )}
            </div>
            <button className="ml-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default RecentAlerts;
