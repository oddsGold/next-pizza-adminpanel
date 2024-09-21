import { api } from '../operations.js';
import { UserRequest, UserResponse } from './userInfo.type.ts';

export const usersApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    user: builder.query<UserResponse, string>({
      query: (token: string) => ({
        url: '/users/get-user-by-refresh',
        method: 'POST',
        body: { refresh_token: token },
      }),
      providesTags: ['user'],
    }),
    updateUser: builder.mutation<UserResponse, UserRequest>({
      query: (userRequest: UserRequest) => ({
        url: `/users/${userRequest.id}`,
        method: 'PUT',
        body: userRequest,
      }),
      invalidatesTags: ['user'],
    }),
  }),
});

export const { useUserQuery, useUpdateUserMutation } = usersApiSlice;
