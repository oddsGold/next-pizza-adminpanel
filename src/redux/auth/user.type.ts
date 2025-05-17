export interface Tokens {
  accessToken: string;
}

export interface userRequest {
  email: string;
  password: string;
}

export interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export interface registerRequest {
  name: string;
  email: string;
  password: string;
}

export interface registerResponse {
  id: number;
  username: string;
  email: string;
  position?: string;
  first_name?: string;
  last_name?: string;
  avatar_url?: string;
  role_id?: number;
  accessToken: string;
}

export interface TokenState {
  tokens: Tokens | null;
}