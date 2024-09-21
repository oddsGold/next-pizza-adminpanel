import { RootState } from '../store.ts';
import { createSelector } from '@reduxjs/toolkit';

export const selectToken = (state: RootState) => state.auth.tokens?.access_token;
export const selectRefreshToken = (state: RootState) => state.auth.tokens?.refresh_token;

export const selectValidatedRefreshToken = createSelector(
  [selectRefreshToken],
  (refreshToken) => {
    if (!refreshToken) {
      throw new Error("Refresh token is not available");
    }
    return refreshToken;
  }
);
