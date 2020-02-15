import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';

import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Divider from '@material-ui/core/Divider';
import InputBase from '@material-ui/core/InputBase';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

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
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  searchForm: {
    maxWidth: '265px',
  },
  title: {
    paddingBottom: theme.spacing(2),
    fontSize: '18px',
  },
}));

function IssueDetail({ issue }) {
  const classes = useStyles();

  const [visibleComments, setVisibleComments] = React.useState(
    issue.comments.nodes,
  );

  const [filter, setFilter] = React.useState();

  const handleSearch = event => {
    event.preventDefault();
    setFilter(event.target.elements.search.value);
  };

  React.useEffect(() => {
    let comments = issue.comments.nodes;
    if (filter) {
      comments = comments.filter(item =>
        item.body.toLowerCase().includes(filter.toLowerCase()),
      );
      setVisibleComments(comments);
    } else {
      setVisibleComments(comments);
    }
  }, [filter, setVisibleComments, issue.comments.nodes]);

  return (
    <React.Fragment>
      <Paper className={classes.content}>
        <Card>
          <CardHeader
            avatar={
              <Avatar
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
              <Typography component="h2" className={classes.title}>
                Comments
              </Typography>
              <Paper
                component="form"
                className={classes.searchForm}
                onSubmit={handleSearch}>
                <InputBase
                  className={classes.input}
                  placeholder="Search Comment"
                  name="search"
                />
                <IconButton
                  type="submit"
                  className={classes.iconButton}
                  aria-label="search">
                  <SearchIcon />
                </IconButton>
              </Paper>
              <List>
                {visibleComments.map((comment, index) => {
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
    </React.Fragment>
  );
}

export default IssueDetail;
