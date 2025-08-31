/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { capitalize } from '@/common/utils/index.ts';
import type { AnnualData, SummaryData } from '@/services/types.ts';

type SortByCountryName = 'byCountryNameAsc' | 'byCountryNameDesc';

type SortByPopulation = 'byPopulationAsc' | 'byPopulationDesc';

export type SortByNameAndPopulation = SortByCountryName | SortByPopulation;

export const SortSelectLabelValuePairs: Record<string, SortByNameAndPopulation> = {
  'Country: A to Z': 'byCountryNameAsc',
  'Country: Z to A': 'byCountryNameDesc',
  'Population: Low to High': 'byPopulationAsc',
  'Population: Hight to Low': 'byPopulationDesc',
};

export const NA = 'N/A';
const DEFAULT_SORT_BY = 'byCountryNameAsc';

const getPopulation = (
  summaryData: SummaryData,
  countryName: string,
  targetYear?: number,
): number => {
  const countryData = summaryData[countryName]?.data;
  const annualData = countryData?.find(({ year }) => year === targetYear);
  return annualData?.population ?? 0;
};

const sortByName = (summaryData: SummaryData, sortBy: SortByCountryName): SummaryData => {
  return Object.keys(summaryData)
    .sort((a, b) => (sortBy === 'byCountryNameAsc' ? a.localeCompare(b) : b.localeCompare(a)))
    .reduce<SummaryData>((obj, key) => {
      obj[key] = summaryData[key];
      return obj;
    }, {});
};

const sortByPopulation = (
  summaryData: SummaryData,
  sortBy: SortByPopulation,
  targetYear?: number,
): SummaryData => {
  return Object.keys(summaryData)
    .sort((a, b) => {
      const populA = getPopulation(summaryData, a, targetYear);
      const populB = getPopulation(summaryData, b, targetYear);
      return sortBy === 'byPopulationAsc' ? populA - populB : populB - populA;
    })
    .reduce<SummaryData>((obj, key) => {
      obj[key] = summaryData[key];
      return obj;
    }, {});
};

export const sortSummaryData = ({
  summaryData,
  sortBy,
  targetYear,
}: {
  summaryData: SummaryData;
  sortBy: SortByNameAndPopulation;
  targetYear?: number;
}): SummaryData => {
  switch (sortBy) {
    case 'byCountryNameAsc':
    case 'byCountryNameDesc':
      return sortByName(summaryData, sortBy);

    case 'byPopulationDesc':
    case 'byPopulationAsc':
      return sortByPopulation(summaryData, sortBy, targetYear);

    default:
      return sortByName(summaryData, DEFAULT_SORT_BY);
  }
};

const getAnnualData = (countryDataForAllYears: AnnualData[], targetYear?: number): AnnualData => {
  const existingAnnualData = targetYear
    ? countryDataForAllYears.find(({ year }) => year === targetYear)
    : countryDataForAllYears[countryDataForAllYears.length - 1];

  return existingAnnualData ?? ({ year: targetYear ?? NA } as AnnualData);
};

export const filterSummaryData = ({
  summaryData,
  countryName = '',
  targetYear,
}: {
  summaryData: SummaryData;
  countryName?: string;
  targetYear?: number;
}): SummaryData => {
  return Object.keys(summaryData).reduce<SummaryData>((obj, country) => {
    if (country.toLowerCase().includes(countryName.toLowerCase())) {
      obj[country] = summaryData[country];
    }
    if (obj[country]) {
      const { iso_code, data: dataForAllYears } = obj[country];
      const annualData = getAnnualData(dataForAllYears, targetYear);
      obj[country] = { iso_code, data: [annualData] };
    }
    return obj;
  }, {});
};

export const formatColumnName = (colname: string): string => {
  const words = colname.split(/[_-\s]+/).map(word => {
    const result = capitalize(word);
    return /iso|co2/i.test(result) ? result.toUpperCase() : result;
  });
  return words.join(' ');
};
