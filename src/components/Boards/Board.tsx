import React from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import List from './List';
import { BoardDetailsResponse } from '../../redux/boards/boards.type.ts';

interface BoardProps {
  board: BoardDetailsResponse;
  onDragEnd: (result: any) => void;
}

const Board: React.FC<BoardProps> = ({ board, onDragEnd }) => {
  return (
    <div className="board bg-gray-200 p-4 rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">{board.name}</h2>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={String(board.id)} type="LIST" direction="horizontal">
          {(provided) => (
            <div
              className="list-container flex space-x-4"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {board.lists.map((list, index) => (
                <List key={list.id} list={list} index={index} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default Board;
