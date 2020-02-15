import React from 'react';
import moment from 'moment';

import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';

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
