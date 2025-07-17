import fs from 'fs';
import csv from 'csv-parser';
import { NewRow } from './interfaceData';


export async function readCSV(file_path: string): Promise<NewRow[]> {
    return new Promise((resolve, reject) => {
    const results: NewRow[] = [];
    fs.createReadStream(file_path)
      .pipe(csv())
      .on('data', (rawRow) => {
        const row: NewRow = {
          nome: rawRow['Nome'],
          peso: Number(rawRow['Peso']),
          valor: Number(rawRow['Valor']),
          quant: Number(rawRow['Quantidade']),
        }
        results.push(row)
      })
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error));
  });
}
