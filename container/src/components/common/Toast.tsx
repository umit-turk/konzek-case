import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../store';

const Toast: React.FC = () => {
  const dispatch = useDispatch();
  const { isVisible, message, type, duration } = useSelector((state: RootState) => state.toast);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        dispatch({ type: 'toast/hideToast' });
      }, duration || 3000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, dispatch]);

  if (!isVisible) return null;

  const getTypeClasses = () => {
    switch (type) {
      case 'success':
        return 'bg-success-main';
      case 'error':
        return 'bg-error-main';
      case 'warning':
        return 'bg-warning-main';
      default:
        return 'bg-primary-main';
    }
  };

  return (
    <div className={`
      fixed bottom-4 right-4 
      min-w-[300px] max-w-md 
      p-4 rounded-lg shadow-lg 
      text-white
      transform transition-all duration-300 ease-in-out
      ${getTypeClasses()}
    `}>
      {message}
    </div>
  );
};

export default Toast; 