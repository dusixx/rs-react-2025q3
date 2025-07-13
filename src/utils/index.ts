import { toast } from 'react-toastify';

export const isObject = (obj: unknown): obj is object => {
  return obj != null && typeof obj === 'object';
};

export const isString = (obj: unknown): obj is string => {
  return typeof obj === 'string';
};

export const isError = (obj: unknown): obj is Error => {
  return obj instanceof Error;
};

export const hasOwnKeys = <K extends string>(
  obj: unknown,
  ...keys: K[]
): obj is object & { [key in K]: unknown } => {
  return isObject(obj) && keys.every(key => Object.prototype.hasOwnProperty.call(obj, key));
};

export const showErrorToast = (stringOrError: unknown): void => {
  if (isError(stringOrError)) {
    toast.error(stringOrError.message);
  } else if (isString(stringOrError) && stringOrError) {
    toast.error(stringOrError);
  }
};

export const areStringsEqual = (
  str1: string,
  str2: string,
  { ignoreCase = true, locales }: { ignoreCase: boolean; locales: string },
): boolean => {
  const result = ignoreCase
    ? str1.localeCompare(str2, locales, { sensitivity: 'base' })
    : str1.localeCompare(str2);
  return result === 0;
};
