import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/auth/slice.js';
import userReducer from "../redux/users/slice.js";
import menuReducer from "../redux/menus/slice.ts";
import resourceReducer from "../redux/resources/slice.ts";
import permissionReducer from "../redux/permissions/slice.ts";

import roleReducer from "../redux/roles/slice.ts";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { api } from './operations.ts';
import { TokenState } from './auth/user.type.ts';

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['tokens'],
};

const persistedAuthReducer = persistReducer<TokenState>(
  authPersistConfig,
  authReducer,
);

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: persistedAuthReducer,
    user: userReducer,
    menu: menuReducer,
    resource: resourceReducer,
    role: roleReducer,
    permission: permissionReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
