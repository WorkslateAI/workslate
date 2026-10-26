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
    <picture>
      <source
        srcSet="/assets/images/logo@1x.avif 1x, /assets/images/logo.avif 2x"
        type="image/avif"
      />
      <source
        srcSet="/assets/images/logo@1x.webp 1x, /assets/images/logo.webp 2x"
        type="image/webp"
      />
      <img
        src="/assets/images/logo@1x.jpeg"
        srcSet="/assets/images/logo@1x.jpeg 1x, /assets/images/logo.jpeg 2x"
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
    </picture>
  </span>
);
