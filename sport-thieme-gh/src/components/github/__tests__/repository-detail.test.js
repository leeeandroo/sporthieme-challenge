import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';

import RepositoryDetail from '../repository-detail';

import {
  mockRepositorySuccess,
  mockRepositoryError,
} from '../../../test/mocks';

describe('Repository Detail Component:', () => {
  it('renders repository', async () => {
    const { repository } = mockRepositorySuccess[0].result.data.viewer;
    const { getByText, getByTestId } = render(
      <MockedProvider mocks={mockRepositorySuccess}>
        <RepositoryDetail repository_name={repository.name}></RepositoryDetail>
      </MockedProvider>,
    );

    await waitFor(() => {
      expect(getByText(repository.name)).toBeInTheDocument();
      const number_of_open_issues = getByTestId('number-of-open-issues');
      const number_of_pull_requests = getByTestId('number-of-pull-requests');

      expect(number_of_open_issues.textContent).toBe(
        `Issues${repository.openIssues.totalCount}`,
      );

      expect(number_of_pull_requests.textContent).toBe(
        `Pull requests${repository.pullRequests.totalCount}`,
      );
    });
  });

  it('renders error message', async () => {
    const { getByText } = render(
      <MockedProvider mocks={mockRepositoryError}>
        <RepositoryDetail repository_name={null}></RepositoryDetail>
      </MockedProvider>,
    );

    await waitFor(() => {
      expect(
        getByText(/Something went wrong, please try again later./i),
      ).toBeInTheDocument();
    });
  });
});
