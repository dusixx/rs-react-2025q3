import { IoIosFemale, IoIosMale, IoMdCloseCircleOutline } from 'react-icons/io';
import { IoSettingsOutline } from 'react-icons/io5';
import { MdOutlineSettingsEthernet } from 'react-icons/md';
import { SlOptions } from 'react-icons/sl';
import { IoOptionsOutline } from 'react-icons/io5';

export const IconCloseCircleOutline = IoMdCloseCircleOutline;
export const IconFemale = IoIosFemale;
export const IconMale = IoIosMale;
export const IconSettings = MdOutlineSettingsEthernet;
export const IconSettings2 = IoSettingsOutline;
export const IconMenu = SlOptions;
export const IconOptions = IoOptionsOutline;

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
