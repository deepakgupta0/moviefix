import React from "react";

interface GenreSkeletonProps {
  count: number;
}
const GenreSkeleton: React.FC<GenreSkeletonProps> = ({ count }) => {
  return <>{Array.from({length:count}).map((_,idx)=>{
    return <div key={idx} className="genre-button shimmer genre-button-skeleton"></div>
  })}</>;
};

export default GenreSkeleton;
