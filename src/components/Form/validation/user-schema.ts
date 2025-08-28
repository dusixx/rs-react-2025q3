import type { UserWithConfirm } from '@/common/types/user.ts';
import { Gender, InputLabel } from '@/common/types/user.ts';
import { isNumericPositiveInteger } from '@/common/utils/index.ts';
import countryList from '@/data/country-list.ts';
import { store } from '@/redux/store.ts';
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
const refinePassword = {
  length: (p: string): boolean => p.length >= PASSWORD_MIN_LEN && p.length <= PASSWORD_MAX_LEN,
  validity: (p: string): boolean => p.replace(RegexPattern.PasswordAllowed, '').length === 0,
  strength: (p: string): boolean => getPasswordStrength(p) !== 'weak',
};

export const userSchema = z
  .object<UserShape>({
    name: z.string().regex(RegexPattern.Name, ValidationMessage.Name),
    age: z.unknown().refine(refineAge, ValidationMessage.Age),
    email: z
      .string()
      .email(ValidationMessage.Email)
      .refine(email => !store.getState().users.items[email], ValidationMessage.EmailExists),
    gender: z.enum([Gender.Female, Gender.Male], {
      message: ValidationMessage.Gender,
    }),
    password: z
      .string()
      .refine(refinePassword.length, ValidationMessage.PasswordLength)
      .refine(refinePassword.validity, ValidationMessage.PasswordInvalid)
      .refine(refinePassword.strength, ValidationMessage.PasswordWeak),
    country: z.enum(countryList, {
      message: ValidationMessage.Country,
    }),
    avatar: z
      .unknown()
      .optional()
      .transform(transformAvatar)
      .refine(v => v && v.name.length !== 0, ValidationMessage.AvatarRequired)
      .refine(f => f && f.size <= FILE_MAX_SIZE_BYTES, ValidationMessage.AvatarSize),
    agreement: z.unknown().refine(v => v, ValidationMessage.Agreement),
    confirm: z.string(),
  })
  .refine(data => data.password === data.confirm, {
    message: ValidationMessage.PasswordNotMatch,
    path: [InputLabel.Confirm],
  });
