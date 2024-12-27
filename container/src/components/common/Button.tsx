import React, { memo } from 'react';
import type { BaseButtonProps } from '../../types/index';
import LoadingSpinner from './LoadingSpinner';

type VariantType = 'primary' | 'secondary' | 'outline' | 'text';
type SizeType = 'small' | 'medium' | 'large';

const variantClasses: Record<VariantType, string> = {
  primary: 'bg-primary-main text-white hover:bg-primary-dark',
  secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
  outline: 'border-2 border-primary-main text-primary-main hover:bg-primary-main hover:text-white',
  text: 'text-primary-main hover:text-primary-dark'
};

const sizeClasses: Record<SizeType, string> = {
  small: 'px-3 py-1 text-sm',
  medium: 'px-4 py-2',
  large: 'px-6 py-3 text-lg'
};

export const Button: React.FC<BaseButtonProps> = memo(({
  children,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  disabled = false,
  loading = false,
  onClick,
  type = 'button',
  className = ''
}) => {
  const baseClasses = 'rounded font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-light disabled:opacity-50 disabled:cursor-not-allowed';
  const widthClass = fullWidth ? 'w-full' : '';
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        ${baseClasses}
        ${variantClasses[variant as VariantType]}
        ${sizeClasses[size as SizeType]}
        ${widthClass}
        ${className}
      `}
    >
      {loading ? (
        <div className="flex items-center justify-center">
          <LoadingSpinner size="small" />
          <span className="ml-2">Yükleniyor...</span>
        </div>
      ) : children}
    </button>
  );
}); 