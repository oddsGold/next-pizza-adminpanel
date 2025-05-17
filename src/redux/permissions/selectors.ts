import { RootState } from '../store.ts';

export const selectPermission = (state: RootState) => state.permission.permissions;