import { hasOwnKeys } from '@/common/utils/type-guards.ts';

export const Gender = {
  Male: 'male',
  Female: 'female',
} as const;

export type User = {
  name: string;
  age: number;
  email: string;
  password: string;
  gender: (typeof Gender)[keyof typeof Gender];
  country: string;
  avatar: string;
};

export type UserWithConfirm = User & {
  agreement: boolean;
  confirm: string;
};

export const LabelName: Record<Capitalize<keyof UserWithConfirm>, string> = {
  Name: 'name',
  Age: 'age',
  Email: 'email',
  Password: 'password',
  Gender: 'gender',
  Country: 'country',
  Avatar: 'avatar',
  Agreement: 'agreement',
  Confirm: 'confirm',
} as const;

export const isUser = (obj: unknown): obj is User => {
  return hasOwnKeys<User>(obj, 'name', 'age', 'avatar', 'country', 'email', 'gender', 'password');
};
