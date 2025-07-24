/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { vi } from 'vitest';

vi.stubGlobal('fetch', vi.fn());

export const mockFetchResolvedValue = (
  json: unknown,
  responseRest?: Partial<Response>,
  once: boolean = true,
): void => {
  vi.mocked(global.fetch)[once ? 'mockResolvedValueOnce' : 'mockResolvedValue']({
    json() {
      return json;
    },
    ...responseRest,
  } as Response);
};

export const mockFetchRejectedValue = (errorMessage: string, once: boolean = true): void => {
  vi.mocked(global.fetch)[once ? 'mockRejectedValueOnce' : 'mockRejectedValue'](
    Error(errorMessage),
  );
};
