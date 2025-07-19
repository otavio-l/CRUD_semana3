import { removeRow, writeCSV } from '../model/writeCSV';
import { readCSV } from '../model/readCSV';
import { NewRow } from '../model/interfaceData';
import { removeCertainty } from '../view/prompt';


async function verifyRow(userRow: string[]): Promise<string[]> {
    const [nome, peso, valor, quant] = userRow;

    if (
        typeof nome !== 'string' ||
        isNaN(Number(peso)) ||
        isNaN(Number(valor)) ||
        isNaN(Number(quant))
    ) {
        throw new Error('Dados inválidos para o produto');
    }

    const rows = await readCSV();

    for (let i = 0; i < rows.length; i++) {
        if (rows[i].nome === nome) {
            throw new Error('Produto já existe');
        }
    }

    return userRow;
}

export async function addProduct(productFields: string[]): Promise<void> {
    try {
        const row = await verifyRow(productFields);
        await writeCSV(row);
        console.log('Produto adicionado com sucesso');
    } catch (err) {
        console.error(`Erro ao adicionar o produto: ${err}`);
    }
}

export async function removeProduct(nameExclude: string): Promise<void> {
    const rows = await readCSV();
    let index;
    for (let i = 0; i < rows.length; i++) {
        if (rows[i].nome === nameExclude) {
            index = i;
            break;
        }
    }
    if (index === undefined) {
        console.error(`${nameExclude} não foi encontardo`);
        return;
    }

    if (removeCertainty(rows[index]) !== 'S') {
        return;
    }

    await removeRow(index);
}

export async function listProducts(): Promise<void> {
    const rows = await readCSV();
    if (rows.length == 0) {
        console.log('Nenhum produto estocado');
        return;
    }
    for (let row of rows) {
        console.log(JSON.stringify(row, null, 2));
    }
}

export async function computeProducts(
    main: 'peso' | 'valor' | 'quant',
    msg: string,
    quant = true,
    median = false,
): Promise<void> {
    const rows = await readCSV();
    let sumQuant = 0;
    const sum = rows.reduce((acc: number, row: NewRow) => {
        const value = quant ? row[main] * row['quant'] : row[main];
        sumQuant += row.quant;
        return acc + value;
    }, 0);
    const endResult = median ? (sum / sumQuant).toFixed(2) : sum;
    console.log(`${msg}: ${endResult}`);
}

export async function quantItems(): Promise<void> {
    const rows = await readCSV();
    console.log(`Quantidade de produtos diferentes: ${rows.length}`);
}
