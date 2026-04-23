/* eslint-disable @typescript-eslint/consistent-type-assertions */
import type { UserWithConfirm } from '@/common/types/user.ts';
import { InputLabel, type User } from '@/common/types/user.ts';
import { getRandomFormData } from '@/components/Form/utils.ts';
import { FAKE_VALUE } from '../constants.ts';

export const FAKE_FIELD_ERROR = `field-error-${FAKE_VALUE}`;
export const USERS_COUNT = 5;

export const usersArray = Array.from<User>({ length: USERS_COUNT }).map(
  _ => getRandomFormData() as User,
);

export const usersMock = usersArray.reduce<Record<string, User>>((res, user) => {
  res[user.email] = user;
  return res;
}, {});

export const userFormDataMock = {
  ...usersArray[0],
  avatar: new File(['foo'], 'foo.png', {
    type: 'image/png',
  }),
};

type R = Expand<Record<keyof UserWithConfirm, string[]>>;

export const fieldErrorsMock = Object.values(InputLabel).reduce<R>((res, key) => {
  res[key as keyof UserWithConfirm] = [`${key}: ${FAKE_FIELD_ERROR}`];
  return res;
}, {} as R);
