import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Cards } from '../../redux/boards/boards.type.ts';

interface CardProps {
  card: Cards; // Використовуємо тип Cards
  index: number;
}

const Card: React.FC<CardProps> = ({ card, index }) => {
  return (
    <Draggable draggableId={String(card.id)} index={index}>
      {(provided) => (
        <div
          className="card bg-white p-3 rounded-md shadow-md mb-2"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <h4 className="text-md font-semibold">{card.name}</h4>
          <p className="text-gray-500 text-sm">{new Date(card.created_at).toLocaleDateString()}</p>
          <p className="text-gray-600 text-sm mt-1">
            Users: {card.users.map((user) => user.username).join(', ')}
          </p>
        </div>
      )}
    </Draggable>
  );
};

export default Card;
