/* eslint-disable @typescript-eslint/consistent-type-assertions */
import type { getFormData } from '@/common/utils/index.ts';
import { deleteProperties } from '@/common/utils/index.ts';
import type { User, UserWithConfirm } from '@/redux/user.ts';
import { getRandomFormData, setInputValueByName } from '../utils.ts';
import { userSchema } from '../validation/user-schema.ts';

export type UserFieldErrors = Partial<Record<keyof UserWithConfirm, string[]>>;

export type UserFormData = Omit<User, 'avatar'> & {
  avatar: File;
};
type ValidateResult =
  | { success: true; data: UserFormData }
  | { success: false; fieldErrors: UserFieldErrors };

export const validateUserFormData = (formData: ReturnType<typeof getFormData>): ValidateResult => {
  const { data, error, success } = userSchema.safeParse(formData);
  if (success) {
    return {
      success,
      data: deleteProperties(data, 'agreement', 'confirm') as UserFormData,
    };
  }
  return {
    success,
    fieldErrors: error.formErrors.fieldErrors,
  };
};

export const generateUncontrolledFormData = (form: HTMLFormElement | null): void => {
  if (form) {
    Object.entries(getRandomFormData()).forEach(([key, value]) => {
      setInputValueByName(form, key, value);
    });
  }
};
