import React from 'react';
import { Router } from '@reach/router';
import Github from './github';

export default function Routes() {
  return (
    <Router>
      <Github path="/" />
    </Router>
  );
}
