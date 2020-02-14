import React from 'react';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

import Login from '../auth/login';

function Github() {
  const [token] = React.useState(localStorage.getItem('github_token'));

  return (
    <Grid item p={2}>
      <Box component="div" p={2}>
        {token ? (
          <p>Please choose the repository you want to see more information:</p>
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
