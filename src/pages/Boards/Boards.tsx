import React, { useState } from 'react';
import Loader from '../../common/Loader';
import { useBoardDetailsQuery, useUpdateListPositionMutation, useUpdateCardPositionMutation } from '../../redux/boards/boardsApiSlice.ts';
import { skipToken } from '@reduxjs/toolkit/query';
import Board from '../../components/Boards/Board.tsx';
import { DropResult } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';
import { selectBoards } from '../../redux/boards/selectors.ts';

const Boards: React.FC = () => {

  const boardsData = useSelector(selectBoards);

  const [activeTab, setActiveTab] = useState<number | null>(0);

  const { data: activeBoardData, error: boardError, isLoading: boardLoading } = useBoardDetailsQuery(
    boardsData && boardsData[activeTab] ? boardsData[activeTab].id : skipToken
  );

  const [updateListPosition] = useUpdateListPositionMutation();
  const [updateCardPosition] = useUpdateCardPositionMutation();

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };
  const handleDragEnd = async (result: DropResult) => {
    const { destination, source, draggableId, type } = result;
    if (!destination) return;

    if (type === 'CARD') {
      if (source.droppableId !== destination.droppableId || source.index !== destination.index) {
        await updateCardPosition({
          cardId: draggableId,
          newPosition: destination.index,
        });
      }
    }


    if (type === 'LIST') {
      if (source.index !== destination.index) {
        await updateListPosition({
          listId: draggableId,
          newPosition: destination.index,
        });
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Boards</h1>

      {boardsData?.length === 0 ? (
        <p className="text-center text-gray-500">No boards available</p>
      ) : (
        <div>
          {/* Таблиці для дошок */}
          <ul className="flex flex-wrap border-b mb-4 space-x-2">
            {boardsData?.map((board, index) => (
              <li
                key={board.id}
                className={`cursor-pointer py-2 px-4 border-b-2 text-center transition-colors duration-300 ${
                  activeTab === index
                    ? 'border-blue-500 text-blue-500'
                    : 'border-transparent text-gray-500 hover:text-blue-500 hover:border-blue-500'
                }`}
                onClick={() => handleTabClick(index)}
              >
                {board.name}
              </li>
            ))}
          </ul>

          {/* Відображення списків та карток для активної дошки */}
          {activeBoardData && (
            <div className="p-4 bg-white shadow-md rounded-md">
              <h2 className="text-xl font-semibold mb-2">{activeBoardData.name}</h2>
              <p className="text-gray-700 mb-2">Owner: {activeBoardData.owner_id}</p>
              <p className="text-gray-700 mb-4">
                Users: {activeBoardData.users?.map((user) => user.username).join(', ')}
              </p>

              {/* Списки і картки в активній дошці */}
              <div className="flex space-x-4 overflow-x-auto">
                {activeBoardData.lists && activeBoardData.lists.length > 0 ? (
                  <Board board={activeBoardData} lists={activeBoardData.lists} onDragEnd={handleDragEnd} />
                ) : (
                  <p className="text-center text-gray-500">No lists available for this board</p>
                )}
              </div>
            </div>
          )}
          {boardLoading && <Loader />}
          {boardError && <p>Error fetching board data</p>}
        </div>
      )}
    </div>
  );
};

export default Boards;
