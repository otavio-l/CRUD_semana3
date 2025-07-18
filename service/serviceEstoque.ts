import { readCSV } from '../model/readCSV'
import { NewRow } from '../model/interfaceData'


const dbPath = '../db/estoque.csv'


export async function verifyRow(userRow: string[]): Promise<NewRow> {
    const [nome, peso, valor, quant] = userRow
    
    if (typeof userRow[0] !== 'string' || isNaN(Number(userRow[1])) || isNaN(Number(userRow[2])) || 
    isNaN(Number(userRow[3]))) {
        throw new Error('Dados inválidos para o produto')
    }
    
    const rows = await readCSV(dbPath)
    for (let i=0; i<4; i++){
        if (rows[i].nome === userRow[0]){
            throw new Error('Produto já existe')
        }
    }

    const row: NewRow = {
        nome: nome,
        peso: Number(peso),
        valor: Number(valor),
        quant: Number(quant)
    }
    return row
}
