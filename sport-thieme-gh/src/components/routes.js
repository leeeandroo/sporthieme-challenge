import React from 'react';
import { Router } from '@reach/router';

import Github from './github';
import RepositoryDetail from './github/repository-detail';

export default function Routes() {
  return (
    <Router>
      <Github path="/" />
      <RepositoryDetail path="/repository/:repository_name" />
    </Router>
  );
}
