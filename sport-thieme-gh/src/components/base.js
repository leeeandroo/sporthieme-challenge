import React from 'react';
import { Link } from '@reach/router';
import { makeStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import logo from '../images/sport-thieme-logo.png';
import octocat from '../images/octocat.png';

import Login from './auth/login';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: '#ffffff',
    color: '#004884',
    borderTop: '10px solid #004884',
  },
  title: {
    flexGrow: 1,
    textAlign: 'right',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginTop: '120px',
  },
  logo: {
    maxHeight: '80px',
  },
}));

function Base({ children }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Link to="/">
            <img src={logo} className={classes.logo} alt="Sport-Thieme" />
          </Link>

          <Typography variant="h6" noWrap className={classes.title}>
            <Login />
            <img src={octocat} className={classes.logo} alt="GitHub" />
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth={false} className={classes.content}>
        {children}
      </Container>
    </div>
  );
}

export default Base;
