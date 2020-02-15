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

function PullRequest({ pullrequest }) {
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar
          alt={pullrequest.author.login}
          src={pullrequest.author.avatarUrl}></Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={pullrequest.title}
        secondary={moment(pullrequest.createdAt).format('DD.MM.YYYY hh:mm')}
      />
    </ListItem>
  );
}

export default PullRequest;
