/* eslint-disable max-len */
import { createDescription } from '@components/CardList/components/DetailedCard/components/Description/Description.utils.ts';
import type { CharacterInfo } from '@services/api/api.types.ts';
import { capitalize } from '@utils/index.ts';

const EOL = '\n';
const CSV_SPLITTER = ';';

const convertInfosToCSV = (infos: CharacterInfo[]): string => {
  const descInfos = infos.map(createDescription);

  const heading = Object.keys(descInfos[0])
    .map(key => capitalize(key))
    .join(CSV_SPLITTER);

  const rows = descInfos
    .map(desc => {
      return Object.values(desc)
        .map(value => value.replace(/,\s+/g, ','))
        .join(CSV_SPLITTER);
    })
    .join(EOL);

  return `${heading}${EOL}${rows}`;
};

const saveCSVToFile = (filename: string, csv: string): void => {
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');

  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const saveInfosToCSVFile = (infos: CharacterInfo[]): void => {
  saveCSVToFile(`${infos.length.toString()}_items`, convertInfosToCSV(infos));
};
