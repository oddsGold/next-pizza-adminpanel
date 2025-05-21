import { api } from '../operations.js';
import { Resource } from './resources.type.ts';

export const menusApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    resources: builder.query<Resource[], void>({
      query: () => ({
        url: '/resources'
      }),
      providesTags: ['resources'],
      transformResponse: (response: { data: Resource[] }) => response.data,
    }),
  }),
});

export const {
  useResourcesQuery
} = menusApiSlice;
