import type { ReactNode } from 'react';
import { Input } from './Input.tsx';

type DatalistProps = Parameters<typeof Input>[0] & {
  options: readonly string[] | string[];
};

export const Datalist = ({
  list = crypto.randomUUID().replace('-', ''),
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
