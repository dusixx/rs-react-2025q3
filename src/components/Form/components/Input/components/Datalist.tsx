import type { ReactNode } from 'react';
import type { InputProps } from '../Input.tsx';
import { Input } from '../Input.tsx';

type DatalistProps = InputProps & {
  options: readonly string[] | string[];
};

export const Datalist = ({
  list = `list_${crypto.randomUUID().replace(/-/g, '').slice(-8)}`,
  options,
  ...rest
}: DatalistProps): ReactNode => {
  return (
    <Input list={list} {...rest}>
      <datalist id={list}>
        {options.map(item => {
          return <option key={item} value={item} />;
        })}
      </datalist>
    </Input>
  );
};
