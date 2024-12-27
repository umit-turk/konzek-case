import React from 'react';
import { theme } from '../../styles/theme';

interface CardProps {
  children: React.ReactNode;
  variant?: 'elevation' | 'outlined';
  elevation?: 1 | 2 | 3;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'elevation',
  elevation = 1,
  className,
  style,
  onClick,
}) => {
  const getCardStyles = (): React.CSSProperties => {
    const baseStyles: React.CSSProperties = {
      backgroundColor: theme.colors.background.paper,
      borderRadius: theme.shape.borderRadius.medium,
      padding: theme.spacing.lg,
      transition: `all ${theme.transitions.duration.standard}ms ${theme.transitions.easing.easeInOut}`,
      cursor: onClick ? 'pointer' : 'default',
    };

    if (variant === 'elevation') {
      return {
        ...baseStyles,
        boxShadow: theme.shadows[elevation],
        '&:hover': onClick ? {
          boxShadow: theme.shadows[elevation],
          transform: 'translateY(-2px)',
        } : undefined,
      };
    }

    return {
      ...baseStyles,
      border: `1px solid ${theme.colors.grey[300]}`,
      '&:hover': onClick ? {
        borderColor: theme.colors.grey[400],
        backgroundColor: theme.colors.grey[50],
      } : undefined,
    };
  };

  return (
    <div
      className={className}
      style={{
        ...getCardStyles(),
        ...style,
      }}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card; 