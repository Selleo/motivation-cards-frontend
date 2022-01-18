import { useEffect, useState } from "react";
import { Button, Spin, Space } from "antd";
import { UploadOutlined } from "@ant-design/icons";

import axios from "axios";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
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

import { Card, Layout } from "../../components";
import { ICard } from "../../types/types";

const Workspace = () => {
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [items, setItems] = useState<ICard[]>([]);

  useEffect(() => {
    const getCards = async () => {
      try {
        const {
          data: { results },
        } = await axios.get(
          "https://motivation-cards-backend.herokuapp.com/api/v1/user/result",
          {
            headers: { Authorization: localStorage.getItem("api_token") || "" },
          }
        );
        setItems(results);
        setLoading(false);
      } catch (e) {
        setLoading(false);
      }
    };
    getCards();
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    }),
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

  const handleSubmit = async () => {
    const data = items.map((item) => item.id);
    setSubmitting(true);

    try {
      await axios.post(
        `https://motivation-cards-backend.herokuapp.com/api/v1/user/results?results=[${data}]`,
        {},
        {
          headers: {
            Authorization: localStorage.getItem("api_token") || "",
          },
        }
      );
      setSubmitting(false);
    } catch (e) {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="loader">
        <Space size="middle">
          <Spin size="large" />
        </Space>
      </div>
    );
  }

  return (
    <Layout>
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
      <div className="workspace__submit">
        <Button
          loading={submitting}
          onClick={() => handleSubmit()}
          type="primary"
          shape="circle"
          icon={<UploadOutlined />}
          size="large"
        />
      </div>
    </Layout>
  );
};

export default Workspace;
