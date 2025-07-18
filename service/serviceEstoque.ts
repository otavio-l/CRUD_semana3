import { readCSV } from '../model/readCSV'


export async function verifyRow(userRow: string[]): Promise<string[]> {
    const [nome, peso, valor, quant] = userRow
    
    if (typeof userRow[0] !== 'string' || isNaN(Number(peso)) || isNaN(Number(valor)) || 
    isNaN(Number(quant))) {
        throw new Error('Dados inválidos para o produto')
    }
    
    const rows = await readCSV()
    for (let i=0; i<4; i++){
        if (rows[i].nome === userRow[0]){
            throw new Error('Produto já existe')
        }
    }

    return userRow
}
