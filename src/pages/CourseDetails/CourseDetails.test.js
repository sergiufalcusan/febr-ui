import { render, screen } from '@testing-library/react';
import CourseDetails from './CourseDetails';

test('renders learn react link', () => {
  render(<CourseDetails />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
