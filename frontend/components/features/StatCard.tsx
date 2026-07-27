'use client';

import React from 'react';
import { cn, getStatusColor } from '@/lib/utils';

interface StatCardProps {
  label: string;
  value: string | number;
  icon?: string;
  color?: 'blue' | 'yellow' | 'red' | 'green';
  trend?: number;
  className?: string;
}

const colorMap = {
  blue: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700',
  yellow: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-700',
  red: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-700',
  green: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700',
};

const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  icon,
  color = 'blue',
  trend,
  className,
}) => {
  return (
    <div
      className={cn(
        'rounded-lg border-2 p-6 transition-all duration-200 hover:shadow-lg',
        colorMap[color],
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {label}
          </p>
          <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
            {value}
          </p>
          {trend !== undefined && (
            <p
              className={cn(
                'mt-2 text-sm font-medium',
                trend > 0 ? 'text-green-600' : 'text-red-600'
              )}
            >
              {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
            </p>
          )}
        </div>
        {icon && <span className="text-4xl">{icon}</span>}
      </div>
    </div>
  );
};

export default StatCard;
