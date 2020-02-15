import React from 'react';
import { Link } from '@reach/router';
import moment from 'moment';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';

import PageviewIcon from '@material-ui/icons/Pageview';

function Issue({ issue }) {
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar alt={issue.author.login} src={issue.author.avatarUrl}></Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={issue.title}
        secondary={moment(issue.createdAt).format('DD.MM.YYYY hh:mm')}
      />
      <ListItemSecondaryAction>
        <Button
          variant="contained"
          size="small"
          startIcon={<PageviewIcon />}
          component={Link}
          to={`/repository/${issue.name}`}>
          See More
        </Button>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

export default Issue;
