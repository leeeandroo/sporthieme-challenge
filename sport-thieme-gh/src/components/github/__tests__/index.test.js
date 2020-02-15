import React from 'react';
import { render, wait } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';

import { build, fake } from 'test-data-bot';

import Github from '../index';

import { GET_REPOSITORIES } from '../../../utils/queries';

const repositoryBuilder = build('Repository').fields({
  __typename: 'Repository',
  name: fake(f => f.lorem.words()),
  description: fake(f => f.lorem.paragraphs()),
  primaryLanguage: {
    __typename: 'PrimaryLanguage',
    name: fake(f => f.lorem.word()),
    color: '#f1e05a',
  },
});

const mockSuccess = [
  {
    request: {
      query: GET_REPOSITORIES,
    },
    result: {
      data: {
        viewer: {
          __typename: 'Viewer',
          repositories: {
            __typename: 'Repositories',
            pageInfo: {
              __typename: 'PageInfo',
              hasNextPage: false,
              endCursor: 'Y3Vyc29yOnYyOpKwWW91LURvbnQtS25vdy1KU84L9PXB',
            },
            nodes: [repositoryBuilder()],
          },
        },
      },
    },
  },
];

const mockError = [
  {
    request: {
      query: GET_REPOSITORIES,
    },
    result: () => {
      // do something, such as recording that this function has been called
      // ...
      return {
        error: true,
      };
    },
  },
];

describe('Github Component', () => {
  it('renders without token', async () => {
    const { getByText } = render(
      <MockedProvider mocks={mockSuccess}>
        <Github></Github>
      </MockedProvider>,
    );

    await wait(() =>
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
      <MockedProvider mocks={mockError}>
        <Github></Github>
      </MockedProvider>,
    );

    await wait(() =>
      expect(
        getByText(/Something went wrong, please try again later./i),
      ).toBeInTheDocument(),
    );
  });

  it('renders list of repositories', async () => {
    Storage.prototype.getItem = jest.fn(item => 'token');
    const { getByText, debug } = render(
      <MockedProvider mocks={mockSuccess}>
        <Github></Github>
      </MockedProvider>,
    );

    await wait(() => {
      expect(
        getByText(
          /Please choose the repository you want to see more information:/i,
        ),
      ).toBeInTheDocument();

      expect(
        getByText(mockSuccess[0].result.data.viewer.repositories.nodes[0].name),
      ).toBeInTheDocument();
    });
  });
});
