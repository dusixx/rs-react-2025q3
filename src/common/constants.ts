import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
  IoIosFemale,
  IoIosMale,
  IoMdCloseCircle,
  IoMdCloseCircleOutline,
} from 'react-icons/io';
import { IoClose, IoLocationSharp, IoMaleFemaleOutline } from 'react-icons/io5';
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from 'react-icons/md';
import { RiSearchLine } from 'react-icons/ri';
import { LiaDownloadSolid } from 'react-icons/lia';
import { MdDeselect } from 'react-icons/md';

export const IconClose = IoClose;
export const IconCloseCircle = IoMdCloseCircle;
export const IconCloseCircleOutline = IoMdCloseCircleOutline;
export const IconSearch = RiSearchLine;
export const IconFemale = IoIosFemale;
export const IconMale = IoIosMale;
export const IconMaleFemale = IoMaleFemaleOutline;
export const IconLocation = IoLocationSharp;
export const IconArrowLeft = IoIosArrowDropleftCircle;
export const IconArrowRight = IoIosArrowDroprightCircle;
export const IconArrowLeftDouble = MdKeyboardDoubleArrowLeft;
export const IconArrowRightDouble = MdKeyboardDoubleArrowRight;
export const IconDownload = LiaDownloadSolid;
export const IconDeselect = MdDeselect;

export const ERR_SOMETHING_WRONG = 'Something went wrong';
export const LS_KEY_LAST_QUERY = 'last-query-djh501';
export const LOADER_VISIBILITY_DURATION = 500;
export const INITIAL_QUERY = '';
export const INITIAL_PAGE = 1;
export const UNKNOWN = 'unknown';

export const LINK_REL_PROPS = {
  target: '_blank',
  rel: 'noopener noreferrer nofollow',
};
export const RoutePath = {
  Home: '/',
  Search: '/search',
  About: '/about',
  All: '*',
} as const;
