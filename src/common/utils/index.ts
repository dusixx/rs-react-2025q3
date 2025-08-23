import type { KeyboardEventKey } from '@common/constants.ts';
import { ERR_SOMETHING_WRONG } from '@common/constants.ts';
import type { FormEvent } from 'react';
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

export const isKeyPressed = (key: keyof typeof KeyboardEventKey, event: Event): boolean => {
  if (!(event instanceof KeyboardEvent)) {
    return false;
  }
  const { key: k, ctrlKey: ctrl, altKey: alt, shiftKey: shift } = event;
  return k === key.toString() && !ctrl && !alt && !shift;
};

export const getFormData = (
  obj: HTMLFormElement | FormEvent<HTMLFormElement>,
): Record<string, FormDataEntryValue> => {
  const form = obj instanceof HTMLFormElement ? obj : obj.currentTarget;
  return Object.fromEntries(new FormData(form).entries());
};

export const fileToBase64 = async (file: File): Promise<string> => {
  const reader = new FileReader();
  reader.readAsDataURL(file);

  return new Promise((resolve, reject) => {
    reader.onload = (): void => {
      resolve(isString(reader.result) ? reader.result : '');
    };
    reader.onerror = (error: unknown): void => {
      reject(isError(error) ? error : Error(ERR_SOMETHING_WRONG));
    };
  });
};

export const getOrCreateElementWithId = (
  id: string,
  tag: keyof HTMLElementTagNameMap = 'div',
): HTMLElement => {
  let el = document.getElementById(id);
  if (!el) {
    el = document.createElement(tag);
    el.id = id;
    document.body.append(el);
  }
  return el;
};
