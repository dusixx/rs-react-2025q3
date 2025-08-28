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

export const hasOwnKeys = <T extends object>(obj: unknown, ...keys: (keyof T)[]): obj is T => {
  return isObject(obj) && keys.every(key => Object.prototype.hasOwnProperty.call(obj, key));
};
