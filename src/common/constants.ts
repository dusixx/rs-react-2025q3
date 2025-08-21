import { HiOutlineInformationCircle } from 'react-icons/hi2';
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
  IoIosFemale,
  IoIosMale,
  IoMdCheckmark,
  IoMdCloseCircle,
  IoMdCloseCircleOutline,
} from 'react-icons/io';
import { IoClose, IoLocationSharp, IoMaleFemaleOutline } from 'react-icons/io5';
import { LiaDownloadSolid } from 'react-icons/lia';
import { LuMoonStar } from 'react-icons/lu';
import {
  MdDeselect,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
  MdOutlineLightMode,
} from 'react-icons/md';
import { RiSearchLine } from 'react-icons/ri';
import { WiDaySunny } from 'react-icons/wi';

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
export const IconLightTheme = WiDaySunny;
export const IconLightTheme2 = MdOutlineLightMode;
export const IconDarkTheme = LuMoonStar;
export const IconCheckMark = IoMdCheckmark;
export const IconInfo = HiOutlineInformationCircle;

export const ERR_SOMETHING_WRONG = 'Something went wrong';
export const LOADER_VISIBILITY_DURATION = 350;
export const INITIAL_QUERY = '';
export const INITIAL_PAGE = 1;
export const UNKNOWN = 'unknown';
export const DARK_THEME_CLASS = 'dark-theme';

export const LinkProps = {
  target: '_blank',
  rel: 'noopener noreferrer nofollow',
} as const;

export const LocalStorageKey = {
  LastQuery: 'last-query-djh501',
  Theme: 'theme-djh501',
} as const;

export const RoutePath = {
  Home: '/',
  Search: '/search',
  About: '/about',
  Any: '*',
} as const;
