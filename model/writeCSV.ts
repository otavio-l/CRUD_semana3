import { NewRow } from './interfaceData';

import { createObjectCsvWriter as createCsvWriter } from 'csv-writer';


export async function writeCSV(file_path: string, new_row: NewRow[]): Promise<void> {
    const csv_writer = createCsvWriter({
        path: file_path,
        header: [
            {id: 'nome', title: 'Nome'},
            {id: 'peso',title: 'Peso'},
            {id: 'valor',title: 'Valor'},
            {id: 'quant',title: 'Quantidade'},
        ],
    })

    return csv_writer.writeRecords(new_row)
}
