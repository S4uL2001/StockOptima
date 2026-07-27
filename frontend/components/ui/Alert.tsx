'use client';

import React from 'react';
import { cn, getStatusColor } from '@/lib/utils';

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  type: 'critical' | 'warning' | 'info' | 'success';
  title?: string;
  message: string;
  dismissible?: boolean;
  onDismiss?: () => void;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, type, title, message, dismissible = false, onDismiss, ...props }, ref) => {
    const [visible, setVisible] = React.useState(true);

    if (!visible) return null;

    const bgColors = {
      critical: 'bg-red-50 dark:bg-red-900/20',
      warning: 'bg-yellow-50 dark:bg-yellow-900/20',
      info: 'bg-blue-50 dark:bg-blue-900/20',
      success: 'bg-green-50 dark:bg-green-900/20',
    };

    const borderColors = {
      critical: 'border-l-red-500',
      warning: 'border-l-yellow-500',
      info: 'border-l-blue-500',
      success: 'border-l-green-500',
    };

    const textColors = {
      critical: 'text-red-800 dark:text-red-200',
      warning: 'text-yellow-800 dark:text-yellow-200',
      info: 'text-blue-800 dark:text-blue-200',
      success: 'text-green-800 dark:text-green-200',
    };

    const handleDismiss = () => {
      setVisible(false);
      onDismiss?.();
    };

    return (
      <div
        ref={ref}
        className={cn(
          'border-l-4 p-4 rounded',
          bgColors[type],
          borderColors[type],
          textColors[type],
          'animate-slide-in-down',
          className
        )}
        {...props}
      >
        <div className="flex items-start justify-between">
          <div>
            {title && <h4 className="font-semibold mb-1">{title}</h4>}
            <p>{message}</p>
          </div>
          {dismissible && (
            <button
              onClick={handleDismiss}
              className="ml-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <span className="text-xl">&times;</span>
            </button>
          )}
        </div>
      </div>
    );
  }
);

Alert.displayName = 'Alert';

export default Alert;
