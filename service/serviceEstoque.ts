import { readCSV } from '../model/readCSV';

export async function verifyRow(userRow: string[]): Promise<string[]> {
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
