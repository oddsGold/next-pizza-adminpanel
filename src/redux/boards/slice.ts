import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { boards } from './boardsApiSlice.ts';
import { BoardsResponse } from './boards.type.ts';

interface BoardState {
  boards: BoardsResponse[] | null;
}

const initialState: BoardState = {
  boards: null,
};

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      boards.matchFulfilled,
      (state, action: PayloadAction<BoardsResponse[]>) => {
        state.boards = action.payload;
      }
    );
  },
});


export default boardSlice.reducer;