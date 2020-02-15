import { gql } from 'apollo-boost';

import { IssueNodeFragment } from './fragments';

export const GET_REPOSITORIES = gql`
  query {
    viewer {
      repositories(first: 100, orderBy: { field: NAME, direction: ASC }) {
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
          name
          description
          primaryLanguage {
            name
            color
          }
        }
      }
    }
  }
`;

export const GET_REPOSITORY = gql`
  query($name: String!) {
    viewer {
      repository(name: $name) {
        name
        description
        languages(first: 5, orderBy: { field: SIZE, direction: DESC }) {
          nodes {
            name
          }
        }
        owner {
          login
          avatarUrl
        }
        issues(first: 100, orderBy: { field: CREATED_AT, direction: DESC }) {
          totalCount
          nodes {
            ...IssueNode
          }
        }
        openIssues: issues(first: 100, states: [OPEN]) {
          totalCount
        }
        pullRequests(
          first: 100
          orderBy: { field: CREATED_AT, direction: DESC }
        ) {
          totalCount
          nodes {
            title
            createdAt
            author {
              avatarUrl
              login
            }
            body
            comments(first: 100) {
              nodes {
                author {
                  avatarUrl
                  login
                }
                body
                createdAt
              }
            }
          }
        }
      }
    }
  }
  ${IssueNodeFragment}
`;
