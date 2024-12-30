import { ReactNode } from 'react';

export interface ContainerProps {
  children: ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  className?: string;
  component?: keyof HTMLElementTagNameMap;
} 