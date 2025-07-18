import { NewRow } from '../model/interfaceData';

const userInput = require('prompt-sync')({sigint: true})


export function readNewRow(): string[] {
    const userRow: string[] = []
    userRow.push(userInput('Digite o nome: '))
    userRow.push(userInput('Digite o nome: '))
    userRow.push(userInput('Digite o peso: '))
    userRow.push(userInput('Digite o valor: '))
    userRow.push(userInput('Digite a quantidade: '))
    return userRow
}

export function removeCertainty(row: NewRow): void {
    console.log("Você está prestes a excluir essa linha:")
    console.log(Object.values(row).join(' , '))
    const remove = userInput("Tem certeza?[S/N]: ")
}