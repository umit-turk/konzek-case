import { useNavigate, NavigateOptions } from 'react-router-dom';
import { useDispatch } from 'react-redux';

export const useCustomNavigate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (to: string, options?: NavigateOptions) => {
    // URL'i güncelle
    navigate(to, options);

    // Analytics için event gönder
    dispatch({
      type: 'analytics/pageView',
      payload: { path: to, timestamp: new Date().toISOString() }
    });

    // Loading state'i güncelle
    dispatch({ type: 'ui/setLoading', payload: true });
    
    // Loading state'i temizle
    setTimeout(() => {
      dispatch({ type: 'ui/setLoading', payload: false });
    }, 500);
  };
}; 