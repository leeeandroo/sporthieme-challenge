import React from 'react';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

function Github() {
  return (
    <Grid item p={2}>
      <Box component="div" p={2}>
        <p>Please choose the repository you want to see more information:</p>
      </Box>
    </Grid>
  );
}

export default Github;
