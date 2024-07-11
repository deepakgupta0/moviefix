import React from "react";
import "./SearchBar.css";

interface SearchBarProps {
  onSearch: (query: string) => void;
  searchQuery: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, onSearch }) => {
  return (
    <div className="search-bar container">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Search for a movie..."
        className="search-input"
      />
    </div>
  );
};

export default React.memo(SearchBar);
