import { NewRow } from './interfaceData';

const user_input = require('prompt-sync')({sigint: true})
import { createObjectCsvWriter as createCsvWriter } from 'csv-writer';



function readNewRow(): NewRow {
    const new_row = {
        nome: user_input('Digite o nome: '),
        peso: user_input('Digite o peso: '),
        valor: user_input('Digite o valor: '),
        quant: user_input('Digite a quantidade: ')
    }
    return new_row
}

async function writeNewRow(file_path: string, new_row: NewRow[]): Promise<void> {
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