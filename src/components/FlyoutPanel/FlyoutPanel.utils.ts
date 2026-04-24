import type { CharacterInfo } from '@/services/server-actions/api/api.types';
import { convertInfosToCSV } from '@/services/server-actions/index.ts';
import { saveAs } from 'file-saver';

export const CSV_MIME_TYPE = 'text/csv;charset=utf-8;';

export const saveInfosToCSVFile = async (infos: CharacterInfo[]): Promise<void> => {
  const fileName = `${infos.length.toString()}_items`;
  const content = [await convertInfosToCSV(infos)];
  saveAs(new File(content, fileName, { type: CSV_MIME_TYPE }));
};
