/* eslint-disable @typescript-eslint/no-unnecessary-type-parameters */
import { rndInt } from '@/common/utils/index.ts';
import countries from '@/data/country-list.ts';
import type { UserWithConfirm } from '@/redux/user.ts';
import { capitalize as cap } from './../../common/utils/index';
import {
  AGE_MAX,
  AGE_MIN,
  NAME_MAX_LEN,
  NAME_MIN_LEN,
  PASSWORD_MAX_LEN,
  PASSWORD_MIN_LEN,
  SPECIAL_CHARS,
} from './validation/validation.constants.ts';

const alphaStr = 'abcdefghijklmnopqrstuvwxyz';
const alpha = [...alphaStr];
const alphaUpper = [...alphaStr.toUpperCase()];
const numbers = [...'0123456789'];
const specials = [...SPECIAL_CHARS];

export const getRandomName = (
  minLen: number,
  maxLen: number = minLen,
  capitalize: boolean = true,
): string => {
  const result = [];
  const len = rndInt(minLen, maxLen);

  for (let i = 0; i < len; i += 1) {
    result.push(alpha[rndInt(0, alpha.length - 1)]);
  }
  return capitalize ? cap(result.join('')) : result.join('');
};

export const getRandomEmail = (): string => {
  const $ = getRandomName;
  return `${$(4, 8, false)}@${$(2, 6, false)}.${$(2, 3, false)}`;
};

export const getRandomPassword = (minLen: number, maxLen: number = minLen): string => {
  const result = [];
  const groups = [alpha, alphaUpper, numbers, specials];
  const len = rndInt(minLen, maxLen);

  for (let i = 0; i < len; i += 1) {
    const group = groups[i % groups.length];
    result.push(group[rndInt(0, group.length - 1)]);
  }
  return result.join('');
};

export const getRandomCountry = (): string => {
  return countries[rndInt(0, countries.length - 1)];
};

export const setInputValueByName = <T extends object>(
  form: HTMLFormElement,
  inputName: keyof T,
  inputValue: string | number | boolean,
): void => {
  const input = form.elements.namedItem(String(inputName));
  if (input instanceof HTMLInputElement) {
    input.value = String(inputValue);
  }
};

export const generateFormDataRandomly = (form: HTMLFormElement | null): void => {
  if (form) {
    const password = getRandomPassword(PASSWORD_MIN_LEN, PASSWORD_MAX_LEN);
    setInputValueByName<UserWithConfirm>(form, 'name', getRandomName(NAME_MIN_LEN, NAME_MAX_LEN));
    setInputValueByName<UserWithConfirm>(form, 'age', rndInt(AGE_MIN, AGE_MAX));
    setInputValueByName<UserWithConfirm>(form, 'email', getRandomEmail());
    setInputValueByName<UserWithConfirm>(form, 'password', password);
    setInputValueByName<UserWithConfirm>(form, 'confirm', password);
    setInputValueByName<UserWithConfirm>(form, 'country', getRandomCountry());
  }
};
