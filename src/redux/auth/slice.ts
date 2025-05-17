import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { registerResponse, Tokens, TokenState } from './user.type.ts';
import { login, logout, register } from './authApiSlice.ts';

const initialState: TokenState = {
  tokens: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<Tokens>) => {
      state.tokens = action.payload;
    },
    logOut: (state) => {
      state.tokens = null;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(login.matchFulfilled, (state, action: PayloadAction<Tokens>) => {
      state.tokens = action.payload;
    });
    builder.addMatcher(logout.matchFulfilled, (state) => {
      state.tokens = null;
    });
    builder.addMatcher(register.matchFulfilled, (state, action: PayloadAction<registerResponse>) => {
      state.tokens = { accessToken: action.payload.accessToken };
    });
  }
});

export const { setToken, logOut } = authSlice.actions;

export default authSlice.reducer;