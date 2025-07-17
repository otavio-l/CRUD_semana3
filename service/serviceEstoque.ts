import { readCSV } from '../model/readCSV'
import { writeCSV } from '../model/writeCSV'
import { NewRow } from '../model/interfaceData'


const dbPath = '../db/estoque.csv'


export async function verifyRow(userRow: [string, number, number, number]): Promise<NewRow> {
    for (let i=1; i<4; i++){
        userRow[i] = Number(userRow[i])
    }
    if (typeof userRow[0] !== 'string' || isNaN(Number(userRow[1])) || isNaN(Number(userRow[2])) || 
    isNaN(userRow[3])) {
        throw new Error('Dados inválidos para o produto')
    }
    
    const rows = await readCSV(dbPath)
    for (let i=0; i<4; i++){
        if (rows[i].nome === userRow[0]){
            throw new Error('Produto já existe')
        }
    }

    const row: NewRow = {
        nome: userRow[0],
        peso: userRow[1],
        valor: userRow[2],
        quant: userRow[3]
    }
    return row
}
