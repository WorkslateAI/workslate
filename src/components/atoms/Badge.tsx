import React from 'react';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'info';
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className = '', variant = 'default', children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium';
    
    const variantStyles = {
      default: 'bg-navy-700 text-white border border-navy-600',
      success: 'bg-green-900 text-green-200 border border-green-700',
      warning: 'bg-yellow-900 text-yellow-200 border border-yellow-700',
      info: 'bg-blue-900 text-blue-200 border border-blue-700',
    };

    return (
      <span
        ref={ref}
        className={`${baseStyles} ${variantStyles[variant]} ${className}`}
        {...props}
      >
        {children}
      </span>
    );
  },
);

Badge.displayName = 'Badge';
