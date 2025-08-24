/* eslint-disable @typescript-eslint/no-unnecessary-type-parameters */
import { rndInt } from '@/common/utils/index.ts';
import countries from '@/data/country-list.ts';
import { Gender, type UserWithConfirm } from '@/redux/user.ts';
import { FAKE_VALUE } from '@/test-utils/constants.ts';
import type { CSSProperties } from 'react';
import { capitalize as cap } from './../../common/utils/index';
import {
  AGE_MAX,
  AGE_MIN,
  NAME_MAX_LEN,
  NAME_MIN_LEN,
  PASSWORD_GOOD_LEN,
  PASSWORD_MAX_LEN,
  PASSWORD_MIN_LEN,
  RegexPattern,
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
  const result = Array.from({ length: rndInt(minLen, maxLen) })
    .map(_ => alpha[rndInt(0, alpha.length - 1)])
    .join('');

  return capitalize ? cap(result) : result;
};

export const getRandomEmail = (): string => {
  const $ = getRandomName;
  return `${$(4, 8, false)}@${$(2, 6, false)}.${$(2, 3, false)}`;
};

export const getRandomPassword = (minLen: number, maxLen: number = minLen): string => {
  const groups = [alpha, alphaUpper, numbers, specials];

  return Array.from({ length: rndInt(minLen, maxLen) })
    .map((_, idx) => {
      const group = groups[idx % groups.length];
      return group[rndInt(0, group.length - 1)];
    })
    .join('');
};

export const getRandomCountry = (): string => {
  return countries[rndInt(0, countries.length - 1)];
};

export const getFakeFileList = (): FileList => {
  const file = new File([FAKE_VALUE], `${FAKE_VALUE}.png`, { type: 'image/png' });
  const dataTransfer = new DataTransfer();
  dataTransfer.items.add(file);

  return dataTransfer.files;
};

type InputValue = string | number | boolean;

export const setInputValueByName = <T extends object>(
  form: HTMLFormElement,
  inputName: keyof T,
  inputValue: InputValue,
): void => {
  const el = form.elements.namedItem(String(inputName));
  if (!el) {
    return;
  }
  if ('checked' in el) {
    el.checked = inputValue;
  }
  if ('value' in el) {
    el.value = String(inputValue);
  }
};

export const getRandomFormData = (): Partial<Record<keyof UserWithConfirm, InputValue>> => {
  const password = getRandomPassword(PASSWORD_MIN_LEN, PASSWORD_MAX_LEN);
  return {
    age: rndInt(AGE_MIN, AGE_MAX),
    name: getRandomName(NAME_MIN_LEN, NAME_MAX_LEN),
    email: getRandomEmail(),
    password,
    confirm: password,
    country: getRandomCountry(),
    gender: [Gender.Female, Gender.Male][rndInt(0, 1)],
    agreement: true,
  };
};

export type PasswordStrength = 'weak' | 'medium' | 'strong';

export const getPasswordStrength = (password: string): PasswordStrength => {
  const result = [
    password.length >= PASSWORD_GOOD_LEN,
    RegexPattern.UcaseLatin.test(password),
    RegexPattern.LcaseLatin.test(password),
    RegexPattern.SpecialChar.test(password),
    RegexPattern.Number.test(password),
  ].reduce((res, value) => res + Number(value), 0);

  return result <= 2 ? 'weak' : result <= 4 ? 'medium' : 'strong';
};

export const getPasswordStrengthStyle = (strength: PasswordStrength): CSSProperties => {
  return {
    backgroundColor: strength === 'medium' ? 'var(--color-orange)' : '',
  };
};
