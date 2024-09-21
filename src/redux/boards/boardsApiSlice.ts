import { api } from '../operations.js';
import { BoardsResponse, BoardDetailsResponse } from './boards.type.ts';

export const boardsApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    boards: builder.query<BoardsResponse[], void>({
      query: () => ({
        url: '/boards'
      })
    }),

    boardDetails: builder.query<BoardDetailsResponse, string>({
      query: (boardId) => ({
        url: `/boards/${boardId}`
      })
    }),

    updateListPosition: builder.mutation<void, { listId: string; newPosition: number;}>({
      query: ({ listId, newPosition }) => ({
        url: `/boards/${listId}/lists/positions`,
        method: 'PUT',
        body: { listId, newPosition },
      })
    }),

    updateCardPosition: builder.mutation<void, { cardId: string; newPosition: number }>({
      query: ({ cardId, newPosition }) => ({
        url: `/lists/${cardId}/cards/positions`,
        method: 'PUT',
        body: { cardId, newPosition },
      })
    }),
  }),
});

export const { useBoardsQuery, useBoardDetailsQuery, useUpdateListPositionMutation, useUpdateCardPositionMutation } = boardsApiSlice;
