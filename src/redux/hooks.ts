import { useDispatch, useSelector } from 'react-redux';
import type { CharacterInfo } from 'src/redux/api.types.ts';
import type { StoreDispatch, StoreState } from './store/store.ts';

export const useAppSelector = useSelector.withTypes<StoreState>();
export const useAppDispatch = useDispatch.withTypes<StoreDispatch>();

export const useSelectedInfos = (): CharacterInfo[] => {
  return useAppSelector(state => state.selectedCharacters.infos);
};
