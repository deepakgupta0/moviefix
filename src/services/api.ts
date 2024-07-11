import { Movie, Genre } from "../types";

const API_KEY = "2dca580c2a14b55200e784d157207b4d";

export const fetchMovies = async (
  year: number,
  genres: Set<number>,
  query: string = "",
  page: number = 1
): Promise<{ page: 1; movies: Movie[]; total_pages: number }> => {
  const url = query
    ? `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`
    : `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&primary_release_year=${year}&page=${page}&vote_count.gte=100&with_genres=${Array.from(
        genres
      ).join(",")}`;

  const response = await fetch(url);
  const data = await response.json();
  return {
    page: data.page,
    movies: data.results,
    total_pages: data.total_pages,
  };
};

export const fetchGenres = async (): Promise<Genre[]> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`
  );
  const data = await response.json();
  return data.genres;
};
