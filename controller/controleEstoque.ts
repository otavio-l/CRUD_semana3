import { verifyRow } from "../service/serviceEstoque";
import { writeCSV } from "../model/writeCSV";
import { readCSV } from "../model/readCSV";


async function addProduct(productFields: string[]): Promise<void> {
    try {
        const row = await verifyRow(productFields)
        await writeCSV('db/estoque.csv', [row])
        console.log("Produto adicionado com sucesso")
    } catch (err) {
        console.error("Erro ao adicionar o produto: ")
    }
}

async function removeProduct(nameExclude: string): Promise<void> {
    const rows = await readCSV('db/estoque.csv')
    let index
    for (let i=0; i<rows.length; i++) {
        if (rows[i].nome === nameExclude){
            index = i
            break
        }
    }
    if (index === undefined) {
        console.error(`${nameExclude} não foi encontardo`)
        return
    }

    console.log("Você está prestes a excluir essa linha:")
    console.log(Object.values(rows).join(' , '))        

}