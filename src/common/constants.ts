import { IoIosFemale, IoIosMale, IoMdCloseCircle, IoMdCloseCircleOutline } from 'react-icons/io';
import { IoClose, IoLocationSharp, IoMaleFemaleOutline } from 'react-icons/io5';
import { RiSearchLine } from 'react-icons/ri';

export const IconClose = IoClose;
export const IconCloseCircle = IoMdCloseCircle;
export const IconCloseCircleOutline = IoMdCloseCircleOutline;
export const IconSearch = RiSearchLine;
export const IconFemale = IoIosFemale;
export const IconMale = IoIosMale;
export const IconMaleFemale = IoMaleFemaleOutline;
export const IconLocation = IoLocationSharp;

export const ERR_SOMETHING_WRONG = 'Something went wrong';
export const LS_KEY_LAST_QUERY = 'last-query-djh501';
export const LOADER_VISIBILITY_DURATION = 500;

export const RoutePath = {
  Home: '/',
  Search: '/search',
  Error: '*',
} as const;

export const SearchParamKey = {
  Detailes: 'details',
  Page: 'page',
  Query: 'q',
} as const;
