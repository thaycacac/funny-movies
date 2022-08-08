import { Container } from '@mui/material';
import MovieList from '../components/Movie';

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
