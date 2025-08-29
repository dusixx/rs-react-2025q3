import type { SummaryData } from './types.ts';
import { InvalidDataError, isSummaryData } from './types.utils.ts';

const DATA_URL = 'https://raw.githubusercontent.com/dusixx/data/refs/heads/main/owid-co2-data.json';

export async function getSummaryData(): Promise<SummaryData> {
  const response = await fetch(DATA_URL, {
    headers: {
      Accept: 'application/json',
    },
  });
  const data: unknown = await response.json();
  console.log(data);
  if (isSummaryData(data)) {
    return data;
  }
  throw new InvalidDataError('SummaryData');
}
