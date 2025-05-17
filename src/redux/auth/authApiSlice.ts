import { api } from '../operations.ts';
import {
  registerRequest,
  registerResponse,
  Tokens,
  userRequest
} from './user.type.ts';

export const authApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<registerResponse, registerRequest>({
      query: (registerRequest) => ({
        url: '/auth/register',
        method: 'POST',
        body: registerRequest,
      }),
      transformResponse: (response: { data: registerResponse }) => {
        return response.data;
      },
    }),
    login: builder.mutation<Tokens, userRequest>({
      query: (userRequest) => ({
        url: '/auth/login',
        method: 'POST',
        body: userRequest,
      }),
      transformResponse: (response: { data: Tokens }) => {
        return response.data;
      },
      invalidatesTags: ['user'],
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
    }),
  }),
});

export const { register, login, logout } = authApiSlice.endpoints;

export const { useRegisterMutation, useLoginMutation, useLogoutMutation } =
  authApiSlice;
