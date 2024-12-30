import React, { memo } from 'react';
import { Input } from '../../../container/src/components/common/Input';
import { Button } from '../../../container/src/components/common/Button';
import { useFormValidation } from '../hooks/useFormValidation';
import type { LoginFormProps } from '../types';

export const LoginForm: React.FC<LoginFormProps> = memo(({
  onSubmit,
  isLoading,
  error
}) => {
  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
  });

  const { errors, validateEmail, validatePassword, resetErrors } = useFormValidation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    resetErrors();

    const isEmailValid = validateEmail(formData.email);
    const isPasswordValid = validatePassword(formData.password);

    if (isEmailValid && isPasswordValid) {
      onSubmit(formData.email, formData.password);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <Input
        label="E-posta"
        type="email"
        value={formData.email}
        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
        error={errors.email}
        required
        placeholder="ornek@email.com"
      />
      <Input
        label="Şifre"
        type="password"
        value={formData.password}
        onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
        error={errors.password}
        required
        placeholder="••••••••"
      />
      {error && (
        <p className="text-error-main text-sm mt-2 text-center">
          {error}
        </p>
      )}
      <Button
        type="submit"
        fullWidth
        loading={isLoading}
        disabled={isLoading}
      >
        Giriş Yap
      </Button>
    </form>
  );
}); 