import MovieCard from './Card';

function MovieList() {
  return (
    <>
      {Array.from(Array(10).keys()).map(item => (
        <MovieCard />
      ))}
    </>
  );
}

export default MovieList;
