import { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { Card } from "../../components";
import { ICard } from "../../types/types";

const imageUrl =
  "https://i.pinimg.com/originals/bf/c2/67/bfc267127a451c7ad3f64b79db279af2.jpg";

const Workspace = () => {
  const [items, setItems] = useState<ICard[]>([
    { description: "test desc", id: "1", title: "Item 1", imageUrl },
    { description: "test desc", id: "2", title: "Item 2", imageUrl },
    { description: "test desc", id: "3", title: "Item 3", imageUrl },
    { description: "test desc", id: "4", title: "Item 4", imageUrl },
    { description: "test desc", id: "5", title: "Item 5", imageUrl },
    { description: "test desc", id: "6", title: "Item 6", imageUrl },
    { description: "test desc", id: "7", title: "Item 7", imageUrl },
    { description: "test desc", id: "8", title: "Item 8", imageUrl },
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over?.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        <div className="workspace">
          {items.map((item) => (
            <Card key={item.id} card={item} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default Workspace;
