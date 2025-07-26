/* eslint-disable @typescript-eslint/no-unnecessary-type-parameters */
export const isObject = (obj: unknown): obj is object => {
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

const _every = <T>(typeGuard: (obj: unknown) => obj is T, args: unknown[]): args is T[] => {
  return args.every(typeGuard);
};

export const every = <T>(
  typeGuard: (obj: unknown) => obj is T,
  ...args: unknown[]
): ReturnType<typeof _every> => {
  return _every<T>(typeGuard, args);
};

export const hasOwnKeys = <T extends object>(obj: unknown, ...keys: (keyof T)[]): obj is T => {
  return isObject(obj) && keys.every(key => Object.prototype.hasOwnProperty.call(obj, key));
};
