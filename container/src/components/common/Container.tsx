import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  className?: string;
}

const Container: React.FC<ContainerProps> = ({
  children,
  maxWidth = 'lg',
  className = '',
}) => {
  const maxWidthClasses = {
    xs: 'max-w-xs',
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    full: 'max-w-full',
  };

  const classes = [
    'w-full',
    'mx-auto',
    'px-4',
    maxWidthClasses[maxWidth],
    className,
  ].join(' ');

  return (
    <div className={classes}>
      {children}
    </div>
  );
};

export default Container; 