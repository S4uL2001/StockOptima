'use client';

import React from 'react';
import { cn, getStatusColor } from '@/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'critical' | 'warning' | 'info' | 'success' | 'default';
  size?: 'sm' | 'md' | 'lg';
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', size = 'md', children, ...props }, ref) => {
    const sizeClasses = {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-3 py-1 text-sm',
      lg: 'px-4 py-2 text-base',
    };

    const variantClasses = {
      critical: getStatusColor('critical'),
      warning: getStatusColor('warning'),
      info: getStatusColor('info'),
      success: getStatusColor('success'),
      default: 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
    };

    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center font-medium rounded-full whitespace-nowrap',
          sizeClasses[size],
          variantClasses[variant],
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

export default Badge;
