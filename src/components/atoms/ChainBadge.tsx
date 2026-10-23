import React from 'react';

interface ChainBadgeProps extends React.SVGProps<SVGSVGElement> {
  name: string;
  size?: number;
}

export const ChainBadge = React.forwardRef<SVGSVGElement, ChainBadgeProps>(
  ({ name, size = 24, className = '', ...props }, ref) => {
    return (
      <svg
        ref={ref}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        className={className}
        aria-label={`${name} blockchain`}
        {...props}
      >
        <rect x="2" y="2" width="20" height="20" rx="4" fill="currentColor" opacity="0.1" />
        <circle cx="12" cy="12" r="6" fill="currentColor" opacity="0.3" />
        <circle cx="12" cy="12" r="2" fill="currentColor" />
      </svg>
    );
  },
);

ChainBadge.displayName = 'ChainBadge';
