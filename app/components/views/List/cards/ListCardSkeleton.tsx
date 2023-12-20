import React from "react";

const ListCardSkeleton: React.FC = () => {
  return (
    <div className="shadow-black m-2 bg-gray-200 rounded-md flex items-start cursor-pointer transition-all">
      <div className="rounded-md p-2 w-16 h-16 bg-gray-300 animate-pulse"></div>
      <div className="ml-4 m-2 flex flex-col justify-between">
        <div className="h-4 bg-gray-300 animate-pulse rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-300 animate-pulse rounded w-1/2"></div>
      </div>
    </div>
  );
};

export default ListCardSkeleton;
