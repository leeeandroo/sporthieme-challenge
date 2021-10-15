import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';

import Github from '../index';

import {
  mockRepositoriesSuccess,
  mockRepositoriesError,
} from '../../../test/mocks';

describe('Github Component:', () => {
  it('renders without token', async () => {
    const { getByText } = render(
      <MockedProvider mocks={mockRepositoriesSuccess}>
        <Github></Github>
      </MockedProvider>,
    );
    await waitFor(() =>
      expect(
        getByText(
          /Please authorize our app to allow us to see your repositories./i,
        ),
      ).toBeInTheDocument(),
    );
  });

  it('renders show error message', async () => {
    Storage.prototype.getItem = jest.fn(item => 'token');
    const { getByText } = render(
      <MockedProvider mocks={mockRepositoriesError}>
        <Github></Github>
      </MockedProvider>,
    );

    await waitFor(() =>
      expect(
        getByText(/Something went wrong, please try again later./i),
      ).toBeInTheDocument(),
    );
  });

  it('renders list of repositories', async () => {
    Storage.prototype.getItem = jest.fn(item => 'token');
    const { getByText } = render(
      <MockedProvider mocks={mockRepositoriesSuccess}>
        <Github></Github>
      </MockedProvider>,
    );

    await waitFor(() => {
      expect(
        getByText(
          /Please choose the repository you want to see more information:/i,
        ),
      ).toBeInTheDocument();

      expect(
        getByText(
          mockRepositoriesSuccess[0].result.data.viewer.repositories.nodes[0]
            .name,
        ),
      ).toBeInTheDocument();
    });
  });
});
