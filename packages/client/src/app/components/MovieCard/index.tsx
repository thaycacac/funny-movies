import { Movie } from '../../../types/Movie';
import MovieCard from './Card';

function MovieList() {
  const movies: Movie[] = [
    {
      id: '1',
      title: 'Movie Title',
      sharedBy: 'thaycacac@gmail.com',
      likeCount: 89,
      dislikeCount: 90,
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer',
      vote: 1,
    },
    {
      id: '1',
      title: 'Movie Title',
      sharedBy: 'thaycacac@gmail.com',
      likeCount: 89,
      dislikeCount: 90,
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer',
      vote: 0,
    },
    {
      id: '1',
      title: 'Movie Title',
      sharedBy: 'thaycacac@gmail.com',
      likeCount: 89,
      dislikeCount: 90,
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer',
      vote: -1,
    },
  ];

  return (
    <>
      {movies.map(movie => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </>
  );
}

export default MovieList;
