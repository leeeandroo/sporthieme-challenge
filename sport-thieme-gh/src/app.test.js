import React from 'react';
import { render } from '@testing-library/react';
import App from './app';

it('renders without crashing', () => {
  const { getByAltText } = render(<App />);
  expect(getByAltText('Sport-Thieme')).toBeInTheDocument();
});
