import React from 'react';

import { useQuery } from '@apollo/react-hooks';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';

import Login from '../auth/login';

import { GET_REPOSITORIES } from '../../utils/queries';
import Repository from './repository';

function Github() {
  const [token] = React.useState(localStorage.getItem('github_token'));
  const [repositories, setRepositories] = React.useState([]);

  const { loading, error, data } = useQuery(GET_REPOSITORIES);

  React.useEffect(() => {
    if (!loading && !error && data) {
      setRepositories(data.viewer.repositories.nodes);
    }
  }, [data]);

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
