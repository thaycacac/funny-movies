import MovieCard from './Card';
import { useMovieSlice } from './slice';
import { selectMovies } from './slice/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Movie } from '../../../types/Movie';

function MovieList() {
  const { actions } = useMovieSlice();
  const movies: Movie[] = useSelector(selectMovies);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.success());
  }, []);

  return (
    <>
      {movies.map(movie => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </>
  );
}

export default MovieList;
