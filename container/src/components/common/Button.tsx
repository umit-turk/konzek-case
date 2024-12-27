import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'contained' | 'outlined' | 'text';
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'success';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'contained',
  color = 'primary',
  size = 'medium',
  fullWidth = false,
  className = '',
  children,
  ...props
}) => {
  const baseClasses = 'rounded-md font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const sizeClasses = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-4 py-2',
    large: 'px-6 py-3 text-lg',
  };

  const variantClasses = {
    contained: {
      primary: 'bg-primary-main hover:bg-primary-dark text-white focus:ring-primary-main',
      secondary: 'bg-secondary-main hover:bg-secondary-dark text-white focus:ring-secondary-main',
      error: 'bg-error-main hover:bg-error-dark text-white focus:ring-error-main',
      warning: 'bg-warning-main hover:bg-warning-dark text-white focus:ring-warning-main',
      success: 'bg-success-main hover:bg-success-dark text-white focus:ring-success-main',
    },
    outlined: {
      primary: 'border-2 border-primary-main text-primary-main hover:bg-primary-main hover:text-white focus:ring-primary-main',
      secondary: 'border-2 border-secondary-main text-secondary-main hover:bg-secondary-main hover:text-white focus:ring-secondary-main',
      error: 'border-2 border-error-main text-error-main hover:bg-error-main hover:text-white focus:ring-error-main',
      warning: 'border-2 border-warning-main text-warning-main hover:bg-warning-main hover:text-white focus:ring-warning-main',
      success: 'border-2 border-success-main text-success-main hover:bg-success-main hover:text-white focus:ring-success-main',
    },
    text: {
      primary: 'text-primary-main hover:bg-primary-main hover:bg-opacity-10 focus:ring-primary-main',
      secondary: 'text-secondary-main hover:bg-secondary-main hover:bg-opacity-10 focus:ring-secondary-main',
      error: 'text-error-main hover:bg-error-main hover:bg-opacity-10 focus:ring-error-main',
      warning: 'text-warning-main hover:bg-warning-main hover:bg-opacity-10 focus:ring-warning-main',
      success: 'text-success-main hover:bg-success-main hover:bg-opacity-10 focus:ring-success-main',
    },
  };

  const classes = [
    baseClasses,
    sizeClasses[size],
    variantClasses[variant][color],
    fullWidth ? 'w-full' : '',
    className,
  ].join(' ');

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

export default Button; 