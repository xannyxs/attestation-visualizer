import React from "react";

const GridCardSkeleton: React.FC = () => {
  return (
    <div className="shadow-black bg-gray-200 rounded-md cursor-pointer transition-all p-4 flex flex-col items-center">
      <div className="rounded-full w-16 h-16 bg-gray-300 animate-pulse mb-4"></div>{" "}
      <div className="h-4 bg-gray-300 animate-pulse rounded w-3/4 mb-2"></div>{" "}
      <div className="h-4 bg-gray-300 animate-pulse rounded w-1/2 mb-2"></div>{" "}
      <div className="h-4 bg-gray-300 animate-pulse rounded w-2/3"></div>{" "}
    </div>
  );
};

export default GridCardSkeleton;
