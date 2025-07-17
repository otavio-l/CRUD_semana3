import { readCSV } from '../model/readCSV'
import { writeCSV } from '../model/writeCSV'
import { NewRow } from '../model/interfaceData'


const dbPath = '../db/estoque.csv'


export async function verifyRow(userRow: string[]): Promise<boolean> {
    if (typeof userRow[0] !== 'string' || isNaN(Number(userRow[1])) || isNaN(Number(userRow[2])) || 
    isNaN(Number(userRow[3]))) {
        return false
    }
    const rows = await readCSV(dbPath)

    for (let i=0; i<4; i++){
        if (rows[i].nome === userRow[0]){
            return false
        }
    }
    return true
}
