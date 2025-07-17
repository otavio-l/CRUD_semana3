import { verifyRow } from "../service/serviceEstoque";
import { removeRow, writeCSV } from "../model/writeCSV";
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
    const remove = userInput("Tem certeza?[S/N]: ")
    if (remove.trim() !== 'S'){
        return
    }

    removeRow('db/estoque.csv', nameExclude)
}

async function listProducts(): Promise<void> {
    const rows = await readCSV('db/estoque.csv')
    for (let row in rows) {
        console.log(JSON.stringify(row, null, 2));
    }
}
