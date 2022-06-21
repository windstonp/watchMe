import { memo } from 'react';
import { MovieProps, selectedGenre } from '../@types/types';
import { MovieCard } from './MovieCard';
interface ContentItemsProps{
  selectedGenre: selectedGenre

  movies: MovieProps[]
}

export function ContentComponent({selectedGenre, movies}: ContentItemsProps) {
  return (
    <div className="container">
      <header>
        <span className="category">
          Categoria:<span> {selectedGenre.title}</span>
        </span>
      </header>

      <main>
        <div className="movies-list">
          {movies.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              title={movie.Title}
              poster={movie.Poster}
              runtime={movie.Runtime}
              rating={movie.Ratings[0].Value}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export const Content = memo(ContentComponent, (prevProps, nextProps) => {
  return Object.is(prevProps.movies, nextProps.movies) &&
    Object.is(prevProps.selectedGenre, nextProps.selectedGenre)
})