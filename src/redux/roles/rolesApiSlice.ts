import { api } from '../operations.js';
import { Role } from './role.type.ts';

export const rolesApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    roles: builder.query<Role, void>({
      query: () => ({
        url: '/roles'
      }),
      providesTags: ['roles']
    }),
  }),
});

export const { useRolesQuery } = rolesApiSlice;
