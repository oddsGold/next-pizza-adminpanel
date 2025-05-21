import { api } from '../operations.js';
import { RoleRequest, RoleResponse } from './role.type.ts';

export const rolesApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    roles: builder.query<RoleResponse[], void>({
      query: () => ({
        url: '/roles',
      }),
      providesTags: ['roles'],
      transformResponse: (response: { data: RoleResponse[] }) => response.data,
    }),
    addRole: builder.mutation<RoleResponse[], RoleRequest>({
      query: (RoleRequest) => ({
        url: '/roles',
        method: 'POST',
        body: RoleRequest,
      }),
      invalidatesTags: ['roles'],
      transformResponse: (response: { data: RoleResponse[] }) => response.data,
    }),
    deleteRole: builder.mutation<void, { id: string }>({
      query: ({ id }) => ({
        url: `/roles/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['roles'],
    }),
  }),
});

export const {
  useRolesQuery,
  useAddRoleMutation,
  useDeleteRoleMutation
} = rolesApiSlice;
