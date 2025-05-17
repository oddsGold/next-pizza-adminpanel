import { api } from '../operations.js';
import { MenuItem, menuRequest } from './menus.type.ts';

export const menusApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    menus: builder.query<MenuItem[], void>({
      query: () => ({
        url: '/me/menu'
      }),
      providesTags: ['menus'],
      transformResponse: (response: { data: MenuItem[] }) => response.data,
    }),
    allMenus: builder.query<MenuItem[], void>({
      query: () => ({
        url: '/menu'
      }),
      providesTags: ['menus'],
      transformResponse: (response: { data: MenuItem[] }) => response.data,
    }),
    addMenuItem: builder.mutation<MenuItem[], menuRequest>({
      query: (menuRequest) => ({
        url: '/menu',
        method: 'POST',
        body: menuRequest,
      }),
      transformResponse: (response: { data: MenuItem[] }) => response.data,
      invalidatesTags: ['menus'],
    }),
  }),
});

export const {
  useMenusQuery,
  useAllMenusQuery,
  useAddMenuItemMutation
} = menusApiSlice;
