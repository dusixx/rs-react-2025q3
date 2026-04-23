/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { capitalize } from '@/common/utils/index.ts';
import { hasOwnKeys } from '@/common/utils/type-guards.ts';

export const isUser = (obj: unknown): obj is User => {
  return hasOwnKeys<User>(obj, ...UserPropKey);
};

export const Gender = {
  Male: 'male',
  Female: 'female',
} as const;

export const UserPropKey = [
  'name',
  'age',
  'avatar',
  'country',
  'email',
  'gender',
  'password',
] as const;

const FormLabels = [...UserPropKey, 'agreement', 'confirm'] as const;

type UserKeyName = (typeof UserPropKey)[number];

type Gender = (typeof Gender)[keyof typeof Gender];

export type User = Record<Exclude<UserKeyName, 'age' | 'gender'>, string> & {
  age: number;
  gender: Gender;
};

export type UserWithConfirm = User & {
  agreement: boolean;
  confirm: string;
};

type CapitalizedKey = Capitalize<keyof UserWithConfirm>;

export const InputLabel = FormLabels.reduce<Record<CapitalizedKey, string>>(
  (res, key) => {
    res[capitalize(key) as CapitalizedKey] = key;
    return res;
  },
  {} as Record<CapitalizedKey, string>,
);
