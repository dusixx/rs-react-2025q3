export const AGE_LIMIT = 18;
export const GOOD_PASSWORD_LEN = 8;
export const MIN_PASSWORD_LEN = 3;
export const MAX_FILE_SIZE_MB = 2;
export const MAX_FILE_SIZE_BYTES = 1024 ** 2 * MAX_FILE_SIZE_MB;
export const VALID_FILE_TYPES = ['.png', '.jpg', '.jpeg'];

const SPECIAL_CHARS = '!@#$%^&*';

export const RegexPattern = {
  Name: /^[A-Z][a-z]+/,
  Email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  SpecialChar: RegExp(`[${SPECIAL_CHARS}]`),
  LcaseLatin: /[a-z]/,
  UcaseLatin: /[A-Z]/,
  Number: /[0-9]/,
} as const;

export const ValidationMessage = {
  Name: 'Must contain at least 2 latin letters, first capital',
  Age: `Must be at least ${AGE_LIMIT.toString()} years old`,
  Email: 'Invalid email',
  Gender: 'Invalid gender',
  Country: 'Select a country from the list',
  AvatarSize: `Maximum allowed size: ${MAX_FILE_SIZE_MB.toString()}MB`,
  AvatarRequired: 'Select an image file',
  PasswordLen: `Must be at least ${MIN_PASSWORD_LEN.toString()} chars long`,
  PasswordHint: `Too weak (allowed: ${SPECIAL_CHARS},  latin letters, numbers)`,
  PasswordNotMatch: 'Passwords do not match',
} as const;
