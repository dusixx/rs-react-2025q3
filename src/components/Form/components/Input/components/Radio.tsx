import type { ReactNode } from 'react';
import type { InputProps } from '../Input.tsx';
import { Checkbox } from './Checkbox.tsx';

export const Radio = (props: Omit<InputProps, 'nameLabel'>): ReactNode => {
  return <Checkbox type='radio' {...props} />;
};
