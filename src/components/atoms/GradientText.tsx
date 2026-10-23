import React from 'react';

interface GradientTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  from?: string;
  to?: string;
}

export const GradientText = React.forwardRef<HTMLSpanElement, GradientTextProps>(
  ({ className = '', from = 'from-blue-600', to = 'to-purple-600', children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={`bg-gradient-to-r ${from} ${to} bg-clip-text text-transparent ${className}`}
        {...props}
      >
        {children}
      </span>
    );
  },
);

GradientText.displayName = 'GradientText';
