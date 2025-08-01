import { UNKNOWN } from '@common/constants.ts';
import { serializeStyle } from '@common/utils/index.ts';
import type { CharacterInfo } from '@services/api/api.types.ts';
import { render } from '@testing-library/react';
import { getNestedChild, queryNestedChild } from 'src/test-utils/index.ts';
import { characterMock } from 'src/test-utils/mocks/character-mock.ts';
import { Card } from './Card.tsx';
import { getLocationName, getStatusIndicatorStyle, getThumbStyle } from './Card.utils.ts';

const testRenderedCard = (info: CharacterInfo): void => {
  const { image, name, status, species, location } = info;

  expect(queryNestedChild('CardIconGender')).not.toBeNull();
  expect(queryNestedChild('CardIconLocation')).not.toBeNull();
  expect(getNestedChild('CardThumb')).toHaveStyle(serializeStyle(getThumbStyle(image)));
  expect(getNestedChild('CardStatusIndicator')).toHaveStyle(
    serializeStyle(getStatusIndicatorStyle(status)),
  );
  expect(getNestedChild('CardName')).toHaveTextContent(name || UNKNOWN);
  expect(getNestedChild('CardStatus')).toHaveTextContent(status || UNKNOWN);
  expect(getNestedChild('CardSpecies')).toHaveTextContent(species || UNKNOWN);
  expect(getNestedChild('CardLocation')).toHaveTextContent(getLocationName(location) || UNKNOWN);
  if (image) {
    expect(getNestedChild('CardImage')).toHaveAttribute('src', image);
  } else {
    expect(queryNestedChild('CardImage')).toBeNull();
  }
};

describe('Card', () => {
  it(`Renders full character info`, () => {
    render(<Card info={characterMock} />);
    testRenderedCard(characterMock);
  });

  it(`Renders incomplete character info`, () => {
    const infoMock = { id: 1 };
    render(<Card info={infoMock} />);
    testRenderedCard(infoMock);
  });
});
