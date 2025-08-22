import { isNumericPositiveInteger } from '@/common/utils/index.ts';
import countryList from '@/data/country-list.ts';
import type { UserWithAgreement } from '@/redux/user.ts';
import { Gender } from '@/redux/user.ts';
import type { ZodTypeAny } from 'zod';
import z from 'zod';
import {
  AGE_LIMIT,
  MAX_FILE_SIZE_BYTES,
  MIN_PASSWORD_LEN,
  RegexPattern,
  ValidationMessage,
} from './validation.constants.ts';
import { getPasswordStrength } from './validation.utils.ts';

type UserShape = Record<keyof UserWithAgreement, ZodTypeAny>;

export const userSchema = z
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
      .min(MIN_PASSWORD_LEN, {
        message: ValidationMessage.PasswordLen,
      })
      .refine(p => getPasswordStrength(p) !== 'weak', {
        message: ValidationMessage.PasswordHint,
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
    message: ValidationMessage.PasswordNotMatch,
    path: ['confirm'],
  });
