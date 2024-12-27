import React, { memo } from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = memo(({
  children,
  className = '',
  onClick,
  hoverable = false
}) => {
  const baseClasses = 'bg-white rounded-lg shadow-md overflow-hidden';
  const hoverClasses = hoverable ? 'transition-transform duration-200 hover:scale-[1.02] cursor-pointer' : '';

  return (
    <div
      onClick={onClick}
      className={`
        ${baseClasses}
        ${hoverClasses}
        ${className}
      `}
    >
      {children}
    </div>
  );
});

export default Card; 