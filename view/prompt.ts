import { NewRow } from '../model/interfaceData';
import * as controller from '../controller/controleEstoque'

const userInput = require('prompt-sync')({sigint: true})


function readNewRow(): string[] {
    const userRow: string[] = []
    userRow.push(userInput('Digite o nome: '))
    userRow.push(userInput('Digite o nome: '))
    userRow.push(userInput('Digite o peso: '))
    userRow.push(userInput('Digite o valor: '))
    userRow.push(userInput('Digite a quantidade: '))
    return userRow
}

export function removeCertainty(row: NewRow): string {
    console.log("Você está prestes a excluir essa linha:")
    console.log(Object.values(row).join(' , '))
    return userInput("Tem certeza?[S/N]: ").trim()
}

export function menu(): void {
    console.log('Para adicionar um produto digite: 1', '\n', 'Para remover um produto digite: 2', '\n',
        'Para listar os produtos digite: 3', '\n', 'Para ver o valor total do estoque digite: 4', '\n',
        'Para ver o peso total do estoque digite: 5', '\n', 'Para ver a média do preço dos produtos digite: 6',
        '\n', 'Para ver a quantidade total de produtos no estoque digite: 7', '\n',
        'Para ver a quantidade de produtos diferentes digite: 9' ,'\n', 'Para sair digite: 10' 
    )
    const action = userInput('Digite a ação desejada: ')

    switch (action) {
        case '1':
            const row = readNewRow()
            controller.addProduct(row)
            break
        case '2':
            const nameExclude = userInput('Digite o nome do produto para excluir: ')
            controller.removeProduct(nameExclude)
            break
        case '3':
            controller.listProducts()
            break
        case '4':
            controller.computeProducts('valor', 'Valor total estocado')
            break
        case '5':
            controller.computeProducts('peso', 'Peso total estocado(kg)')
            break
        case '6':
            controller.computeProducts('valor', 'Valor médio dos produtos', true, true)
            break
        case '7':
            controller.computeProducts('peso', 'Peso médio dos produtos(kg)', true, true)
            break
        case '8':
            controller.computeProducts('quant', 'Quantidade total de produtos', false)
            break
        case '9':
            process.exit()
        default:
            console.log('Ação inválida')
    }

    console.log('-'.repeat(120))
}