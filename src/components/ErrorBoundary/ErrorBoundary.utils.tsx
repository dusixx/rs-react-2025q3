import { isError, isString } from '@utils/index.ts';

export const getErrorInstance = (error: unknown): Error | undefined => {
  return isError(error) ? error : isString(error) ? Error(error) : undefined;
};
