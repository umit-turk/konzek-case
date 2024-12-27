import React, { memo } from 'react';

interface BadgeProps {
  count: number;
  max?: number;
  dot?: boolean;
  className?: string;
  children: React.ReactNode;
}

const getBadgeContent = (count: number, max: number = 99) => {
  if (count > max) return `${max}+`;
  return count.toString();
};

export const Badge: React.FC<BadgeProps> = memo(({
  count,
  max = 99,
  dot = false,
  className = '',
  children
}) => {
  const showBadge = count > 0 || dot;
  const badgeContent = dot ? null : getBadgeContent(count, max);
  
  const baseClasses = 'absolute -top-2 -right-2 flex items-center justify-center bg-error-main text-white rounded-full';
  const sizeClasses = dot ? 'w-3 h-3' : 'min-w-[20px] h-5 px-1.5 text-xs font-medium';

  return (
    <div className="relative inline-flex">
      {children}
      {showBadge && (
        <span className={`
          ${baseClasses}
          ${sizeClasses}
          ${className}
        `}>
          {badgeContent}
        </span>
      )}
    </div>
  );
}); 