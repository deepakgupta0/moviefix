Here's a README file that summarizes the implementation steps we covered for your Movie List App project:

---

# Movie List App

This project is a movie information app that displays a list of movies from The Movie Database (TMDb) API. The app shows top movies for each year and users can filter by genre. The app also loads top movies from previous/next years as the user scrolls through the list.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Components](#components)
- [Hooks](#hooks)
- [Styling](#styling)
- [Contributing](#contributing)
- [License](#license)

## Features

- Display a list of movies sorted by popularity.
- Show movie details.
- Infinite scrolling to load movies from previous and next years as the user scrolls.
- Genre filter to display movies of selected genres.
- Smooth scrolling behavior with debounce and throttle implementations.
- Shimmer effect for movie list loading state.
  -Implemented a search bar which searches for the movie based on the search string
  and displays an infinite loading list of movies which matches the search.
  -Used TypeScript for enhanced type safety and code quality.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/movie-list-app.git
   cd movie-list-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

## Usage

1. Open your browser and navigate to `http://localhost:3000`.
2. The app will display a list of top movies for the year 2012.
3. Scroll down to load movies from the next year, and scroll up to load movies from the previous year.
4. Use the genre filter to display movies of selected genres.

## Components

- **MovieList**: Fetches and displays a list of movies.
- **MovieCard**: Displays movie details.
- **GenreFilter**: Allows users to filter movies by genre.
- **SkeletonLoader**: Displays a shimmer effect for loading state.

## Hooks

- **useDebounce**: Custom hook to debounce function calls.
- **useThrottle**: Custom hook to throttle function calls.
- **useInfiniteScroll**: Custom hook to handle infinite scrolling.

## Styling

### Shimmer Effect
