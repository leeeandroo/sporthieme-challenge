import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';

import Base from './components/base';
import Routes from './components/routes';
import { apolloClient } from './utils/graphql';

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <Base>
        <Routes />
      </Base>
    </ApolloProvider>
  );
}

export default App;
