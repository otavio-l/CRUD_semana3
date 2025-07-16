import fs from 'fs';
import csv from 'csv-parser';
import { NewRow } from './interfaceData';


export async function readCSV(file_path: string): Promise<NewRow[]> {
    return new Promise((resolve, reject) => {
    const results: NewRow[] = [];
    fs.createReadStream(file_path)
      .pipe(csv())
      .on('data', (new_row: NewRow) => results.push(new_row))
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error));
  });
}
