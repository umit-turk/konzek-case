import { ReactNode } from 'react';

export interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  showToast?: (message: string, type: 'error' | 'warning' | 'success' | 'info') => void;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
} 