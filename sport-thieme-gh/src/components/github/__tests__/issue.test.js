import React from 'react';
import moment from 'moment';
import { render } from '@testing-library/react';

import Issue from '../issue';

import { issueBuilder } from '../../../test/mocks';

describe('Issue Component:', () => {
  it('renders issue', async () => {
    const issue = issueBuilder();
    const { getByText } = render(<Issue issue={issue}></Issue>);
    expect(getByText(issue.title)).toBeInTheDocument();
    expect(
      getByText(moment(issue.createdAt).format('DD.MM.YYYY hh:mm')),
    ).toBeInTheDocument();
  });
});
