import React, { memo } from 'react';
import type { BaseInputProps } from '../../types/index';

export const Input: React.FC<BaseInputProps> = memo(({
  label,
  error,
  type = 'text',
  placeholder,
  value,
  onChange,
  disabled = false,
  required = false,
  className = ''
}) => {
  const inputId = React.useId();
  
  const baseClasses = 'w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 transition-colors duration-200';
  const stateClasses = error
    ? 'border-error-main focus:border-error-main focus:ring-error-light'
    : 'border-gray-300 focus:border-primary-main focus:ring-primary-light';
  const disabledClasses = disabled ? 'bg-gray-100 cursor-not-allowed' : '';

  return (
    <div className="flex flex-col space-y-1">
      {label && (
        <label 
          htmlFor={inputId}
          className="text-sm font-medium text-gray-700"
        >
          {label}
          {required && <span className="text-error-main ml-1">*</span>}
        </label>
      )}
      
      <input
        id={inputId}
        type={type}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        placeholder={placeholder}
        className={`
          ${baseClasses}
          ${stateClasses}
          ${disabledClasses}
          ${className}
        `}
      />
      
      {error && (
        <p className="text-sm text-error-main mt-1">
          {error}
        </p>
      )}
    </div>
  );
}); 