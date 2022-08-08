import { render, screen } from '@testing-library/react';
import MovieShare from './index';
import { BrowserRouter as Router } from 'react-router-dom';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

test('renders title share link', () => {
  render(
    <Router>
      <MovieShare />
    </Router>
  );
  const titleElement = screen.getByText(/Share a youtube movie/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders button share link', () => {
  render(
    <Router>
      <MovieShare />
    </Router>
  );
  const buttonElement = screen.getByTestId('button-share');
  expect(buttonElement).toHaveTextContent('Share');
});

describe('MyComponent', () => {
  it('should render my component', () => {
    const wrapper = shallow(
      <Router>
        <MovieShare />
      </Router>
    );
    expect(wrapper.getElements()).toMatchSnapshot();
  });
});
