import React, { useEffect, useState } from "react";
import "./GenreFilter.css";
import { Genre } from "../../types";
import { fetchGenres } from "../../services/api";
import GenreSkeleton from "./GenreSkeleton";

interface GenreFilterProps {
  onFilterChange: (genreId: number) => void;
  selectedGenres: Set<number>;
}

const GenreFilter: React.FC<GenreFilterProps> = ({
  onFilterChange,
  selectedGenres,
}) => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(false);

  const handleGenreToggle = (genreId: number) => {
    onFilterChange(genreId);
  };

  useEffect(() => {
    const getGenres = async () => {
      setLoading(true);
      try {
        const genreList = await fetchGenres();
        setGenres(genreList);
      } catch (error) {
        console.error(error)
      }
      finally{
        setLoading(false);
      }
    };
    getGenres();
  }, []);

  return (
    <div className="genre-filter container">
      {loading ? (
        <GenreSkeleton count={10}></GenreSkeleton>
      ) : (
        <>
          {genres.map((genre) => (
            <button
              key={genre.id}
              className={`genre-button ${
                selectedGenres.has(genre.id) ? "active" : ""
              }`}
              onClick={() => handleGenreToggle(genre.id)}
            >
              {genre.name}
            </button>
          ))}
        </>
      )}
    </div>
  );
};

export default React.memo(GenreFilter);
