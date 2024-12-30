import React, { memo } from 'react';
import { Input } from '../../../container/src/components/common/Input';
import { Button } from '../../../container/src/components/common/Button';
import { useFormValidation } from '../hooks/useFormValidation';
import type { RegisterFormProps } from '../types';

export const RegisterForm: React.FC<RegisterFormProps> = memo(({
  onSubmit,
  isLoading,
  error
}) => {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    password: '',
  });

  const { 
    errors, 
    validateEmail, 
    validatePassword, 
    validateName,
    resetErrors 
  } = useFormValidation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    resetErrors();

    const isNameValid = validateName(formData.name);
    const isEmailValid = validateEmail(formData.email);
    const isPasswordValid = validatePassword(formData.password);

    if (isNameValid && isEmailValid && isPasswordValid) {
      onSubmit(formData.name, formData.email, formData.password);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <Input
        label="Ad Soyad"
        type="text"
        value={formData.name}
        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
        error={errors.name}
        required
        placeholder="John Doe"
      />
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
        Kayıt Ol
      </Button>
    </form>
  );
}); 