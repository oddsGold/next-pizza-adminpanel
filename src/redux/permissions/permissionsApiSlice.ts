import { api } from '../operations.js';
import {
  availablePermission,
  GroupedPermissions,
  Permission,
  permissionRequest, PermissionRequestPayload, PermissionResponsePayload
} from './permissions.type.ts';

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
      providesTags: ['get-permissions'],
      transformResponse: (response: { data: Permission[] }) => response.data,
    }),
    getAllPermissions: builder.query<GroupedPermissions[], void>({
      query: () => ({
        url: '/all/permissions'
      }),
      providesTags: ['all-permissions'],
      transformResponse: (response: { data: GroupedPermissions[] }) => response.data,
    }),
    addPermission: builder.mutation<Permission[], permissionRequest>({
      query: (permissionRequest) => ({
        url: '/permissions',
        method: 'POST',
        body: permissionRequest,
      }),
      invalidatesTags: ['all-permissions'],
      transformResponse: (response: { data: Permission[] }) => response.data,
    }),
    getPermissionByRoleAndResource: builder.query<PermissionResponsePayload, { roleId: string; resourceId: string }>({
      query: ({ roleId, resourceId }) => ({
        url: `/roles/${roleId}/permissions/${resourceId}`,
        method: 'GET',
      }),
      providesTags: (_result, _error, { roleId, resourceId }) => [
        { type: 'permissions', id: `${roleId}-${resourceId}` },
      ],
      transformResponse: (response: { data: PermissionResponsePayload }) => response.data,
    }),
    editPermission: builder.mutation<Permission[], PermissionRequestPayload>({
      query: (PermissionRequestPayload) => ({
        url: `/roles/${PermissionRequestPayload.roleId}/permissions/${PermissionRequestPayload.resourceId}`,
        method: 'PUT',
        body: PermissionRequestPayload,
      }),
      invalidatesTags: (_result, _error,  { roleId, resourceId }) => [
        'all-permissions',
        'me-menus',
        { type: 'permissions', id: `${roleId}-${resourceId}` },
      ],
      transformResponse: (response: { data: Permission[] }) => response.data,
    }),
    deletePermissionByRoleAndResource: builder.mutation<void, { roleId: string; resourceId: string }>({
      query: ({ roleId, resourceId }) => ({
        url: `/roles/${roleId}/permissions/${resourceId}`,
        method: 'DELETE',
      }),
      invalidatesTags:['all-permissions',  'me-menus']
    }),
  }),
});

export const {
  useAvailablePermissionsQuery,
  usePermissionsQuery,
  useGetAllPermissionsQuery,
  useAddPermissionMutation,
  useGetPermissionByRoleAndResourceQuery,
  useEditPermissionMutation,
  useDeletePermissionByRoleAndResourceMutation
} = menusApiSlice;
