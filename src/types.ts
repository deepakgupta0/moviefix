export interface Movie {
  id: number | null;
  title?: string;
  poster_path?: string;
  overview?: string;
}

export interface Genre {
  id: number;
  name: string;
}
