import { useState, useCallback } from 'react';
import { VALIDATION_RULES } from '../constants/validation';
import { AUTH_MESSAGES } from '../constants/messages';
import type { UseFormValidationReturn } from '../types';

export const useFormValidation = (): UseFormValidationReturn => {
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    name?: string;
  }>({});

  const validateEmail = useCallback((email: string): boolean => {
    if (!email) {
      setErrors(prev => ({ ...prev, email: AUTH_MESSAGES.VALIDATION.EMAIL_REQUIRED }));
      return false;
    }

    if (!VALIDATION_RULES.EMAIL.PATTERN.test(email)) {
      setErrors(prev => ({ ...prev, email: AUTH_MESSAGES.VALIDATION.EMAIL_INVALID }));
      return false;
    }

    setErrors(prev => ({ ...prev, email: undefined }));
    return true;
  }, []);

  const validatePassword = useCallback((password: string): boolean => {
    if (!password) {
      setErrors(prev => ({ ...prev, password: AUTH_MESSAGES.VALIDATION.PASSWORD_REQUIRED }));
      return false;
    }

    if (password.length < VALIDATION_RULES.PASSWORD.MIN_LENGTH) {
      setErrors(prev => ({ ...prev, password: AUTH_MESSAGES.VALIDATION.PASSWORD_MIN_LENGTH }));
      return false;
    }

    setErrors(prev => ({ ...prev, password: undefined }));
    return true;
  }, []);

  const validateName = useCallback((name: string): boolean => {
    if (!name) {
      setErrors(prev => ({ ...prev, name: AUTH_MESSAGES.VALIDATION.NAME_REQUIRED }));
      return false;
    }

    if (name.length < VALIDATION_RULES.NAME.MIN_LENGTH) {
      setErrors(prev => ({ ...prev, name: AUTH_MESSAGES.VALIDATION.NAME_MIN_LENGTH }));
      return false;
    }

    setErrors(prev => ({ ...prev, name: undefined }));
    return true;
  }, []);

  const resetErrors = useCallback(() => {
    setErrors({});
  }, []);

  return {
    errors,
    validateEmail,
    validatePassword,
    validateName,
    resetErrors,
  };
}; 