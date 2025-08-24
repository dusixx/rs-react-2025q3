import { useDispatch, useSelector } from 'react-redux';
import type { StoreDispatch, StoreState } from './store.ts';
import type { User } from './user.ts';

export const useAppSelector = useSelector.withTypes<StoreState>();
export const useAppDispatch = useDispatch.withTypes<StoreDispatch>();

export const useUserList = (): Record<string, User> => useAppSelector(state => state.users.items);
export const useCountryList = (): readonly string[] =>
  useAppSelector(state => state.countries.items);
