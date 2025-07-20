import type { CharacterInfo } from '@services/api.types.ts';
import { render } from '@testing-library/react';
import { serializeStyle } from '@utils/index.ts';
import {
  CharacterInfoMock,
  getCharacterInfoMock,
  getNestedChild,
  queryNestedChild,
} from 'src/test-utils/index.ts';
import { Card, UNKNOWN_VALUE } from './Card.tsx';
import { getLocationName, getStatusIndicatorStyle, getThumbStyle } from './Card.utils.ts';

const testRenderedCard = (info: CharacterInfo): void => {
  const { image, name, status, species, location } = info;

  expect(queryNestedChild('CardIconGender')).not.toBeNull();
  expect(queryNestedChild('CardIconLocation')).not.toBeNull();
  expect(getNestedChild('CardThumb')).toHaveStyle(serializeStyle(getThumbStyle(image)));
  expect(getNestedChild('CardStatusIndicator')).toHaveStyle(
    serializeStyle(getStatusIndicatorStyle(status)),
  );
  expect(getNestedChild('CardName').textContent).toEqual(name || UNKNOWN_VALUE);
  expect(getNestedChild('CardStatus').textContent).toEqual(status || UNKNOWN_VALUE);
  expect(getNestedChild('CardSpecies').textContent).toEqual(species || UNKNOWN_VALUE);
  expect(getNestedChild('CardLocation').textContent).toEqual(
    getLocationName(location) || UNKNOWN_VALUE,
  );
  if (image) {
    expect(getNestedChild('CardImage')).toHaveAttribute('src', image);
  } else {
    expect(queryNestedChild('CardImage')).toBeNull();
  }
};

describe('Card', () => {
  it(`Renders full character info`, () => {
    render(<Card info={CharacterInfoMock} />);
    testRenderedCard(CharacterInfoMock);
  });

  it(`Renders incomplete character info`, () => {
    render(<Card info={{ id: 1 }} />);
    testRenderedCard({ id: 1 });
  });

  it(`Renders random character info`, () => {
    const infoMock = getCharacterInfoMock();
    render(<Card info={infoMock} />);
    testRenderedCard(infoMock);
  });
});
