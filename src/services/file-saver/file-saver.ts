import { createDescription } from '@components/CardList/index.ts';
import type { CharacterInfo } from '@services/api/api.types.ts';
import { capitalize } from '@utils/index.ts';
import { saveAs } from 'file-saver';

const EOL = '\n';
const CSV_SPLITTER = ';';
const CSV_FILE_TYPE = 'text/csv;charset=utf-8;';

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

export const saveInfosToFile = (
  infos: CharacterInfo[],
  { filename = `${infos.length.toString()}_items`, type = CSV_FILE_TYPE } = {},
): void => {
  saveAs(new File([convertInfosToCSV(infos)], filename, { type }));
};
