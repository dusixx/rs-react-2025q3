import { useDispatch, useSelector } from 'react-redux';
import type { StoreDispatch, StoreState } from './store.ts';
import type { User } from './user.ts';

export const useAppSelector = useSelector.withTypes<StoreState>();
export const useAppDispatch = useDispatch.withTypes<StoreDispatch>();

export const useUsers = (): Record<string, User> => useAppSelector(state => state.users.items);
export const useCountries = (): string[] => useAppSelector(state => state.countries.items);
