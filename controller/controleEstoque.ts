import * as service from '../service/serviceEstoque'
import { readNewRow, readNameExclude } from '../view/prompt'; 


export async function controller(action: string): Promise<void> {
    switch (action) {
        case '1':
            const row = readNewRow();
            await service.addProduct(row);
            break;
        case '2':
            const nameExclude = readNameExclude();
            await service.removeProduct(nameExclude);
            break;
        case '3':
            await service.listProducts();
            break;
        case '4':
            await service.computeProducts('valor', 'Valor total estocado');
            break;
        case '5':
            await service.computeProducts('peso', 'Peso total estocado(kg)');
            break;
        case '6':
            await service.computeProducts('valor', 'Valor médio dos produtos', true, true);
            break;
        case '7':
            await service.computeProducts('peso', 'Peso médio dos produtos(kg)', true, true);
            break;
        case '8':
            await service.computeProducts('quant', 'Quantidade total de produtos', false);
            break;
        case '9':
            await service.quantItems();
            break;
        case '10':
            process.exit();
        default:
            console.log('Ação inválida');
    }
}