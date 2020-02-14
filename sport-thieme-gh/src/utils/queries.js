import { gql } from 'apollo-boost';

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
