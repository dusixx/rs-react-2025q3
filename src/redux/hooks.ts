import { useDispatch, useSelector } from 'react-redux';
import type { StoreDispatch, StoreState } from './store.ts';

export const useAppSelector = useSelector.withTypes<StoreState>();
export const useAppDispatch = useDispatch.withTypes<StoreDispatch>();

export const useUserList = (): Record<string, unknown> =>
  useAppSelector(state => state.users.items);
