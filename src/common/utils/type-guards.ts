/* eslint-disable @typescript-eslint/no-unnecessary-type-parameters */
export const isObject = (obj: unknown): obj is Record<string, unknown> => {
  return obj != null && typeof obj === 'object';
};

export const isString = (obj: unknown): obj is string => {
  return typeof obj === 'string';
};

export const isError = (obj: unknown): obj is Error => {
  return obj instanceof Error;
};

export const isInteger = (obj: unknown): obj is number => {
  return Number.isInteger(obj);
};

export const isPositiveInteger = (obj: unknown): obj is number => {
  return isInteger(obj) && obj > 0;
};

const _every = <T>(typeGuard: (obj: unknown) => obj is T, args: unknown[]): args is T[] => {
  return args.every(typeGuard);
};

export const every = <T>(
  typeGuard: (obj: unknown) => obj is T,
  ...args: unknown[]
): ReturnType<typeof _every> => {
  return _every<T>(typeGuard, args);
};

export const isEqualToOneOf = <T extends object>(key: string, ...keys: (keyof T)[]): boolean => {
  return keys.some(k => Object.is(k, key));
};

export const hasOwnKeys = <T extends object>(obj: unknown, ...keys: (keyof T)[]): obj is T => {
  return isObject(obj) && keys.every(key => Object.prototype.hasOwnProperty.call(obj, key));
};
