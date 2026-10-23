import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

export const Icon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = 24, className = '', children, ...props }, ref) => {
    return (
      <svg
        ref={ref}
        width={size}
        height={size}
        className={className}
        {...props}
      >
        {children}
      </svg>
    );
  },
);

Icon.displayName = 'Icon';
