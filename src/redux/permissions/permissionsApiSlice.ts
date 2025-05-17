import { api } from '../operations.js';
import { availablePermission, Permission } from './permissions.type.ts';

export const menusApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    availablePermissions: builder.query<availablePermission[], void>({
      query: () => ({
        url: '/me/permissions'
      }),
      providesTags: ['me-permissions'],
      transformResponse: (response: { data: availablePermission[] }) => response.data,
    }),
    permissions: builder.query<Permission[], void>({
      query: () => ({
        url: '/permissions'
      }),
      providesTags: ['all-permissions'],
      transformResponse: (response: { data: Permission[] }) => response.data,
    }),
  }),
});

export const {
  useAvailablePermissionsQuery,
  usePermissionsQuery
} = menusApiSlice;
