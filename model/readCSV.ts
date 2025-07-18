import fs from 'fs';
import csv from 'csv-parser';

import { NewRow, dbPath } from './interfaceData';
import { ensureFileExists } from './writeCSV';

export async function readCSV(): Promise<NewRow[]> {
    ensureFileExists(dbPath);
    return new Promise((resolve, reject) => {
        const results: NewRow[] = [];
        fs.createReadStream(dbPath)
            .pipe(csv())
            .on('data', (rawRow) => {
                const row: NewRow = {
                    nome: rawRow['Nome'],
                    peso: Number(rawRow['Peso']),
                    valor: Number(rawRow['Valor']),
                    quant: Number(rawRow['Quantidade']),
                };
                results.push(row);
            })
            .on('end', () => resolve(results))
            .on('error', (error) => reject(error));
    });
}
