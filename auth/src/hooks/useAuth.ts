import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useCustomNavigate } from '../../../container/src/utils/navigation';
import { AUTH_MESSAGES } from '../constants/messages';
import type { UseAuthReturn } from '../types';

export const useAuth = (): UseAuthReturn => {
  const dispatch = useDispatch();
  const navigate = useCustomNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);

      // Demo login - gerçek API çağrısı burada yapılacak
      dispatch({
        type: 'auth/login',
        payload: {
          user: {
            id: '1',
            email,
            name: 'Test Kullanıcı',
          },
          token: 'dummy-token',
        },
      });

      dispatch({
        type: 'toast/showToast',
        payload: {
          message: AUTH_MESSAGES.LOGIN_SUCCESS,
          type: 'success',
        },
      });

      navigate.navigate('/');
    } catch (err) {
      setError(AUTH_MESSAGES.LOGIN_ERROR);
      dispatch({
        type: 'toast/showToast',
        payload: {
          message: AUTH_MESSAGES.LOGIN_ERROR,
          type: 'error',
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);

      // Demo register - gerçek API çağrısı burada yapılacak
      dispatch({
        type: 'auth/register',
        payload: {
          user: {
            id: '1',
            email,
            name,
          },
          token: 'dummy-token',
        },
      });

      dispatch({
        type: 'toast/showToast',
        payload: {
          message: AUTH_MESSAGES.REGISTER_SUCCESS,
          type: 'success',
        },
      });

      navigate.navigate('/');
    } catch (err) {
      setError(AUTH_MESSAGES.REGISTER_ERROR);
      dispatch({
        type: 'toast/showToast',
        payload: {
          message: AUTH_MESSAGES.REGISTER_ERROR,
          type: 'error',
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    dispatch({ type: 'auth/logout' });
    dispatch({
      type: 'toast/showToast',
      payload: {
        message: AUTH_MESSAGES.LOGOUT_SUCCESS,
        type: 'success',
      },
    });
    navigate.navigate('/auth');
  };

  return {
    login,
    register,
    logout,
    isLoading,
    error,
  };
}; 