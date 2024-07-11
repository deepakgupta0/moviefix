import { useCallback, useState } from "react";
import "./App.css";
import GenreFilter from "./components/GenreFilter/GenreFilter";
import Header from "./components/Header/Header";
import MovieList from "./components/MovieList/MovieList";
import SearchBar from "./components/SearchBar/SearchBar";
function App() {
  const [selectedGenres, setSelectedGenres] = useState<Set<number>>(() => {
    return new Set<number>();
  });

  const [searchQuery, setSearchQuery] = useState('');
  const handleGenreToggle = useCallback((genreId: number) => {
    let newSelectedGenres = new Set(selectedGenres);
    if (selectedGenres.has(genreId)) {
      newSelectedGenres.delete(genreId);
    } else {
      newSelectedGenres.add(genreId);
    }
    setSelectedGenres(newSelectedGenres);
  },[selectedGenres]);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  },[setSearchQuery]);

  return (
    <>
      <div className="movie-topbar">
      <Header />
      <GenreFilter onFilterChange={handleGenreToggle} selectedGenres={selectedGenres}/>
      <SearchBar searchQuery={searchQuery} onSearch={handleSearch}></SearchBar>
      </div>
      <div className="container">
        <MovieList genres={selectedGenres} searchQuery={searchQuery}/>
      </div>
    </>
  );
}

export default App;
