import { NewRow } from './interfaceData';
import { readCSV } from './readCSV';

import { createObjectCsvWriter } from 'csv-writer';


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
    await writeCSV(dbPath, updatedRows, false);
}
