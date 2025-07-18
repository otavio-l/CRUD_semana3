import { NewRow } from '../model/interfaceData';
import * as controller from '../controller/controleEstoque';

const userInput = require('prompt-sync')({ sigint: true });

function readNewRow(): string[] {
    const userRow: string[] = [];
    userRow.push(userInput('Digite o nome: '));
    userRow.push(userInput('Digite o peso(kg): '));
    userRow.push(userInput('Digite o valor: '));
    userRow.push(userInput('Digite a quantidade: '));
    return userRow;
}

export function removeCertainty(row: NewRow): string {
    console.log('Você está prestes a excluir essa linha:');
    console.log(Object.values(row).join(' , '));
    return userInput('Tem certeza?[S/N]: ').trim();
}

export async function menu(): Promise<void> {
    console.log(
        'Para adicionar um produto digite: 1',
        '\nPara remover um produto digite: 2',
        '\nPara listar os produtos digite: 3',
        '\nPara ver o valor total do estoque digite: 4',
        '\nPara ver o peso total do estoque digite: 5',
        '\nPara ver a média do preço dos produtos digite: 6',
        '\nPara ver a quantidade total de produtos no estoque digite: 7',
        '\nPara ver a quantidade de produtos diferentes digite: 8',
        '\nPara ver a quantidade de produtos diferentes digite: 9',
        '\nPara sair digite: 10',
    );
    const action = userInput('Digite a ação desejada: ');

    switch (action) {
        case '1':
            const row = readNewRow();
            await controller.addProduct(row);
            break;
        case '2':
            const nameExclude = userInput('Digite o nome do produto para excluir: ');
            await controller.removeProduct(nameExclude);
            break;
        case '3':
            await controller.listProducts();
            break;
        case '4':
            await controller.computeProducts('valor', 'Valor total estocado');
            break;
        case '5':
            await controller.computeProducts('peso', 'Peso total estocado(kg)');
            break;
        case '6':
            await controller.computeProducts('valor', 'Valor médio dos produtos', true, true);
            break;
        case '7':
            await controller.computeProducts('peso', 'Peso médio dos produtos(kg)', true, true);
            break;
        case '8':
            await controller.computeProducts('quant', 'Quantidade total de produtos', false);
            break;
        case '9':
            await controller.quantItems();
            break;
        case '10':
            process.exit();
        default:
            console.log('Ação inválida');
    }

    console.log('-'.repeat(120));
    menu();
}
