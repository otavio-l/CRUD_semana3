import { verifyRow } from "../service/serviceEstoque";
import { readNewRow } from "../view/prompt";
import { writeCSV } from "../model/writeCSV";


async function addProduct(): Promise<void> {
    try {
        const productFields = readNewRow()
        const row = await verifyRow(productFields)
        await writeCSV('db/estoque.csv', [row])
        console.log("Produto adicionado com sucesso")
    } catch (err) {
        console.error("Erro ao adicionar o produto: ")
    }
}
