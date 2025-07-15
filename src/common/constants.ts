import { IoIosFemale, IoIosMale, IoMdCloseCircle, IoMdCloseCircleOutline } from 'react-icons/io';
import { IoClose, IoLocationSharp, IoMaleFemaleOutline } from 'react-icons/io5';
import { RiSearchLine } from 'react-icons/ri';
import type { ToastContainerProps } from 'react-toastify';

export const IconClose = IoClose;
export const IconCloseCircle = IoMdCloseCircle;
export const IconCloseCircleOutline = IoMdCloseCircleOutline;
export const IconSearch = RiSearchLine;
export const IconFemale = IoIosFemale;
export const IconMale = IoIosMale;
export const IconMaleFemale = IoMaleFemaleOutline;
export const IconLocation = IoLocationSharp;

export enum RoutePath {
  Home = '/',
  Error = '*',
}

export const TOASTS_PROPS: ToastContainerProps = {
  autoClose: 1000,
  position: 'top-center',
  hideProgressBar: true,
};

export const ERR_SOMETHING_WRONG = 'Something went wrong';
