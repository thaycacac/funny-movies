import { render, screen } from '@testing-library/react';
import Header from './index';
import { BrowserRouter as Router } from 'react-router-dom';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import { configureAppStore } from '../../../store';

Enzyme.configure({ adapter: new Adapter() });
const store = configureAppStore();

test('renders title share link', () => {
  render(
    <Provider store={store}>
      <Router>
        <Header />
      </Router>
    </Provider>
  );
  const titleElement = screen.getByText(/FUNNY MOVIES/i);
  expect(titleElement).toBeInTheDocument();
});

describe('MyComponent', () => {
  it('should render my component', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <Router>
          <Header />
        </Router>
      </Provider>
    );
    expect(wrapper.getElements()).toMatchSnapshot();
  });
});
