import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({}));

function Github() {
  return (
    <Grid container p={2}>
      <Grid item p={2}>
        <Box component="div" p={2}></Box>
      </Grid>
    </Grid>
  );
}

export default Github;
