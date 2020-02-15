import React from 'react';
import moment from 'moment';
import { render } from '@testing-library/react';

import IssueDetail from '../issue-detail';

import { issueBuilder } from '../../../test/mocks';

describe('IssueDetail Component:', () => {
  it('renders issue detail', async () => {
    const issue = issueBuilder();
    const { getByText } = render(<IssueDetail issue={issue}></IssueDetail>);
    expect(getByText(issue.body)).toBeInTheDocument();
  });

  it('renders comment', async () => {
    const issue = issueBuilder();
    const { getByText } = render(<IssueDetail issue={issue}></IssueDetail>);

    expect(getByText(/comments/i)).toBeInTheDocument();
    expect(getByText(issue.comments.nodes[0].body)).toBeInTheDocument();
  });
});
