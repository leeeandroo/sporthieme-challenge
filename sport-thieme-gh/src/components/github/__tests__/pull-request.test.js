import React from 'react';
import moment from 'moment';
import { render } from '@testing-library/react';

import PullRequest from '../pull-request';

import { pullrequestBuilder } from '../../../test/mocks';

describe('PullRequest Component:', () => {
  it('renders pull request', async () => {
    const pullRequest = pullrequestBuilder();
    const { getByText } = render(
      <PullRequest pullrequest={pullRequest}></PullRequest>,
    );
    expect(getByText(pullRequest.title)).toBeInTheDocument();
    expect(
      getByText(moment(pullRequest.createdAt).format('DD.MM.YYYY hh:mm')),
    ).toBeInTheDocument();
  });
});
