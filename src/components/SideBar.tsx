import { useEffect, useState } from 'react';
import { memo } from "react";
import { GenreResponseProps } from '../@types/types';
import { api } from '../services/api';
import { Button } from './Button';
interface SideBarItemsProps{
  handleClickButton: (id: number)=> void,
  genres: Array<{
    id: number;
    name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
    title: string;
  }>;
  selectedGenreId: number;
}

export function SideBarComponent({handleClickButton, selectedGenreId}: SideBarItemsProps) {
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  return(
    <nav className="sidebar">
        <span>Watch<p>Me</p></span>

        <div className="buttons-container">
          {genres.map(genre => (
            <Button
              key={String(genre.id)}
              title={genre.title}
              iconName={genre.name}
              onClick={() => handleClickButton(genre.id)}
              selected={selectedGenreId === genre.id}
            />
          ))}
        </div>

      </nav>
  );
}

export const SideBar = memo(SideBarComponent, (prevProps, nextProps) => {
  return Object.is(prevProps.genres, nextProps.genres) &&
    Object.is(prevProps.selectedGenreId, nextProps.selectedGenreId);
})