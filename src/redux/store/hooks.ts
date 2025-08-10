import { useDispatch, useSelector } from 'react-redux';
import type { CharacterInfo } from 'src/redux/api/api.types.ts';
import type { StoreDispatch, StoreState } from './store.ts';

export const useAppSelector = useSelector.withTypes<StoreState>();
export const useAppDispatch = useDispatch.withTypes<StoreDispatch>();

export const useSelectedInfos = (): CharacterInfo[] => {
  return useSelector<StoreState, CharacterInfo[]>(state => state.selectedCharacters.infos);
};
