/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { render } from '@testing-library/react';
import { act, type ReactNode } from 'react';
import { characterMock, searchResultMock } from 'src/test-utils/mocks/character-mock.ts';
import { fetchMock } from 'src/test-utils/mocks/index.ts';
import { ProvidersMock } from 'src/test-utils/mocks/provider-mock.tsx';
import { vi } from 'vitest';
import { useGetCharacterByIdQuery, useGetCharactersByNameQuery } from './api.ts';
import type { SearchResult } from './api.types.ts';

const ERR_FETCH = 'fetch error';
const ERR_NO_RESULTS = 'no results';

vi.mock('@utils/index.ts', async () => {
  const actual = await vi.importActual('@utils/index.ts');
  return {
    ...actual,
    delay: vi.fn(),
  };
});

describe('API tests', () => {
  const renderMock = async (Comp: ReactNode): Promise<void> => {
    await act(async () => {
      render(Comp, { wrapper: ProvidersMock });
      return Promise.resolve();
    });
  };

  it(`Handles fetch rejection`, async () => {
    let result = {};
    const Comp = (): ReactNode => {
      result = useGetCharactersByNameQuery({ name: 'rick', page: 1 });
      return;
    };
    fetchMock.mockRejectedValueOnce(ERR_FETCH);
    await renderMock(<Comp />);

    expect(fetchMock.mocked).toHaveBeenCalled();
    await act(() => vi.runAllTimers());
    expect(result).toHaveProperty('status', 'rejected');
    expect(result).toHaveProperty('error', {
      status: 'FETCH_ERROR',
      error: `Error: ${ERR_FETCH}`,
    });
  });

  it(`Handles valid search results by name`, async () => {
    let result = {};
    const Comp = (): ReactNode => {
      result = useGetCharactersByNameQuery({ name: 'beth', page: 2 });
      return;
    };
    fetchMock.mockResolvedValueOnce(searchResultMock, { status: 200 });
    await renderMock(<Comp />);

    const res = (await fetchMock.mocked.mock.results[0].value) as { json(): Promise<SearchResult> };
    expect(await res.json()).toEqual(searchResultMock);

    expect(fetchMock.mocked).toHaveBeenCalled();
    await act(() => vi.runAllTimers());
    expect(result).toHaveProperty('status', 'fulfilled');
    expect(result).toHaveProperty('data', searchResultMock);
  });

  it(`Handles valid search results by id`, async () => {
    let result = {};
    const Comp = (): ReactNode => {
      result = useGetCharacterByIdQuery(3);
      return;
    };
    fetchMock.mockResolvedValueOnce(characterMock, { status: 200 });
    await renderMock(<Comp />);

    expect(fetchMock.mocked).toHaveBeenCalled();
    await act(() => vi.runAllTimers());
    expect(result).toHaveProperty('status', 'fulfilled');
    expect(result).toHaveProperty('data', characterMock);
  });

  it(`Handles invalid search results`, async () => {
    let result = {};
    const Comp = (): ReactNode => {
      result = useGetCharacterByIdQuery(10);
      return;
    };
    fetchMock.mockResolvedValueOnce({ error: ERR_NO_RESULTS }, { status: 404 });
    await renderMock(<Comp />);

    expect(fetchMock.mocked).toHaveBeenCalled();
    await act(() => vi.runAllTimers());
    expect(result).toHaveProperty('status', 'rejected');
    expect(result).toHaveProperty('error', {
      status: 404,
      data: { error: ERR_NO_RESULTS },
    });
  });
});
