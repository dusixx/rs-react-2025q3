const LS_KEY_LAST_QUERY = 'last-query-djh501';

export const getPersistedQuery = (): string => {
  return localStorage.getItem(LS_KEY_LAST_QUERY) ?? '';
};

export const setPersistedQuery = (query: string): void => {
  localStorage.setItem(LS_KEY_LAST_QUERY, query);
};
