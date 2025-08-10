import { createDescription } from '@components/CardList/index.ts';
import type { DownloadInitProps } from '@components/DownloadLink/DownloadLink.tsx';
import { capitalize } from '@utils/index.ts';
import type { CharacterInfo } from 'src/redux/api.types';

const EOL = '\n';
const CSV_SPLITTER = ';';
export const CSV_MIME_TYPE = 'text/csv;charset=utf-8;';

export const convertInfosToCSV = (infos: CharacterInfo[]): string => {
  const descInfos = infos.map(info => createDescription(info, ','));

  const heading = Object.keys(descInfos[0])
    .map(key => capitalize(key))
    .join(CSV_SPLITTER);

  const rows = descInfos
    .map(desc => {
      return Object.values(desc)
        .map(value => `"${value.replace(/"/g, '\\"')}"`)
        .join(CSV_SPLITTER);
    })
    .join(EOL);

  return `${heading}${EOL}${rows}`;
};

export const getDownloadInitProps = (infos: CharacterInfo[]): DownloadInitProps => {
  return {
    content: convertInfosToCSV(infos),
    fileName: `${infos.length.toString()}_items`,
    type: CSV_MIME_TYPE,
  };
};
