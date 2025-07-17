import { NewRow } from '../model/interfaceData';

const user_input = require('prompt-sync')({sigint: true})


export function readNewRow(): NewRow {
    const new_row = {
        nome: user_input('Digite o nome: '),
        peso: user_input('Digite o peso: '),
        valor: user_input('Digite o valor: '),
        quant: user_input('Digite a quantidade: ')
    }
    return new_row
}