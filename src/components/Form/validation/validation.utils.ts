/* eslint-disable @typescript-eslint/consistent-type-assertions */
import type { getFormData } from '@/common/utils/index.ts';
import type { User, UserWithConfirm } from '@/redux/user.ts';
import { userSchema } from './user-schema.ts';
import { PASSWORD_GOOD_LEN, RegexPattern } from './validation.constants.ts';

export type UserFieldErrors = Partial<Record<keyof UserWithConfirm, string[]>>;

type UserFormData = Omit<User, 'avatar'> & {
  avatar: File;
};
type ValidateUserFormDataResult =
  | { success: true; data: UserFormData }
  | { success: false; fieldErrors: UserFieldErrors };

export const validateUserFormData = (
  formData: ReturnType<typeof getFormData>,
): ValidateUserFormDataResult => {
  const { data, error, success } = userSchema.safeParse(formData);
  if (success) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { agreement: _a, confirm: _b, ...rest } = data;
    return {
      success,
      data: rest as UserFormData,
    };
  }
  return {
    success,
    fieldErrors: error.formErrors.fieldErrors,
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
