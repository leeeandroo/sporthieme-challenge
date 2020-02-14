export const GH_CLIENT_ID =
  process.env.REACT_APP_GH_CLIENT_ID || '5af877cb1c5cb1ac7de4';
export const GH_CLIENT_SECRET =
  process.env.REACT_APP_GH_CLIENT_SECRET ||
  'f5946977bf2ff32f6a345e697b92bab3e6c3e719';
export const GH_REDIRECT_URI =
  process.env.REACT_APP_GH_REDIRECT_URI || 'http://localhost:3000/';
export const GH_AUTH_API_URI =
  process.env.REACT_APP_GH_AUTH_API_URI ||
  'https://github.com/login/oauth/authorize';
export const GH_ACCESS_TOKEN_API_URI =
  process.env.REACT_APP_GH_ACCESS_TOKEN_API_URI ||
  'https://sp-th-gatekeeper.herokuapp.com/authenticate';
