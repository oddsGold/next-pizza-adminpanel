import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { availablePermission, AvailablePermissionState } from './permissions.type.ts';

const initialState: AvailablePermissionState = {
  permissions: [],
};

const permissionSlice = createSlice({
  name: 'permission',
  initialState,
  reducers: {
    setPermissions: (state, action: PayloadAction<availablePermission[]>) => {
      state.permissions = action.payload;
    },
  },
});


export const { setPermissions } = permissionSlice.actions;
export default permissionSlice.reducer;