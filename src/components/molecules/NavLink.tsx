import React from 'react';

interface NavLinkProps {
  label: string;
  href: string;
  isActive?: boolean;
}

export const NavLink: React.FC<NavLinkProps> = ({ label, href, isActive = false }) => {
  return (
    <a
      href={href}
      className={`text-sm font-medium transition-colors hover:text-blue-400 ${
        isActive ? 'text-blue-400' : 'text-navy-300'
      }`}
    >
      {label}
    </a>
  );
};
