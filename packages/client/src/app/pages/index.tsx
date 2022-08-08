import { Container } from '@mui/material';
import MovieList from '../components/MovieCard';

function HomePage() {
  return (
    <>
      <Container maxWidth="md">
        <MovieList />
      </Container>
    </>
  );
}

export default HomePage;
