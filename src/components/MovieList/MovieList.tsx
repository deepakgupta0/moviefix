import React, { useEffect, useRef, useState } from "react";
import useDebounce from "../../hooks/useDebounce";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import useUpdateEffect from "../../hooks/useUpdateEffect";
import { fetchMovies } from "../../services/api";
import { Movie } from "../../types";
import MovieCard from "../MovieCard/MovieCard";
import VirtualScroll from "../VirtualScroll/VirtualScroll";
import "./MovieList.css";
import MovieListSkeleton from "./MovieListSkeleton";

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
  const [isLimitReached, setIsLimitReached] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [movieSetHeight,setMovieSetHeight] = useState(0);
  let debouncedSearch = useDebounce(searchQuery, 500);

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

  useInfiniteScroll(fetchMoreMovies,containerRef);

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
        await fetchData(direction,cyear[cyear.length - 1]);
      } else if(direction === "up") {
        setUpLoading(true);
        await fetchData(direction,cyear[0]);
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
          <MovieListSkeleton count={12} />
        </div>
      )}
      {(genres?.size > 0 && (movies?.[0]?.movies === null || movies?.[0]?.movies?.length === 0)) ? <div>No Such Movie Exists With Such Combination Of Genre</div>:<></>}

      <VirtualScroll items={movies.map((set,idx) => {
        return (
          set.movies?.length > 0 && (
            <div className="movie-set" key={set.year ?? idx} ref={(ele)=>{ if(ele && idx === 0) setMovieSetHeight((ele?.clientHeight ?? 0) + 10)}}>
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
      })} itemHeight={movieSetHeight} containerRef={containerRef}/>
      
      {downLoading && (
        <div className="loading">
          <MovieListSkeleton count={12} />
        </div>
      )}
    </div>
  );
};

export default React.memo(MovieList);
