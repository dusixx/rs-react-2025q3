import { IoIosFemale, IoIosMale, IoMdCloseCircleOutline } from 'react-icons/io';

export const IconCloseCircleOutline = IoMdCloseCircleOutline;
export const IconFemale = IoIosFemale;
export const IconMale = IoIosMale;

export const ERR_SOMETHING_WRONG = 'Something went wrong';

export const LinkProps = {
  target: '_blank',
  rel: 'noopener noreferrer nofollow',
} as const;

export const KeyboardEventKey = {
  Escape: 'Escape',
  Enter: 'Enter',
  Tab: 'Tab',
} as const;

export const MouseButton = {
  Left: 0,
  Middle: 1,
  Right: 2,
} as const;
