/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { getRandomFormData } from '@/components/Form/utils.ts';
import { LabelName, type User } from '@/redux/user.ts';
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

export const fieldErrorsMock = Object.values(LabelName).reduce<Record<string, string[]>>(
  (res, key) => {
    res[key] = [`${key}: ${FAKE_FIELD_ERROR}`];
    return res;
  },
  {},
);
