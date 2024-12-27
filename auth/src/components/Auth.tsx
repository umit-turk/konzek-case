import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useCustomNavigate } from '../../../container/src/utils/navigation';

const Auth: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useCustomNavigate();
  const [authState, setAuthState] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Demo login
    dispatch({
      type: 'auth/login',
      payload: {
        user: {
          id: '1',
          email: authState.email,
          name: 'Test Kullanıcı',
        },
        token: 'dummy-token',
      },
    });
    dispatch({
      type: 'toast/showToast',
      payload: {
        message: 'Başarıyla giriş yaptınız!',
        type: 'success',
      },
    });
    navigate('/');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <div className="card">
        <div className="p-6 md:p-8">
          <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
            Giriş Yap
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label 
                htmlFor="email" 
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                E-posta
              </label>
              <input
                type="email"
                id="email"
                value={authState.email}
                onChange={(e) => setAuthState(prev => ({ ...prev, email: e.target.value }))}
                className="input"
                required
                placeholder="ornek@email.com"
              />
            </div>
            <div>
              <label 
                htmlFor="password" 
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Şifre
              </label>
              <input
                type="password"
                id="password"
                value={authState.password}
                onChange={(e) => setAuthState(prev => ({ ...prev, password: e.target.value }))}
                className="input"
                required
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary w-full mt-6"
            >
              Giriş Yap
            </button>
          </form>
          <p className="mt-6 text-sm text-gray-600 text-center">
            * Demo giriş için herhangi bir e-posta ve şifre girebilirsiniz
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth; 