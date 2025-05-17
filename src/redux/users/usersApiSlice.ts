import { api } from '../operations.js';
import { UserAdminResponse, UserClientResponse, UserRequest } from './userInfo.type.ts';

export const usersApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    user: builder.query<UserAdminResponse, void>({
      query: () => ({
        url: '/account',
      }),
      transformResponse: (response: { data: { user: UserAdminResponse } }) => response.data.user,
      providesTags: ['user'],
    }),
    updateUser: builder.mutation<UserAdminResponse, UserRequest>({
      query: (userRequest: UserRequest) => ({
        url: `/users/${userRequest.id}`,
        method: 'PUT',
        body: userRequest,
      }),
      invalidatesTags: ['user'],
    }),
    getAdminUsers: builder.query<UserAdminResponse[], { page: number; perPage: number; sortBy: string; sortOrder: 'asc' | 'desc' }>({
      query: ({ page, perPage, sortBy, sortOrder }) => ({
        url: '/admin/users',
        params: { page, perPage, sortBy, sortOrder },
      }),
      transformResponse: (response: { data: UserAdminResponse[] }) => response.data,
      providesTags: ['adminUser'],
    }),
    getClientUsers: builder.query<UserClientResponse[], void>({
      query: () => ({
        url: '/client/users',
      }),
      transformResponse: (response: { data: UserClientResponse[] }) => response.data,
      providesTags: ['clientUser'],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/admin/user/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['adminUser', 'clientUser'],
    }),
  }),
});

export const {
  useUserQuery,
  useUpdateUserMutation,
  useGetAdminUsersQuery,
  useGetClientUsersQuery,
  useDeleteUserMutation
} = usersApiSlice;
