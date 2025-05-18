import { api } from '../operations.js';
import { RoleResponse } from './role.type.ts';

export const rolesApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    roles: builder.query<RoleResponse[], void>({
      query: () => ({
        url: '/roles'
      }),
      providesTags: ['roles'],
      transformResponse: (response: { data: RoleResponse[] }) => response.data,
    }),
  }),
});

export const { useRolesQuery } = rolesApiSlice;
