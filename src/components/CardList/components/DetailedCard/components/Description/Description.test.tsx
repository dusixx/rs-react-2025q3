import { UNKNOWN } from '@common/constants.ts';
import { render, screen } from '@testing-library/react';
import { characterMock } from 'src/test-utils/mocks/character-mock.ts';
import { getNestedChild } from 'src/test-utils/utils.ts';
import { getEpisodes, getLocationName } from '../../../Card/Card.utils.ts';
import { Description, EPISODES_DATA_ATTR } from './Description.tsx';

describe('Description', () => {
  it(`Renders description correctly`, () => {
    render(<Description info={characterMock} />);

    const { id, name, status, species, origin, location, created, image, episode, url } =
      characterMock;
    const episodes = getEpisodes(episode).join(', ');

    expect(getNestedChild('DetailedCardDesc')).toBeInTheDocument();

    expect(screen.getByText(id)).toBeInTheDocument();
    expect(screen.getByText('id:')).toBeInTheDocument();

    expect(screen.getByText(name)).toBeInTheDocument();
    expect(screen.getByText('name:')).toBeInTheDocument();

    expect(screen.getByText(status)).toBeInTheDocument();
    expect(screen.getByText('status:')).toBeInTheDocument();

    expect(screen.getByText(species)).toBeInTheDocument();
    expect(screen.getByText('species:')).toBeInTheDocument();

    expect(screen.getByText(UNKNOWN)).toBeInTheDocument();
    expect(screen.getByText('type:')).toBeInTheDocument();

    expect(screen.getByText(getLocationName(origin))).toBeInTheDocument();
    expect(screen.getByText('origin:')).toBeInTheDocument();

    expect(screen.getByText(getLocationName(location))).toBeInTheDocument();
    expect(screen.getByText('location:')).toBeInTheDocument();

    expect(screen.getByText(episodes)).toBeInTheDocument();
    expect(screen.getByText('episode:')).toBeInTheDocument();

    expect(screen.queryByText(created)).toBeNull();
    expect(screen.queryByText(image)).toBeNull();
    expect(screen.queryByText(url)).toBeNull();

    expect(getNestedChild('DetailedCardDesc', 'DetailedCardEpisode')).toHaveAttribute(
      EPISODES_DATA_ATTR,
      'true',
    );
  });
});
