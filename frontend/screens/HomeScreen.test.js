import { render } from '@testing-library/react';
import React from 'react';
import HomeScreen from './HomeScreen';

test('renders HomeScreen component', () => {
  const { getByText } = render(<HomeScreen />);
  const headerElement = getByText(/TOP-RATED PRODUCTS/i);
  expect(headerElement).toBeInTheDocument();
});
