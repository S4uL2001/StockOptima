'use client';

import React, { useEffect, useState } from 'react';

interface ChartDataPoint {
  name: string;
  value: number;
}

interface InventoryChartProps {
  type: 'distribution' | 'trend';
  data?: ChartDataPoint[];
}

const InventoryChart: React.FC<InventoryChartProps> = ({ type, data }) => {
  const [chartData] = useState<ChartDataPoint[]>(
    data || [
      { name: 'Categoría A', value: 35 },
      { name: 'Categoría B', value: 28 },
      { name: 'Categoría C', value: 20 },
      { name: 'Categoría D', value: 17 },
    ]
  );

  const maxValue = Math.max(...chartData.map((d) => d.value));

  return (
    <div className="space-y-4">
      {chartData.map((item) => {
        const percentage = (item.value / maxValue) * 100;
        return (
          <div key={item.name}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {item.name}
              </span>
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                {item.value}%
              </span>
            </div>
            <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default InventoryChart;
