export interface LoginRequest {
  username: string;
  password: string;
}

export interface Session {
  username: string;
  session_token: string;
  refresh_token: string;
}

export interface AuthState {
  user: Session | null;
  loading: boolean;
  error: string | null;
}
