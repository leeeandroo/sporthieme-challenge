import { build, fake } from 'test-data-bot';

import { GET_REPOSITORIES, GET_REPOSITORY } from '../utils/queries';

export const repositoriesBuilder = build('Repository').fields({
  __typename: 'Repository',
  name: fake(f => f.lorem.words()),
  description: fake(f => f.lorem.paragraphs().replace(/\r\n/g, '')),
  primaryLanguage: {
    __typename: 'PrimaryLanguage',
    name: fake(f => f.lorem.word()),
    color: '#f1e05a',
  },
});

const languageBuilder = build('Language').fields({
  __typename: 'Language',
  name: fake(f => f.lorem.word()),
});

const userBuilder = build('User').fields({
  __typename: 'User',
  login: fake(f => f.internet.userName()),
  avatarUrl: fake(f => f.image.avatar()),
});

const labelBuilder = build('Label').fields({
  __typename: 'Label',
  name: fake(f => f.internet.userName()),
  color: fake(f => f.internet.color()),
});

const issueBuilder = build('Language').fields({
  __typename: 'Issue',
  title: fake(f => f.lorem.words()),
  body: fake(f => f.lorem.paragraphs()),
  state: 'OPEN',
  createdAt: fake(f => f.date.recent()),
  assignees: {
    __typename: 'UserConnection',
    nodes: [userBuilder()],
  },
  author: userBuilder(),
  labels: {
    __typename: 'LabelConnection',
    nodes: [labelBuilder()],
  },
});

const commentBuilder = build('Comment').fields({
  __typename: 'Comment',
  title: fake(f => f.lorem.words()),
  createdAt: fake(f => f.date.recent()),
  author: userBuilder(),
  body: fake(f => f.lorem.paragraphs()),
  comments: {
    __typename: 'Comment',
    author: userBuilder(),
    body: fake(f => f.lorem.paragraphs()),
    createdAt: fake(f => f.date.recent()),
  },
});

const pullrequestBuilder = build('PullRequest').fields({
  __typename: 'PullRequest',
  title: fake(f => f.lorem.words()),
  createdAt: fake(f => f.date.recent()),
  author: userBuilder(),
  body: fake(f => f.lorem.paragraphs()),
  comments: {
    __typename: 'CommentsConnection',
    nodes: [commentBuilder(), commentBuilder()],
  },
});

export const repositoryBuilder = build('Repository').fields({
  __typename: 'Repository',
  name: fake(f => f.lorem.words()),
  description: fake(f => f.lorem.paragraphs().replace(/\r\n/g, '')),
  primaryLanguage: {
    __typename: 'PrimaryLanguage',
    name: fake(f => f.lorem.word()),
    color: fake(f => f.internet.color()),
  },
  languages: {
    __typename: 'Languages',
    nodes: [languageBuilder(), languageBuilder()],
  },
  owner: userBuilder(),
  issues: {
    __typename: 'IssueConnection',
    totalCount: 2,
    nodes: [issueBuilder(), issueBuilder()],
  },
  openIssues: {
    __typename: 'IssueConnection',
    totalCount: 2,
  },
  labels: {
    __typename: 'LabelConnection',
    nodes: [labelBuilder()],
  },
  pullRequests: {
    __typename: 'PullRequestConnection',
    totalCount: 3,
    nodes: [pullrequestBuilder(), pullrequestBuilder(), pullrequestBuilder()],
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
            nodes: [repositoriesBuilder()],
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

const repository = repositoryBuilder();

export const mockRepositorySuccess = [
  {
    request: {
      query: GET_REPOSITORY,
      variables: { name: repository.name },
    },
    result: {
      data: {
        viewer: {
          __typename: 'Viewer',
          repository: repository,
        },
      },
    },
  },
];

export const mockRepositoryError = [
  {
    request: {
      query: GET_REPOSITORY,
    },
    result: () => {
      return {
        error: true,
      };
    },
  },
];
