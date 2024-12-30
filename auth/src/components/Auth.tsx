import React, { memo } from 'react';
import { useAuth } from '../hooks/useAuth';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import { AuthForm } from './AuthForm';

export const Auth: React.FC = memo(() => {
  const [isLoginMode, setIsLoginMode] = React.useState(true);
  const { login, register, isLoading, error } = useAuth();

  const toggleMode = () => setIsLoginMode(prev => !prev);

  return (
    <AuthForm
      title={isLoginMode ? 'Giriş Yap' : 'Kayıt Ol'}
      error={error}
      footer={
        <button
          onClick={toggleMode}
          className="text-primary-main hover:text-primary-dark transition-colors duration-normal"
        >
          {isLoginMode ? 'Hesabınız yok mu? Kayıt olun' : 'Zaten hesabınız var mı? Giriş yapın'}
        </button>
      }
    >
      {isLoginMode ? (
        <LoginForm
          onSubmit={login}
          isLoading={isLoading}
          error={error}
        />
      ) : (
        <RegisterForm
          onSubmit={register}
          isLoading={isLoading}
          error={error}
        />
      )}
    </AuthForm>
  );
}); 

export default Auth;