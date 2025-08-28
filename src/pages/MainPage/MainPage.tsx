import { fetchData } from '@/services/index.ts';
import { type ReactNode } from 'react';

export const CONTROLLED_TEXT = 'Controlled form';
export const UNCONTROLLED_TEXT = 'Uncontrolled form';

export default function MainPage(): ReactNode {
  void fetchData();
  return <></>;
}
