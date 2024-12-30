import React, { memo } from 'react';

export const LoadingSpinner: React.FC = memo(() => {
  return (
    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-primary-main" />
  );
}); 