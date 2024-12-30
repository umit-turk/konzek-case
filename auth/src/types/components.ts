import type { User } from '../../../container/src/types/index';

export interface LoginFormProps {
  onSubmit: (email: string, password: string) => void;
  isLoading: boolean;
  error?: string | null;
}

export interface RegisterFormProps {
  onSubmit: (name: string, email: string, password: string) => void;
  isLoading: boolean;
  error?: string | null;
}

export interface AuthFormProps {
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  error?: string | null;
}

export interface UserProfileProps {
  user: User;
  onLogout: () => void;
} 