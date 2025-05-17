import { menusApiSlice } from './menusApiSlice.ts';
import { RootState } from '../store.ts';
import { createSelector } from '@reduxjs/toolkit';
import { MenuItem } from './menus.type.ts';


const selectMenus = menusApiSlice.endpoints.menus.select();
export const menuItems = (state: RootState) => selectMenus(state)?.data;

export const selectMenusWithoutChildren = createSelector(
  [selectMenus],
  (menusData) => {
    const menus: MenuItem[] = menusData?.data || [];

    return menus.map(menu => {
      const { children, ...rest } = menu;
      return rest;
    });
  }
);