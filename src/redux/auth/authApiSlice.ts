import { api } from '../operations.ts';
import {
  RefreshTokenResponse,
  registerRequest,
  registerResponse,
  userRequest,
} from './user.type.ts';

export const authApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<registerResponse, registerRequest>({
      query: (registerRequest) => {
        return {
          url: '/auth/register',
          method: 'POST',
          body: registerRequest,
        };
      },
    }),
    login: builder.mutation<RefreshTokenResponse, userRequest>({
      query: (userRequest) => {
        return {
          url: '/auth/login',
          method: 'POST',
          body: userRequest,
        };
      },
    }),
    logout: builder.mutation({
      query: (token: string) => ({
        url: '/auth/logout',
        method: 'POST',
        body: { refresh_token: token },
      }),
    }),
  }),
});

export const { login, logout } = authApiSlice.endpoints;

export const { useRegisterMutation, useLoginMutation, useLogoutMutation } =
  authApiSlice;
