import React from 'react';
import { render } from '@testing-library/react';
import Base from '../base';

describe('Base Component:', () => {
  it('renders the children', () => {
    const { getByText } = render(<Base>Children component</Base>);
    expect(getByText(/Children component/i)).toBeInTheDocument();
  });

  it('renders the Sport-Thieme logo', () => {
    const { getByAltText } = render(<Base>Children component</Base>);
    expect(getByAltText('Sport-Thieme')).toBeInTheDocument();
  });

  it('renders the GitHub authorize button', () => {
    const { getByText } = render(<Base>Children component</Base>);
    expect(getByText(/Authorize/i)).toBeInTheDocument();
  });
});
