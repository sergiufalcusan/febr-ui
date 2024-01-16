import { render, screen } from '@testing-library/react';
import Teacher from './Teacher';

test('renders learn react link', () => {
  render(<Teacher />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
