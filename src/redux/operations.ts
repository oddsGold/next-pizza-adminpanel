import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query/react';
import { RootState } from './store.ts';
import { logOut, setToken } from './auth/slice.ts';
import { RefreshTokenResponse } from './auth/user.type.ts';
import { selectRefreshToken } from './auth/selectors.ts';

const getCsrfToken = () => {
  const name = 'XSRF-TOKEN=';
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    while (cookie.charAt(0) === ' ') cookie = cookie.substring(1);
    if (cookie.indexOf(name) === 0)
      return cookie.substring(name.length, cookie.length);
  }
  return null;
};

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://quaint-hertha-irc-plt-3d770cd9.koyeb.app',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;

    const token = state.auth.tokens?.access_token;

    if (token) headers.set('Authorization', `Bearer ${token}`);

    const csrfToken = getCsrfToken();
    if (csrfToken) headers.set('X-Xsrf-Token', csrfToken);

    headers.set('Content-Type', 'application/json');
    headers.set('Access-Control-Allow-Origin', '*');

    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError,
  {},
  FetchBaseQueryMeta
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  const state = api.getState() as RootState;
  const refreshToken = selectRefreshToken(state);

  if (result?.error?.status === 401) {
    try {
      const refreshResult = await baseQuery(
        {
          url: '/auth/refresh',
          method: 'POST',
          body: { refresh_token: refreshToken },
          headers: {
            Accept: 'application/json',
          },
        },
        api,
        extraOptions,
      );

      const data = refreshResult.data as RefreshTokenResponse;

      console.log("/auth/refresh", data);

      if (data) {

        api.dispatch(setToken(data));

        result = await baseQuery(args, api, extraOptions);
      } else {
        api.dispatch(logOut());
      }
    } catch (error) {
      api.dispatch(logOut());
    }
  }

  return result;
};

export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['user', 'roles', 'boards'],
  endpoints: () => ({}),
});
