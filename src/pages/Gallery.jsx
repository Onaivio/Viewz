import React from "react";
import { NavLink } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import ImageCard from "../components/ImageCard";
import Search from "../components/Search";
import Skeleton from "../components/Skeleton";
import Modal from "../components/Modal";

const Gallery = ({
  data,
  loading,
  moveImage,
  user,
  query,
  handleInputChange,
}) => {
  return (
    <div>
      {user ? null : <Modal />}
      <Search query={query} handleInputChange={handleInputChange} />

      {!user && (
        <h4 className="flex items-center justify-center pb-5 text-gray-500">
          <NavLink to={`/login`} className="mr-1 text-yellow-500">
            Log in
          </NavLink>
          to rearrange images.
        </h4>
      )}
      {/*image card */}
      <div className="flex items-center justify-center w-full bg-slate-50">
        <div className="p-4 card bg-white border my-10 py-10 sm:w-[90%] xs:w-[95%] w-full">
          {loading ? (
            <Skeleton />
          ) : data.length ? (
            data.map((image, index) => (
              <DndProvider key={index} backend={HTML5Backend}>
                <ImageCard
                  image={image}
                  index={index}
                  loading={loading}
                  moveImage={moveImage}
                />
              </DndProvider>
            ))
          ) : (
            <div>No results found for your query</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
