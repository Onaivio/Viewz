import React from "react";
import RGL, { WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import ImageCard from "../components/ImageCard";

const ResponsiveReactGridLayout = WidthProvider(RGL);

const Gallery1 = ({
  data,
  loading,
  moveImage,
  user,
  query,
  handleInputChange,
}) => {
  const items = 23; // Number of items in the grid
  const rowHeight = 30; // Height of each row in the grid

  // Define default properties for the grid items
  const defaultProps = {
    isDraggable: true, // Allow items to be draggable
    isResizable: true, // Allow items to be resizable
    rowHeight, // Set the row height for the grid
    onLayoutChange: () => {}, // Placeholder for layout change handler
    cols: 3, // Number of columns in the grid
  };

  // Handle layout change event
  const onLayoutChangeHandler = (layout) => {
    defaultProps.onLayoutChange(layout);
  };
  console.log(data);

  return (
    <ResponsiveReactGridLayout
      onLayoutChange={onLayoutChangeHandler}
      {...defaultProps} // Spread default grid properties
    >
      {/* Generate grid items */}
      {Array.from({ length: items }, (_, index) => (
        <div
          key={index}
          data-grid={{
            x: 0, // X-coordinate position in the grid
            y: 0, // Y-coordinate position in the grid
            w: 100, // Width of the item (percentage)
            h: 100, // Height of the item (percentage)
          }}
        >
          {/* Check if there is data */}
          {data.length ? (
            // Map over the data to render ImageCard components
            data.map((image, index) => (
              <ImageCard
                image={image}
                index={index}
                loading={loading}
                key={index}
              />
            ))
          ) : (
            // Display a message if no data is available
            <div>No results found for your query</div>
          )}
        </div>
      ))}
    </ResponsiveReactGridLayout>
  );
};

export default Gallery1;
