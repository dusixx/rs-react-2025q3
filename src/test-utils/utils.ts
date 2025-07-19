/* eslint-disable @typescript-eslint/consistent-type-assertions */
/* eslint-disable @typescript-eslint/no-unnecessary-type-parameters */
import { fireEvent, screen, within } from '@testing-library/react';
import { TestId } from './constants.ts';

export type TestIdName = keyof typeof TestId;
export type TestIdValue = (typeof TestId)[TestIdName];

export const changeInput = (input: HTMLElement, value: string): boolean => {
  return fireEvent.change(input, { target: { value } });
};

export const clickElement = (el: HTMLElement): boolean => {
  return fireEvent.click(el);
};

export const getNestedChild = <T extends HTMLElement = HTMLElement>(
  root: TestIdName | HTMLElement,
  ...children: TestIdName[]
): T => {
  const initial = root instanceof HTMLElement ? (root as T) : screen.getByTestId<T>(TestId[root]);
  return children.reduce<T>((element, child) => {
    return within(element).getByTestId<T>(TestId[child]);
  }, initial);
};

export const queryNestedChild = (
  ...args: Parameters<typeof getNestedChild>
): ReturnType<typeof getNestedChild> | null => {
  try {
    return getNestedChild(...args);
  } catch {
    return null;
  }
};

export const getElementsByKeys = <T extends HTMLElement[]>(...ids: TestIdName[]): T => {
  return ids.map(id => screen.getByTestId(TestId[id])) as T;
};
