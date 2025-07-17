import { NewRow } from '../model/interfaceData';

const user_input = require('prompt-sync')({sigint: true})


export function readNewRow(): string[] {
    const userRow: string[] = []
    userRow.push(user_input('Digite o nome: '))
    userRow.push(user_input('Digite o nome: '))
    userRow.push(user_input('Digite o peso: '))
    userRow.push(user_input('Digite o valor: '))
    userRow.push(user_input('Digite a quantidade: '))
    return userRow
}