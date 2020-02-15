import { gql } from 'apollo-boost';

export const IssueNodeFragment = gql`
  fragment IssueNode on Issue {
    title
    body
    state
    createdAt
    assignees(first: 100) {
      nodes {
        avatarUrl
        login
      }
    }
    author {
      login
      avatarUrl
    }
    labels(first: 100) {
      nodes {
        name
        color
      }
    }
  }
`;
