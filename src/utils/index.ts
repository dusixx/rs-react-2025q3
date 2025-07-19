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

export const getErrorInstance = (error: unknown): Error | undefined => {
  return isError(error) ? error : isString(error) ? Error(error) : undefined;
};

export const getErrorMessage = (error: unknown, defaultMessage: string = ''): string => {
  return isString(error) ? error : isError(error) ? error.message : defaultMessage;
};
