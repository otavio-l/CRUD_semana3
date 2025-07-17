import { NewRow } from './interfaceData';
import { readCSV } from './readCSV';

import { createObjectCsvWriter as createCsvWriter } from 'csv-writer';


export async function writeCSV(file_path: string, new_row: NewRow[], append = true): Promise<void> {
    const csv_writer = createCsvWriter({
        path: file_path,
        header: [
            {id: 'nome', title: 'Nome'},
            {id: 'peso',title: 'Peso'},
            {id: 'valor',title: 'Valor'},
            {id: 'quant',title: 'Quantidade'},
        ],
        append: append
    })

    return csv_writer.writeRecords(new_row)
}

export async function removeRow(file_path: string, name_exlclude: string): Promise<void> {
    const rows = await readCSV(file_path)
    const updated_rows = rows.filter(current_row => !(current_row.nome == name_exlclude))
    await writeCSV(file_path, updated_rows, false);
}
