import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';

import Login from '../auth/login';
import Repository from './repository';

import { GET_REPOSITORIES } from '../../utils/queries';

function Github() {
  const [token] = React.useState(window.localStorage.getItem('github_token'));
  const [repositories, setRepositories] = React.useState([]);

  const { loading, error, data } = useQuery(GET_REPOSITORIES);

  React.useEffect(() => {
    if (!loading && !error && data) {
      setRepositories(data.viewer.repositories.nodes);
    }
  }, [data, error, loading]);

  if (!loading && error) {
    return <p>Something went wrong, please try again later.</p>;
  }

  return (
    <Grid item p={2}>
      <Box component="div" p={2}>
        {token ? (
          <React.Fragment>
            <p>
              Please choose the repository you want to see more information:
            </p>
            {error && <p>Something went wrong, please try again.</p>}
            <List>
              {repositories.map(repository => {
                return (
                  <Repository repository={repository} key={repository.name} />
                );
              })}
            </List>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <p>
              Please authorize our app to allow us to see your repositories.
            </p>
            <Login />
          </React.Fragment>
        )}
      </Box>
    </Grid>
  );
}

export default Github;
