/* eslint-disable @typescript-eslint/consistent-type-assertions */
import type { KeyboardEventKey } from '@common/constants.ts';
import { ERR_SOMETHING_WRONG } from '@common/constants.ts';
import type { ChangeEvent } from 'react';
import { isError, isInteger, isPositiveInteger, isString } from './type-guards.ts';

export * from './type-guards.ts';

export const rndInt = (min: number, max: number): number => {
  return Math.round(min + Math.random() * (max - min));
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

export const isNumeric = (v: unknown): boolean => {
  const num = parseFloat(String(v));
  return !isNaN(num) && isFinite(num);
};

export const isNumericInteger = (v: unknown): boolean => {
  return isNumeric(v) && isInteger(Number(v));
};

export const isNumericPositiveInteger = (v: unknown): boolean => {
  return isNumeric(v) && isPositiveInteger(Number(v));
};

export const capitalize = (str: string, locale: string = navigator.language): string => {
  return str.replace(/^\p{CWU}/u, char => char.toLocaleUpperCase(locale));
};

export const isKeyPressed = (key: keyof typeof KeyboardEventKey, event: Event): boolean => {
  if (!(event instanceof KeyboardEvent)) {
    return false;
  }
  const { key: k, ctrlKey: ctrl, altKey: alt, shiftKey: shift } = event;
  return k === key && !ctrl && !alt && !shift;
};

export const getFormData = (
  obj: HTMLFormElement | ChangeEvent<HTMLFormElement>,
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

export const omit = <T extends object, K extends keyof T>(obj: T, ...keys: K[]): Omit<T, K> => {
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => !keys.includes(key as K)),
  ) as Omit<T, K>;
};

export const FOCUSABLE_SELECTOR = [
  'a[href]',
  'area[href]',
  'details',
  'iframe',
  ':is(button, input:not([type="hidden"])',
  'select',
  'textarea',
].join(',');

export const isFocusable = (obj: unknown): obj is HTMLElement => {
  if (!(obj instanceof HTMLElement)) {
    return false;
  }
  const computedStyle = getComputedStyle(obj);
  if (
    computedStyle.getPropertyValue('visibility') === 'hidden' ||
    computedStyle.getPropertyValue('display') === 'none'
  ) {
    return false;
  }
  return (
    obj.matches(FOCUSABLE_SELECTOR) ||
    parseInt(obj.getAttribute('tabindex') ?? '') >= 0 ||
    obj.isContentEditable
  );
};
