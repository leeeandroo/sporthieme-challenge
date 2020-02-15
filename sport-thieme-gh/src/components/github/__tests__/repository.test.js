import React from 'react';
import { render } from '@testing-library/react';

import Repository from '../repository';

import { repositoryBuilder } from '../../../test/mocks';

describe('Repository Component:', () => {
  it('renders repository', async () => {
    const repository = repositoryBuilder();
    const { getByText } = render(
      <Repository repository={repository}></Repository>,
    );
    expect(getByText(repository.name)).toBeInTheDocument();
    expect(getByText(repository.primaryLanguage.name)).toBeInTheDocument();
  });

  it('can see "see more" button', async () => {
    const repository = repositoryBuilder();

    const { getByText } = render(
      <Repository repository={repository}></Repository>,
    );

    expect(getByText(/See more/i)).toBeInTheDocument();
  });
});
