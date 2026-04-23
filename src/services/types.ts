export const BasicColumnNames = ['country', 'iso_code'] as const;

export const BasicDataColumnNames = ['year', 'population', 'co2', 'co2_per_capita'] as const;

export const AdditionalDataColumnNames = [
  'methane',
  'methane_per_capita',
  'nitrous_oxide',
  'nitrous_oxide_per_capita',
  'oil_co2',
  'temperature_change_from_co2',
] as const;

type BasicDataRecord = Record<(typeof BasicDataColumnNames)[number], number>;

type BasicAnnualData = Expand<PartialWithRequired<BasicDataRecord, 'year'>>;

type ExtendedAnnualData = Partial<Record<(typeof AdditionalDataColumnNames)[number], number>>;

export type AnnualData = Expand<BasicAnnualData & ExtendedAnnualData>;

type CountryName = string;

export type CountryData = {
  iso_code: string;
  data: AnnualData[];
};

export type SummaryData = Record<CountryName, CountryData | undefined>;
