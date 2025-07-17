import { verifyRow } from "../service/serviceEstoque";
import { readNewRow } from "../view/prompt";
import { writeCSV } from "../model/writeCSV";


async function addProduct(productFields: string[]): Promise<void> {
    try {
        const row = await verifyRow(productFields)
        await writeCSV('db/estoque.csv', [row])
        console.log("Produto adicionado com sucesso")
    } catch (err) {
        console.error("Erro ao adicionar o produto: ")
    }
}
