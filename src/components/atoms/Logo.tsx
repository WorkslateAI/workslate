import React from 'react';

interface LogoProps {
  variant: 'header' | 'footer';
  size: number;
}

const LOGO_WIDTH = 720;
const LOGO_HEIGHT = 158;

export const Logo: React.FC<LogoProps> = ({ variant, size }) => (
  <span
    className={
      variant === 'footer'
        ? 'inline-flex items-center rounded-lg bg-white px-1.5'
        : 'inline-flex items-center'
    }
  >
    <img
      src="/assets/images/logo@1x.png"
      srcSet="/assets/images/logo@1x.png 1x, /assets/images/logo.png 2x"
      alt="Workslate AI"
      width={LOGO_WIDTH}
      height={LOGO_HEIGHT}
      loading={variant === 'header' ? 'eager' : 'lazy'}
      decoding="async"
      style={{
        width: 'auto',
        height: variant === 'header' ? `clamp(28px, 8vw, ${size}px)` : `${size}px`,
        maxWidth: '100%',
      }}
    />
  </span>
);
