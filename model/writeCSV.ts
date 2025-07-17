import { NewRow } from './interfaceData';
import { readCSV } from './readCSV';

import { createObjectCsvWriter } from 'csv-writer';
import fs from 'fs/promises';


export async function writeCSV(dbPath: string, row: NewRow[], append = true): Promise<void> {
    const csvWriter = createObjectCsvWriter({
        path: dbPath,
        header: [
            {id: 'nome', title: 'Nome'},
            {id: 'peso',title: 'Peso'},
            {id: 'valor',title: 'Valor'},
            {id: 'quant',title: 'Quantidade'},
        ],
        append: append,
    })

    return csvWriter.writeRecords(row)
}

export async function removeRow(dbPath: string, nameExclude: string): Promise<void> {
    const rows = await readCSV(dbPath)
    const updatedRows = rows.filter(currentRow => currentRow.nome !== nameExclude)
    if (updatedRows.length === 0) {
        await fs.writeFile('db/estoque.csv', 'Nome,Peso,Valor,Quantidade\n')
        return
    }
    await writeCSV(dbPath, updatedRows, false);
}
