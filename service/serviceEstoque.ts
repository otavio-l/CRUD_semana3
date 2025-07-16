const user_input = require('prompt-sync')({sigint: true})
import { createObjectCsvWriter as createCsvWriter } from 'csv-writer';
import fs from 'fs';
import csv from 'csv-parser';


interface NewRow {
    nome: string,
    peso: number,
    valor: number,
    quant: number
}


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

async function readCSV(file_path: string): Promise<NewRow[]> {
    return new Promise((resolve, reject) => {
    const results: NewRow[] = [];
    fs.createReadStream(file_path)
      .pipe(csv())
      .on('data', (new_row: NewRow) => results.push(new_row))
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error));
  });
}