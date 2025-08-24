import { isNumericPositiveInteger } from '@/common/utils/index.ts';
import countryList from '@/data/country-list.ts';
import { store } from '@/redux/store.ts';
import type { UserWithConfirm } from '@/redux/user.ts';
import { Gender, LabelName } from '@/redux/user.ts';
import type { ZodTypeAny } from 'zod';
import z from 'zod';
import { getPasswordStrength } from '../utils.ts';
import {
  AGE_MAX,
  AGE_MIN,
  FILE_MAX_SIZE_BYTES,
  PASSWORD_MAX_LEN,
  PASSWORD_MIN_LEN,
  RegexPattern,
  ValidationMessage,
} from './validation.constants.ts';

type UserShape = Record<keyof UserWithConfirm, ZodTypeAny>;

const transformAvatar = (v: unknown): File | null => {
  return v instanceof FileList ? v.item(0) : v instanceof File ? v : null;
};

const refineAge = (v: unknown): boolean => {
  return isNumericPositiveInteger(v) && Number(v) >= AGE_MIN && Number(v) <= AGE_MAX;
};

export const userSchema = z
  .object<UserShape>({
    name: z.string().regex(RegexPattern.Name, {
      message: ValidationMessage.Name,
    }),
    age: z.unknown().refine(refineAge, {
      message: ValidationMessage.Age,
    }),
    email: z
      .string()
      .email(ValidationMessage.Email)
      .refine(email => !store.getState().users.items[email], {
        message: ValidationMessage.EmailExists,
      }),
    gender: z.enum([Gender.Female, Gender.Male], {
      message: ValidationMessage.Gender,
    }),
    password: z
      .string()
      .min(PASSWORD_MIN_LEN, {
        message: ValidationMessage.PasswordMin,
      })
      .max(PASSWORD_MAX_LEN, {
        message: ValidationMessage.PasswordMax,
      })
      .refine(p => getPasswordStrength(p) !== 'weak', {
        message: ValidationMessage.PasswordWeak,
      }),
    country: z.enum(countryList, {
      message: ValidationMessage.Country,
    }),
    avatar: z
      .unknown()
      .optional()
      .transform(transformAvatar)
      .refine(v => v && v.name.length !== 0, {
        message: ValidationMessage.AvatarRequired,
      })
      .refine(f => f && f.size <= FILE_MAX_SIZE_BYTES, {
        message: ValidationMessage.AvatarSize,
      }),
    agreement: z.unknown().refine(v => v, {
      message: ValidationMessage.Agreement,
    }),
    confirm: z.string(),
  })
  .refine(data => data.password === data.confirm, {
    message: ValidationMessage.PasswordNotMatch,
    path: [LabelName.Confirm],
  });
