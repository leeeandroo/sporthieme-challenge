import React from 'react';

import Button from '@material-ui/core/Button';

import {
  GH_ACCESS_TOKEN_API_URI,
  GH_AUTH_API_URI,
  GH_CLIENT_ID,
  GH_REDIRECT_URI,
} from '../../utils/github';

function Login() {
  const handleGithubValidation = () => {
    const gh_auth_url = `${GH_AUTH_API_URI}?client_id=${GH_CLIENT_ID}&scope=user&redirect_uri=${GH_REDIRECT_URI}`;
    window.location.assign(gh_auth_url);
  };

  const setGithubAccessToken = async code => {
    const config = {
      method: 'GET',
      headers: { 'content-type': 'application/json' },
    };
    await window
      .fetch(`${GH_ACCESS_TOKEN_API_URI}/${code}`, config)
      .then(r => {
        return r.json();
      })
      .then(({ token }) => {
        localStorage.setItem('github_token', token);
        window.location.assign('/');
      });
  };

  const code =
    window.location.href.match(/\?code=(.*)/) &&
    window.location.href.match(/\?code=(.*)/)[1];

  if (code) {
    setGithubAccessToken(code);
  }

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={handleGithubValidation}>
      Authorize
    </Button>
  );
}

export default Login;
