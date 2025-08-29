import { ColumnPicker } from '@/components/Table/components/ColumnPicker/ColumnPicker.tsx';
import { MemoizedTable } from '@/components/Table/Table.tsx';
import { getSummaryData } from '@/services/index.ts';
import type { SummaryData } from '@/services/types.ts';
import { useEffect, useState, type ReactNode } from 'react';

export const CONTROLLED_TEXT = 'Controlled form';
export const UNCONTROLLED_TEXT = 'Uncontrolled form';

export default function MainPage(): ReactNode {
  const [data, setData] = useState<SummaryData>();

  useEffect(() => {
    getSummaryData().then(setData).catch(console.error);
  }, []);

  return (
    <>
      <ColumnPicker />
      {data && <MemoizedTable data={data} />}
    </>
  );
}
