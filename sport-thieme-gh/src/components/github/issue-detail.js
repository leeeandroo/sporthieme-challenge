import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';

import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  content: {
    padding: theme.spacing(2),
  },
  issueBody: {
    paddingBottom: theme.spacing(2),
  },
  commentsBox: {
    padding: theme.spacing(2),
  },
}));

function IssueDetail({ issue }) {
  const classes = useStyles();

  return (
    <Paper className={classes.content}>
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar
              className={classes.avatar}
              alt={issue.author.login}
              src={issue.author.avatarUrl}></Avatar>
          }
          title={issue.author.login}
        />
        <CardContent>
          <Typography
            variant="body2"
            component="p"
            className={classes.issueBody}>
            {issue.body}
          </Typography>

          <Divider />

          <div className={classes.commentsBox}>
            <Typography component="h3">Comments</Typography>
            <List>
              {issue.comments.nodes.map((comment, index) => {
                return (
                  <ListItem key={`comment_${index}`}>
                    <ListItemAvatar>
                      <Avatar
                        alt={comment.author.login}
                        src={comment.author.avatarUrl}></Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={comment.body}
                      secondary={
                        <React.Fragment>
                          <Typography
                            component="span"
                            variant="body2"
                            color="textPrimary">
                            {moment(comment.createdAt).format(
                              'DD.MM.YYYY hh:mm',
                            )}
                          </Typography>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                );
              })}
            </List>
          </div>
        </CardContent>
      </Card>
    </Paper>
  );
}

export default IssueDetail;
