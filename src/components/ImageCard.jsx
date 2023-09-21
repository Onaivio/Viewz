import React, { useEffect, useRef, useState } from "react";
import { FaTags } from "react-icons/fa";
import { useDrag, useDrop } from "react-dnd";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ImageCard = ({ image, moveImage, index, loading }) => {
  const type = "Image";

  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: type,
    hover(item) {
      if (!ref.current) {
        return;
      }

      const dragIndex = item.index;
      // current element where the dragged element is hovered on
      const hoverIndex = index;
      // If the dragged element is hovered in the same place, then do nothing
      if (dragIndex === hoverIndex) {
        return;
      }

      moveImage(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
    drop: (droppedItem) => {
      // Access the dropped item's data
      const itemData = droppedItem.id;
      toast.warning(
        `${itemData === image.id ? `moved ${image.tag}!` : "Moved image!"}`
      );
    },
  });

  const [{ isDragging }, drag] = useDrag(() => ({
    type: type,
    item: { id: image.id, index },
    collect: (monitor) => {
      return {
        isDragging: monitor.isDragging(),
      };
    },
  }));

  drag(drop(ref));

  return (
    <div
      ref={ref}
      style={{ opacity: isDragging ? 0 : 1 }}
      className="relative flex flex-col items-center justify-center p-3"
    >
      <div className="xs:w-[200px] w-[300px] xs:h-[150px] h-[200px] cursor-grab">
        <img
          src={image.url}
          alt={image.tag}
          className="w-full h-full rounded-md shadow-md"
        />
      </div>
      <div className="absolute flex items-center p-1 font-medium text-gray-800 lowercase rounded-lg left-4 top-4 bg-white/30 backdrop-blur-md">
        <span className="text-[13px] mr-[2px] mt-[2px]">
          <FaTags />
        </span>
        <small>{image.tag}</small>
      </div>
    </div>
  );
};

export default ImageCard;
