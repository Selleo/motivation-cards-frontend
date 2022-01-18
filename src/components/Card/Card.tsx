import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { ICard } from "../../types/types";

interface ICardProps {
  card: ICard;
}
const Card: React.FC<ICardProps> = ({ card }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: card.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      className="card"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <img className="card__image" alt="card" src={card.imageUrl} />
      <div className="card__title">{card.title}</div>
      <div className="card__description">{card.description}</div>
    </div>
  );
};

export default Card;
