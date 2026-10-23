import React from 'react';

interface PlayIconProps {
  className?: string;
}

export const PlayIcon: React.FC<PlayIconProps> = ({ className = '' }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="28" 
      height="28" 
      viewBox="0 0 24 24" 
      className={className}
      aria-hidden="true"
    >
      <path d="M8 5v14l11-7z" fill="currentColor"/>
    </svg>
  );
};
