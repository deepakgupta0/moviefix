import React, { useEffect, useState } from "react";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import { fetchMovies } from "../../services/api";
import { Movie } from "../../types";
import MovieCard from "../MovieCard/MovieCard";
import "./MovieList.css";
import useUpdateEffect from "../../hooks/useUpdateEffect";
import MovieListSkeleton from "./MovieListSkeleton";
import useDebounce from "../../hooks/useDebounce";

interface MovieListProps {
  genres: Set<number>;
  searchQuery: string;
}

interface MovieMap {
  year: number | null;
  movies: Movie[];
}
// [{year:xxxx, movies:[]}]
const MovieList: React.FC<MovieListProps> = ({ genres, searchQuery }) => {
  const [movies, setMovies] = useState<MovieMap[]>([]);
  const [upLoading, setUpLoading] = useState(false);
  const [downLoading, setDownLoading] = useState(false);
  const [year, setYear] = useState([2012]);
  const [direction, setDirection] = useState<"up" | "down">("down");
  const [page, setPage] = useState(1);
  let debouncedSearch = useDebounce(searchQuery, 500);
  const [isLimitReached, setIsLimitReached] = useState(false);

  const fetchMoreMovies = (direction: "up" | "down") => {
    if (!upLoading && direction === "up" && searchQuery?.length === 0) {
      setYear((py) => [py[0] - 1, ...py]);
      setDirection("up");
    } else if (
      !downLoading &&
      direction === "down" &&
      year[year.length - 1] + 1 <= new Date().getFullYear()
    ) {
      setYear((py) => [...py, py[py.length - 1] + 1]);
      setDirection("down");
      if (searchQuery?.length > 0) setPage((p) => p + 1);
    }
  };

  useInfiniteScroll(fetchMoreMovies);

  const fetchData = async(direction:"up"|"down", cyear:number)=>{
    const {
      page: cpage,
      total_pages,
      movies: newMovies,
    } = await fetchMovies(
      cyear,
      genres,
      searchQuery,
      page
    );
    if (cpage > total_pages) {
      setIsLimitReached(true);
      return;
    }
    let newEntrySet = {
      year: searchQuery?.length > 0 ? null : cyear,
      movies: newMovies,
    };
    setMovies((prev) => {
      if (year.length === 1 && page === 1) return [newEntrySet];
      else {
        if(direction === "up")
          {
            return [newEntrySet, ...prev];
          }
          else {
            return [...prev, newEntrySet];
          }
      };
    });


  }
  const loadMovies = async (cyear: number[], direction: "up" | "down") => {
    try {
      if (direction === "down" && !isLimitReached) {
        setDownLoading(true);
        fetchData(direction,cyear[cyear.length - 1]);
      } else if(direction === "up") {
        setUpLoading(true);
        fetchData(direction,cyear[0]);
      }
    } catch (error) {
    } finally {
      setUpLoading(false);
      setDownLoading(false);
    }
  };

  useUpdateEffect(() => {
    setPage(1);
    setYear([2012]);
  }, [debouncedSearch]);

  useEffect(() => {
    loadMovies(year, direction);
  }, [year, direction, page]);

  useUpdateEffect(() => {
    setYear([2012]);
    setPage(1);
  }, [genres]);

  return (
    <div className="movie-list-container">
      {upLoading && (
        <div className="loading">
          <MovieListSkeleton count={4} />
        </div>
      )}
      {(genres?.size > 0 && (movies?.[0]?.movies === null || movies?.[0]?.movies?.length === 0)) ? <div>No Such Movie Exists With Such Combination Of Genre</div>:<></>}
      {movies.map((set) => {
        return (
          set.movies?.length > 0 && (
            <div className="movie-set" key={set.year}>
              {set.year && <h4 className="movie-year">{set.year}</h4>}
              <div className="movie-list">
                {set.movies.map((movie) => {
                  return (
                    <>
                      <MovieCard key={movie.id} movie={movie} />
                    </>
                  );
                })}
              </div>
            </div>
          )
        );
      })}
      {downLoading && (
        <div className="loading">
          <MovieListSkeleton count={4} />
        </div>
      )}
    </div>
  );
};

export default React.memo(MovieList);
