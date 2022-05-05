import React from 'react';
import { render, screen } from '@testing-library/react';
import AppHeader from './app-header';

test('renders learn react link', () => {
  render(<AppHeader />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
