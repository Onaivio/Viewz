import React from "react";

const Search = ({ query, handleInputChange }) => {
  return (
    <div className="flex flex-col items-center justify-center px-3 pt-3 pb-1 ">
      <div className=" sm:w-[60%] xs:w-[80%] w-full">
        <input
          type="search"
          value={query}
          onChange={handleInputChange}
          className="p-2 h-[50px] w-full  bg-slate-50 rounded-full my-6 shadow-sm border"
          placeholder="Search by tags: e.g nature, landscape..."
        />
      </div>
    </div>
  );
};

export default Search;
