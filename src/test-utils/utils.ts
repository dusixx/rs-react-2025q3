/* eslint-disable @typescript-eslint/consistent-type-assertions */
/* eslint-disable @typescript-eslint/no-unnecessary-type-parameters */
import { fireEvent, screen, within } from '@testing-library/react';
import { TestId } from './constants.ts';

export type TestIdName = keyof typeof TestId;
export type TestIdValue = (typeof TestId)[TestIdName];

export const changeInput = (input: HTMLElement, value: string): void => {
  if (input instanceof HTMLInputElement) {
    fireEvent.change(input, { target: { value } });
  }
};

export const clickButton = (btn: HTMLElement): void => {
  if (btn instanceof HTMLButtonElement) {
    fireEvent.click(btn);
  }
};

export const getNestedChildById = <T extends HTMLElement = HTMLElement>(
  rootIdName: TestIdName,
  ...nestedIdNames: TestIdName[]
): T => {
  return nestedIdNames.reduce<T>((element, id) => {
    return within(element).getByTestId<T>(TestId[id]);
  }, screen.getByTestId<T>(TestId[rootIdName]));
};

export const queryNestedChildById = (
  ...args: Parameters<typeof getNestedChildById>
): ReturnType<typeof getNestedChildById> | null => {
  try {
    return getNestedChildById(...args);
  } catch {
    return null;
  }
};

export const getElementsByIds = <T extends HTMLElement[]>(...ids: TestIdName[]): T => {
  return ids.map(id => screen.getByTestId(TestId[id])) as T;
};
