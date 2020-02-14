import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';

import CodeIcon from '@material-ui/icons/Code';
import PageviewIcon from '@material-ui/icons/Pageview';

const useStyles = makeStyles(theme => ({
  principalLanguage: {
    marginRight: theme.spacing(2),
  },
}));

function Repository({ repository }) {
  const classes = useStyles();
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar
          style={{
            backgroundColor: repository.primaryLanguage
              ? repository.primaryLanguage.color
              : '',
          }}>
          <CodeIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={repository.name}
        secondary={repository.description}
      />
      <ListItemSecondaryAction>
        {repository.primaryLanguage && (
          <Chip
            label={repository.primaryLanguage.name}
            variant="outlined"
            className={classes.principalLanguage}
          />
        )}

        <Button variant="contained" size="small" startIcon={<PageviewIcon />}>
          See More
        </Button>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

export default Repository;
