import { LINK_REL_PROPS } from '@common/constants.ts';
import { render, screen } from '@testing-library/react';
import { navigateMock } from 'src/test-utils/mocks/router-dom-mock.tsx';
import { clickElement } from 'src/test-utils/utils.ts';
import AboutPage, { AUTHOR_GITHUB_URL, COURSE_PAGE_URL } from './AboutPage.tsx';

describe('AboutPage', () => {
  it(`Displays links`, () => {
    render(<AboutPage />);
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveAttribute('href', AUTHOR_GITHUB_URL);
    expect(links[0]).toHaveAttribute('rel', LINK_REL_PROPS.rel);
    expect(links[1]).toHaveAttribute('href', COURSE_PAGE_URL);
    expect(links[1]).toHaveAttribute('rel', LINK_REL_PROPS.rel);
  });

  it(`Navigates back on button click`, () => {
    render(<AboutPage />);
    const btnBack = screen.getByRole('button');
    clickElement(btnBack);
    expect(navigateMock).toHaveBeenCalledWith(-1);
  });
});
