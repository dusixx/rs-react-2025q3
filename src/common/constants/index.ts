export * from './icons.ts';

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
  LastQuery: 'last-query-4c5a261b',
  QueryVersion: 'query-version-4c5a261b',
  Theme: 'theme-4c5a261b',
} as const;

export const RoutePath = {
  Home: '/',
  Search: '/search',
  About: '/about',
  Any: '*',
} as const;

export const HttpStatus = {
  NotFound: 404,
  OK: 200,
} as const;
