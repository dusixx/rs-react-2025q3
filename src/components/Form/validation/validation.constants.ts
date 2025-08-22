export const AGE_LIMIT = 18;
export const GOOD_PASSWORD_LEN = 8;
export const MAX_FILE_SIZE_MB = 2;
export const MAX_FILE_SIZE_BYTES = 1024 ** 2 * MAX_FILE_SIZE_MB;
export const VALID_FILE_TYPES = ['.png', '.jpg', '.jpeg'];

export const RegexPattern = {
  Name: /^[A-Z][a-z]+/,
  Email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  SpecialChar: /[!@#$%^&*]/,
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
  PasswordSpecial: 'Must contain at least 1 special character',
  PasswordLcaseLatin: 'Must contain at least 1 lowercase latin letter',
  PasswordUcaseLatin: 'Must contain at least 1 uppercase latin letter',
  PasswordNumber: 'Must contain at least 1 number',
  PasswordConfirm: 'Passwords do not match',
  AvatarSize: `The file size must not exceed ${MAX_FILE_SIZE_MB.toString()}MB`,
  AvatarRequired: 'Select an image file',
} as const;
