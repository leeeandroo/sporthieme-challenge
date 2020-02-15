import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useQuery } from '@apollo/react-hooks';

import {
  Avatar,
  Badge,
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  Grid,
  List,
  Paper,
  Typography,
} from '@material-ui/core';

import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import GitHubIcon from '@material-ui/icons/GitHub';

import Issue from './issue';

import { GET_REPOSITORY } from '../../utils/queries';

const ISSUE_STATES = ['ALL', 'OPEN', 'CLOSED'];

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: '100%',
  },
  language: {
    margin: theme.spacing(1),
  },
  actionButton: {
    margin: theme.spacing(1),
  },
  filterBox: {
    padding: theme.spacing(1),
  },
}));

function RepositoryDetail({ repository_name }) {
  const classes = useStyles();
  const [visibleIssues, setVisibleIssues] = React.useState([]);
  const [issueState, setIssueState] = React.useState(ISSUE_STATES[1]);
  const { loading, error, data } = useQuery(GET_REPOSITORY, {
    variables: { name: repository_name },
  });

  React.useEffect(() => {
    if (!loading && !error && data) {
      let issues = data.viewer.repository.issues.nodes;
      if (issueState !== ISSUE_STATES[0]) {
        issues = issues.filter(item => item.state === issueState);
      }
      setVisibleIssues(issues);
    }
  }, [data, error, loading, issueState]);

  const handleIssueState = state => {
    setIssueState(state);
  };

  if (error) {
    return <p>Something went wrong, please try again later.</p>;
  }

  if (!loading && !error && data && data.viewer.repository) {
    const { repository } = data.viewer;

    return (
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar
              className={classes.avatar}
              alt={repository.owner.login}
              src={repository.owner.avatarUrl}></Avatar>
          }
          title={repository.name}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {repository.description}
          </Typography>

          {repository.languages.nodes.map(language => {
            return (
              <Chip
                key={language.name}
                label={language.name}
                variant="outlined"
                className={classes.language}
              />
            );
          })}
        </CardContent>
        <CardActions>
          <Grid container spacing={3}>
            <Grid item xs>
              <Paper>
                <Badge
                  badgeContent={repository.openIssues.totalCount}
                  color="primary"
                  className={classes.actionButton}>
                  <ErrorOutlineIcon />
                  Issues
                </Badge>

                <Divider />
                <ButtonGroup color="primary" className={classes.filterBox}>
                  {ISSUE_STATES.map(state => {
                    return (
                      <Button
                        disabled={issueState === state}
                        onClick={() => handleIssueState(state)}>
                        {state}
                      </Button>
                    );
                  })}
                </ButtonGroup>
                <Divider />

                <List>
                  {visibleIssues.map(issue => {
                    return <Issue key={issue.title} issue={issue} />;
                  })}
                </List>
              </Paper>
            </Grid>
            <Grid item xs>
              <Paper>
                <Badge
                  badgeContent={repository.pullRequests.totalCount}
                  color="primary"
                  className={classes.actionButton}>
                  <GitHubIcon />
                  Pull requests
                </Badge>
                <Divider />
              </Paper>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    );
  }

  return <p>Repository not found!</p>;
}

export default RepositoryDetail;
