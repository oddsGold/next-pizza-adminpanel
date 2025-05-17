import { RootState } from '../store.ts';

export const selectToken = (state: RootState) => state.auth.tokens?.accessToken;