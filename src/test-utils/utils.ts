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

export const getNestedChildByKey = <T extends HTMLElement = HTMLElement>(
  rootIdName: TestIdName,
  ...nestedIdNames: TestIdName[]
): T => {
  return nestedIdNames.reduce<T>((element, id) => {
    return within(element).getByTestId<T>(TestId[id]);
  }, screen.getByTestId<T>(TestId[rootIdName]));
};

export const queryNestedChildByKey = (
  ...args: Parameters<typeof getNestedChildByKey>
): ReturnType<typeof getNestedChildByKey> | null => {
  try {
    return getNestedChildByKey(...args);
  } catch {
    return null;
  }
};

export const getElementsByKeys = <T extends HTMLElement[]>(...ids: TestIdName[]): T => {
  return ids.map(id => screen.getByTestId(TestId[id])) as T;
};
