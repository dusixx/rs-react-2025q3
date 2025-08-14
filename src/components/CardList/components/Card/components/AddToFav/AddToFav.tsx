import { Checkbox } from '@components/Checkbox/Checkbox.tsx';
import type { ComponentPropsWithRef, JSX } from 'react';
import type { CharacterInfo } from 'src/redux/api/api.types.ts';
import { addInfo, removeInfo } from 'src/redux/store/charactersSlice.ts';
import { useAppDispatch, useSelectedInfos } from 'src/redux/store/hooks.ts';

type AddToFavProps = Omit<ComponentPropsWithRef<'button'>, 'onChange'> & {
  info: CharacterInfo;
} & {
  [key: `data-${string}`]: unknown;
};

export const AddToFav = ({ info, ...rest }: AddToFavProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const selectedInfos = useSelectedInfos();

  const isSelected = ({ id }: CharacterInfo): boolean => {
    return Boolean(selectedInfos?.[id]);
  };
  const handleChange = (value: boolean): void => {
    dispatch(value ? addInfo(info) : removeInfo(info));
  };
  return <Checkbox onChange={handleChange} checked={isSelected(info)} {...rest} />;
};
