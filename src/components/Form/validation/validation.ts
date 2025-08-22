/* eslint-disable @typescript-eslint/consistent-type-assertions */
import type { getFormData } from '@/common/utils/index.ts';
import { isNumericPositiveInteger } from '@/common/utils/index.ts';
import countryList from '@/data/country-list.ts';
import type { User, UserWithAgreement } from '@/redux/user.ts';
import { Gender } from '@/redux/user.ts';
import type { ZodTypeAny } from 'zod';
import z from 'zod';
import {
  AGE_LIMIT,
  GOOD_PASSWORD_LEN,
  MAX_FILE_SIZE_BYTES,
  RegexPattern,
  ValidationMessage,
} from './validation.constants.ts';

type UserShape = Record<keyof UserWithAgreement, ZodTypeAny>;

const userSchema = z
  .object<UserShape>({
    name: z.string().regex(RegexPattern.Name, {
      message: ValidationMessage.Name,
    }),
    age: z.string().refine(a => isNumericPositiveInteger(a) && Number(a) >= AGE_LIMIT, {
      message: ValidationMessage.Age,
    }),
    email: z.string().regex(RegexPattern.Email, {
      message: ValidationMessage.Email,
    }),
    gender: z.enum([Gender.Female, Gender.Male], {
      message: ValidationMessage.Gender,
    }),
    password: z
      .string()
      .regex(RegexPattern.SpecialChar, {
        message: ValidationMessage.PasswordSpecial,
      })
      .regex(RegexPattern.LcaseLatin, {
        message: ValidationMessage.PasswordLcaseLatin,
      })
      .regex(RegexPattern.UcaseLatin, {
        message: ValidationMessage.PasswordUcaseLatin,
      })
      .regex(RegexPattern.Number, {
        message: ValidationMessage.PasswordNumber,
      }),
    country: z.enum(countryList, {
      message: ValidationMessage.Country,
    }),
    avatar: z
      .instanceof(File)
      .refine(
        file => {
          return file.name.length !== 0;
        },
        { message: ValidationMessage.AvatarRequired },
      )
      .refine(
        file => {
          return file.size <= MAX_FILE_SIZE_BYTES;
        },
        { message: ValidationMessage.AvatarSize },
      ),
    agreement: z.string(),
    confirm: z.string(),
  })
  .refine(data => data.password === data.confirm, {
    message: 'Passwords do not match',
    path: ['confirm'],
  });

export type UserFieldErrors = Partial<Record<keyof UserWithAgreement, string[]>>;

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

type PasswordStrength = 'weak' | 'medium' | 'strong';

export const getPasswordStrength = (password: string): PasswordStrength => {
  let result = 0;
  if (password.length >= GOOD_PASSWORD_LEN) {
    result += 1;
  }
  if (RegexPattern.UcaseLatin.test(password)) {
    result += 1;
  }
  if (RegexPattern.LcaseLatin.test(password)) {
    result += 1;
  }
  if (RegexPattern.Number.test(password)) {
    result += 1;
  }
  if (RegexPattern.SpecialChar.test(password)) {
    result += 1;
  }
  return result <= 2 ? 'weak' : result <= 4 ? 'medium' : 'strong';
};
