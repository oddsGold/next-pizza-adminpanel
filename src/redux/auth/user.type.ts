export interface Tokens {
  access_token: string | null;
  refresh_token: string | null;
  token_type: string | null;
}

export interface RefreshTokenResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
}

export interface userRequest {
  email: string;
  password: string;
}

export interface RegisterFormValues {
  username: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export interface registerRequest {
  username: string;
  email: string;
  password: string;
}

export interface registerResponse {
  id: number,
  username: string,
  email: string,
  position?: string,
  first_name?: string,
  last_name?: string,
  avatar_url?: string,
  role_id?: number
}

export interface TokenState {
  tokens: Tokens | null;
}