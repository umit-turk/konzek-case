import { NavigateOptions } from 'react-router-dom';

export type CustomNavigate = (to: string, options?: NavigateOptions) => void;

export interface UseNavigationReturn {
  navigate: CustomNavigate;
  goBack: () => void;
  goForward: () => void;
} 