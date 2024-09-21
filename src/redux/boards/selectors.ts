import { RootState } from '../store.ts';

export const selectBoards = (state: RootState) => state.boards.boards;
