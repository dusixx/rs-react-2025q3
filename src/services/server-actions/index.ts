'use server';

import { capitalize } from '@/common/utils/index.ts';
import { createDescription } from '@/components/CardList/index.ts';
import type { CharacterInfo } from '@/services/server-actions/api/api.types';

const EOL = '\n';
const CSV_SPLITTER = ';';

export const convertInfosToCSV = async (infos: CharacterInfo[]): Promise<string> => {
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

  return Promise.resolve(`${heading}${EOL}${rows}`);
};
