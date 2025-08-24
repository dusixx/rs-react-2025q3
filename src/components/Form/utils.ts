/* eslint-disable @typescript-eslint/consistent-type-assertions */
/* eslint-disable @typescript-eslint/no-unnecessary-type-parameters */
import { rndInt } from '@/common/utils/index.ts';
import countries from '@/data/country-list.ts';
import { Gender, type UserWithConfirm } from '@/redux/user.ts';
import type { UseFormSetValue } from 'react-hook-form';
import { capitalize as cap } from './../../common/utils/index';
import type { ControlledFormInputs } from './ControlledForm.tsx';
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

type GetRandomFormDataResult = Partial<Record<keyof UserWithConfirm, InputValue>>;

const genRandomFormData = (): GetRandomFormDataResult => {
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

export const generateUncontrolledFormDataRandomly = (form: HTMLFormElement | null): void => {
  if (form) {
    Object.entries(genRandomFormData()).forEach(([key, value]) => {
      setInputValueByName(form, key, value);
    });
  }
};

export const generateControlledFormDataRandomly = (
  setValue: UseFormSetValue<ControlledFormInputs>,
): void => {
  Object.entries(genRandomFormData()).forEach(([key, value]) => {
    setValue(key as keyof UserWithConfirm, value, { shouldValidate: true });
  });
};
