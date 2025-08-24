/* eslint-disable max-len */
export const AGE_MIN = 18;
export const AGE_MAX = 80;

export const PASSWORD_MIN_LEN = 4;
export const PASSWORD_GOOD_LEN = 6;
export const PASSWORD_MAX_LEN = 12;

export const NAME_MIN_LEN = 2;
export const NAME_MAX_LEN = 15;

export const FILE_MAX_SIZE_MB = 2;
export const FILE_MAX_SIZE_BYTES = 1024 ** 2 * FILE_MAX_SIZE_MB;
export const FILE_VALID_TYPES = ['.png', '.jpg', '.jpeg'];

export const SPECIAL_CHARS = '!@#$%^&*';
const NAME = `^[A-Z][a-z]{1,${(NAME_MAX_LEN - 1).toString()}}$`;

export const RegexPattern = {
  Name: RegExp(NAME),
  Email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  SpecialChar: RegExp(`[${SPECIAL_CHARS}]`),
  LcaseLatin: /[a-z]/,
  UcaseLatin: /[A-Z]/,
  Number: /[0-9]/,
} as const;

export const ValidationMessage = {
  Name: `Must contain only latin letters, length from ${NAME_MIN_LEN.toString()} to ${NAME_MAX_LEN.toString()}, first capital`,
  Age: `must be a number between ${AGE_MIN.toString()} and ${AGE_MAX.toString()}`,
  Email: 'Invalid email (e.g. login@domain.com)',
  Gender: 'Invalid gender',
  Country: 'Select a country from the list',
  AvatarSize: `Maximum allowed size: ${FILE_MAX_SIZE_MB.toString()}MB`,
  AvatarRequired: 'Select an image file',
  PasswordMin: `Must be at least ${PASSWORD_MIN_LEN.toString()} chars long`,
  PasswordMax: `Must be no longer than ${PASSWORD_MAX_LEN.toString()}`,
  PasswordWeak: `Too weak (allowed: ${SPECIAL_CHARS},  latin letters, numbers)`,
  PasswordNotMatch: 'Passwords do not match',
  Agreement: 'Must be accepted',
  EmailExists: 'User with this email already exists',
} as const;
