import React from 'react';

interface CoinIconProps extends React.SVGProps<SVGSVGElement> {
  symbol: string;
  size?: number;
}

export const CoinIcon = React.forwardRef<SVGSVGElement, CoinIconProps>(
  ({ symbol, size = 24, className = '', ...props }, ref) => {
    return (
      <svg
        ref={ref}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        className={className}
        aria-label={`${symbol} coin icon`}
        {...props}
      >
        <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.2" />
        <text x="12" y="16" textAnchor="middle" fontSize="12" fontWeight="bold" fill="currentColor">
          {symbol}
        </text>
      </svg>
    );
  },
);

CoinIcon.displayName = 'CoinIcon';
