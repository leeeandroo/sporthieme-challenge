import { build, fake } from 'test-data-bot';

import { GET_REPOSITORIES } from '../utils/queries';

export const repositoryBuilder = build('Repository').fields({
  __typename: 'Repository',
  name: fake(f => f.lorem.words()),
  description: fake(f => f.lorem.paragraphs().replace(/\r\n/g, '')),
  primaryLanguage: {
    __typename: 'PrimaryLanguage',
    name: fake(f => f.lorem.word()),
    color: '#f1e05a',
  },
});

export const mockRepositoriesSuccess = [
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

export const mockRepositoriesError = [
  {
    request: {
      query: GET_REPOSITORIES,
    },
    result: () => {
      return {
        error: true,
      };
    },
  },
];
