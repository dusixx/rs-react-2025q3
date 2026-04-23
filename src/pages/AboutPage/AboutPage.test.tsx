import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { navigateMock } from 'src/test-utils/mocks/router-dom-mock.tsx';
import { clickElement } from 'src/test-utils/utils.ts';
import { AUTHOR_LINK_PROPS, COURSE_LINK_PROPS } from './AboutPage.constants.ts';
import AboutPage from './AboutPage.tsx';

describe('AboutPage', () => {
  it(`Displays links`, () => {
    render(
      <MemoryRouter>
        <AboutPage />
      </MemoryRouter>,
    );
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveAttribute('href', AUTHOR_LINK_PROPS.href);
    expect(links[0]).toHaveAttribute('rel', AUTHOR_LINK_PROPS.rel);
    expect(links[1]).toHaveAttribute('href', COURSE_LINK_PROPS.href);
    expect(links[1]).toHaveAttribute('rel', COURSE_LINK_PROPS.rel);
  });

  it(`Navigates back on button click`, () => {
    render(
      <MemoryRouter>
        <AboutPage />
      </MemoryRouter>,
    );
    const btnBack = screen.getByRole('button');
    clickElement(btnBack);
    expect(navigateMock).toHaveBeenCalledWith(-1);
  });
});
