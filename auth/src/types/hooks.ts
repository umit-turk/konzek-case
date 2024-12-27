export interface UseAuthReturn {
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
}

export interface UseFormValidationReturn {
  errors: {
    email?: string;
    password?: string;
    name?: string;
  };
  validateEmail: (email: string) => boolean;
  validatePassword: (password: string) => boolean;
  validateName: (name: string) => boolean;
  resetErrors: () => void;
} 