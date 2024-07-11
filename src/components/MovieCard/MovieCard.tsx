import React from "react";
import { Movie } from "../../types";
import "./MovieCard.css";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <div className="movie-card shimmer">
      {movie && movie.id && <img
      className="movie-thumbnail"
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        width={500}
        height={750}
      />}
    </div>
  );
};

export default MovieCard;
