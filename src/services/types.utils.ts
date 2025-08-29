import { hasOwnKeys, isObject } from '@/common/utils/type-guards.ts';
import type { AnnualData, CountryData, SummaryData } from './types.ts';

export const isSummaryData = (obj: unknown): obj is SummaryData => {
  if (!isObject(obj)) {
    return false;
  }
  const firstValue = Object.values(obj)[0];

  return (
    hasOwnKeys<CountryData>(firstValue, 'iso_code', 'data') &&
    Array.isArray(firstValue.data) &&
    hasOwnKeys<AnnualData>(firstValue.data[0], 'year')
  );
};

export class InvalidDataError extends Error {
  constructor(msg?: string) {
    super(msg ? msg : 'Invalid data');
  }
}
