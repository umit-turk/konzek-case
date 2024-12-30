import React, { memo } from 'react';
import type { AuthFormProps } from '../types';

export const AuthForm: React.FC<AuthFormProps> = memo(({
  title,
  children,
  footer,
  error
}) => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-auth">
      <div className="bg-background-main rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 md:p-8">
          <h2 className="text-2xl font-semibold text-text-primary text-center mb-6">
            {title}
          </h2>
          {children}
          {error && (
            <p className="text-error-main text-sm mt-2 text-center">
              {error}
            </p>
          )}
          {footer && (
            <div className="mt-6 text-center">
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}); 