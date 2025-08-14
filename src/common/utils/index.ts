import { ERR_SOMETHING_WRONG } from '@common/constants';
import { isError, isInteger, isPositiveInteger, isString } from './type-guards.ts';

export * from './type-guards.ts';

export const areStringsEqual = (
  str1: string,
  str2: string,
  { ignoreCase = true, locales }: { ignoreCase: boolean; locales: string },
): boolean => {
  return str1.localeCompare(str2, locales, ignoreCase ? { sensitivity: 'base' } : undefined) === 0;
};

export const serializeStyle = (style: object): string => {
  return JSON.stringify(style)
    .replace(/[^\w:,.]/gi, '')
    .replace(/,/g, ';');
};

export const rndInt = (min: number, max: number): number => {
  return Math.round(min + Math.random() * (max - min));
};

export const chooseOneRandomly = <T>(...values: T[]): T => {
  return values[rndInt(0, values.length - 1)];
};

export const getErrorInstance = (
  error: unknown,
  defaultMessage = ERR_SOMETHING_WRONG,
): Error | undefined => {
  return isError(error) ? error : isString(error) ? Error(error) : Error(defaultMessage);
};

export const getErrorMessage = (error: unknown, defaultMessage: string = ''): string => {
  return isString(error) ? error : isError(error) ? error.message : defaultMessage;
};

export const isNumeric = (v: string | number): boolean => {
  const num = parseFloat(v.toString());
  return !isNaN(num) && isFinite(num);
};

export const isNumericInteger = (v: string): boolean => {
  return isNumeric(v) && isInteger(Number(v));
};

export const isNumericPositiveInteger = (v: number | string): boolean => {
  return isNumeric(v) && isPositiveInteger(Number(v));
};

export const mapObjectValues = <T>(
  obj: Record<string, unknown>,
  mapper: (v: unknown) => T,
): Record<string, T> => {
  return Object.keys(obj).reduce<Record<string, T>>((res, key) => {
    res[key] = mapper(obj[key]);
    return res;
  }, {});
};

export const capitalize = (str: string, locale: string = navigator.language): string => {
  return str.replace(/^\p{CWU}/u, char => char.toLocaleUpperCase(locale));
};

export const delay = (delay: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, delay));
};
