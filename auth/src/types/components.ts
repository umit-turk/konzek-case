import type { User } from '../../../container/src/types/index';

export interface LoginFormProps {
  onSubmit: (email: string, password: string) => void;
  isLoading: boolean;
  error?: string;
}

export interface RegisterFormProps {
  onSubmit: (name: string, email: string, password: string) => void;
  isLoading: boolean;
  error?: string;
}

export interface AuthFormProps {
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  error?: string;
}

export interface UserProfileProps {
  user: User;
  onLogout: () => void;
} 