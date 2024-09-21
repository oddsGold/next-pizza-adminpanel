import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RefreshTokenResponse, Tokens, TokenState } from './user.type.ts';
import { login, logout } from './authApiSlice.ts';

const initialState: TokenState = {
  tokens: {
    access_token: null,
    refresh_token: null,
    token_type: null,
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<Tokens>) => {
      state.tokens = action.payload;
    },
    logOut: (state) => {
      state.tokens = {
        access_token: null,
        refresh_token: null,
        token_type: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(login.matchFulfilled, (state, action: PayloadAction<RefreshTokenResponse>) => {
      state.tokens = action.payload;
    });
    builder.addMatcher(logout.matchFulfilled, (state) => {
      state.tokens = null;
    });
  }
});

export const { setToken, logOut } = authSlice.actions;

export default authSlice.reducer;