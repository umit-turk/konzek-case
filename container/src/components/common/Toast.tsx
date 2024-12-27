import React, { JSX, memo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../store';
import { hideToast } from '../../store/slices/toastSlice';

type ToastVariant = 'success' | 'error' | 'info' | 'warning';

const variantClasses: Record<ToastVariant, string> = {
  success: 'bg-success-main text-white',
  error: 'bg-error-main text-white',
  info: 'bg-info-main text-white',
  warning: 'bg-warning-main text-white'
};

const variantIcons: Record<ToastVariant, JSX.Element> = {
  success: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  ),
  error: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  info: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  warning: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  )
};

const Toast: React.FC = memo(() => {
  const dispatch = useDispatch();
  const { isVisible, message, type, duration = 3000 } = useSelector((state: RootState) => state.toast);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        dispatch(hideToast());
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, dispatch]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-slide-up">
      <div 
        className={`
          flex items-center space-x-2 px-4 py-3 rounded-lg shadow-lg
          ${variantClasses[type as ToastVariant]}
        `}
        role="alert"
      >
        {variantIcons[type as ToastVariant]}
        <p>{message}</p>
        <button
          onClick={() => dispatch(hideToast())}
          className="ml-4 hover:opacity-80 focus:outline-none"
          aria-label="Bildirimi kapat"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
});

export default Toast; 