import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Login from '../login';

import {
  GH_AUTH_API_URI,
  GH_CLIENT_ID,
  GH_REDIRECT_URI,
} from '../../../utils/github';

describe('Login Component:', () => {
  it('renders the GitHub authorize button', () => {
    const { getByText } = render(<Login />);
    expect(getByText(/Authorize/i)).toBeInTheDocument();
  });

  it('can click on authorize', () => {
    const { location } = window;
    window.location.assign = jest.fn();

    const { getByText } = render(<Login />);
    const button = getByText(/Authorize/i);
    fireEvent.click(button);
    expect(window.location.assign).toHaveBeenCalled();

    window.location = location;
  });

  it('authorize button redirects to the right url', () => {
    const { location } = window;
    window.location.assign = jest.fn();

    const { getByText } = render(<Login />);
    const button = getByText(/Authorize/i);
    const redirect_url = `${GH_AUTH_API_URI}?client_id=${GH_CLIENT_ID}&scope=user&redirect_uri=${GH_REDIRECT_URI}`;
    fireEvent.click(button);
    expect(window.location.assign).toBeCalledWith(redirect_url);

    window.location = location;
  });
});
