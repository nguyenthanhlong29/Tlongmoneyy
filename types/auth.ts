export interface User {
  id: string;
  name: string;
  avatar: string;
  email?: string;
}

export interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
}

export interface AuthResponse {
  token: string;
  user: User;
}
