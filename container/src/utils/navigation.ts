import { useNavigate, NavigateOptions } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import type { UseNavigationReturn } from '../types/hooks';

export const useCustomNavigate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const customNavigate: UseNavigationReturn['navigate'] = (to: string, options?: NavigateOptions) => {
    navigate(to, options);
    dispatch({
      type: 'analytics/pageView',
      payload: { path: to, timestamp: new Date().toISOString() }
    });
  };

  return {
    navigate: customNavigate,
    goBack: () => navigate(-1),
    goForward: () => navigate(1)
  };
}; 