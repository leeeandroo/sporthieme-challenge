import React from 'react';
import moment from 'moment';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

import PageviewIcon from '@material-ui/icons/Pageview';

import IssueDetail from './issue-detail';
import SimpleDialog from '../dialog';

function Issue({ issue }) {
  const [open, setOpen] = React.useState(false);

  const handleSeeIssue = () => {
    setOpen(!open);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <ListItem>
        <ListItemAvatar>
          <Avatar
            alt={issue.author.login}
            src={issue.author.avatarUrl}></Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={issue.title}
          secondary={
            <React.Fragment>
              <Typography component="span" variant="body2" color="textPrimary">
                {moment(issue.createdAt).format('DD.MM.YYYY hh:mm')}
              </Typography>
            </React.Fragment>
          }
        />
        <ListItemSecondaryAction>
          <Button
            variant="contained"
            size="small"
            startIcon={<PageviewIcon />}
            onClick={handleSeeIssue}>
            See Issue
          </Button>
        </ListItemSecondaryAction>
      </ListItem>
      <SimpleDialog title={issue.title} open={open} onClose={handleCloseDialog}>
        <IssueDetail issue={issue}></IssueDetail>
      </SimpleDialog>
    </React.Fragment>
  );
}

export default Issue;
