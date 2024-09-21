import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Card from './Card';
import { Lists } from '../../redux/boards/boards.type.ts';

interface ListProps {
  list: Lists;  // Використовуємо тип Lists для коректного визначення списку
  index: number;
}

const List: React.FC<ListProps> = ({ list, index }) => {
  return (
    <Draggable draggableId={String(list.id)} index={index}>
      {(provided) => (
        <div
          className="list bg-gray-100 p-4 rounded-md"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <h3 className="text-lg font-bold mb-2">{list.name}</h3>
          <Droppable droppableId={String(list.id)} type="CARD">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef} className="min-h-[100px]">
                {list.cards.length === 0 ? (
                  <p className="text-gray-500">No cards available</p>
                ) : (
                  list.cards.map((card, index) => (
                    <Card key={card.id} card={card} index={index} />
                  ))
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

export default List;
