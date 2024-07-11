import React from "react";

interface MovieListSkeletonProps {
  count: number;
}
const MovieListSkeleton: React.FC<MovieListSkeletonProps> = ({ count }) => {
  return <div className="movie-list">{Array.from({length:count}).map((_,idx)=>{
    return <div className="shimmer movie-skeleton" key={idx}></div>
  })}</div>;
};

export default MovieListSkeleton;
