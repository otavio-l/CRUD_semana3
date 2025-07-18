import { verifyRow } from "../service/serviceEstoque";
import { removeRow, writeCSV } from "../model/writeCSV";
import { readCSV } from "../model/readCSV";
import { NewRow } from "../model/interfaceData";
import { removeCertainty } from "../view/prompt"


export async function addProduct(productFields: string[]): Promise<void> {
    try {
        const row = await verifyRow(productFields)
        await writeCSV('db/estoque.csv', [row])
        console.log("Produto adicionado com sucesso")
    } catch (err) {
        console.error("Erro ao adicionar o produto: ")
    }
}

export async function removeProduct(nameExclude: string): Promise<void> {
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

    if (removeCertainty(rows[index]) !== 'S'){
        return
    }

    removeRow('db/estoque.csv', nameExclude)
}

export async function listProducts(): Promise<void> {
    const rows = await readCSV('db/estoque.csv')
    for (let row of rows) {
        console.log(JSON.stringify(row, null, 2));
    }
}

export async function computeProducts(main: 'peso'|'valor'|'quant', msg: string, quant = true, median = false)
: Promise<void> {
    const rows = await readCSV('db/estoque.csv')
    let sumQuant = 0
    const sum = rows.reduce((acc: number, row: NewRow) => {
        const value = (quant) ? row[main] * row["quant"] : row[main]
        sumQuant += row.quant
        return acc + value
    }, 0)
    const endResult = (median) ? (sum / sumQuant).toFixed(2) : sum
    console.log(`${msg}: ${endResult}`)

}

// export async function priceTotalProducts(): Promise<void> {
//     const rows = await readCSV('db/estoque.csv')
//     const sum = rows.reduce((previousSum: number, currentValue: NewRow): number => {
//         return previousSum + (currentValue.valor * currentValue.quant)
//     }, 0)
//     console.log(`Valor total estocado: ${sum}`)
// }

// export async function kgTotalProducts(): Promise<void> {
//     const rows = await readCSV('db/estoque.csv')
//     const sum = rows.reduce((previousSum: number, currentValue: NewRow): number => {
//         return previousSum + (currentValue.peso * currentValue.quant)
//     }, 0)
//     console.log(`Peso total estocado(kg): ${sum}`)
// }

// export async function priceMedian(): Promise<void> {
//     const rows = await readCSV('db/estoque.csv')
//     let sumQuant = 0
//     const sumPrize = rows.reduce((previousSum: number, currentValue: NewRow): number => {
//         sumQuant += currentValue.quant
//         return previousSum + (currentValue.valor * currentValue.quant)
//     }, 0)
//     console.log(`Valor médio dos produtos: ${(sumPrize / sumQuant).toFixed(2)}`)
// }

// export async function kgMedian(): Promise<void> {
//     const rows = await readCSV('db/estoque.csv')
//     let sumQuant = 0
//     const sumKg = rows.reduce((previousSum: number, currentValue: NewRow): number => {
//         sumQuant += currentValue.quant
//         return previousSum + (currentValue.peso * currentValue.quant)
//     }, 0)
//     console.log(`Peso médio dos produtos(kg): ${(sumKg / sumQuant).toFixed(2)}`)
// }

// export async function quantTotal(): Promise<void> {
//     const rows = await readCSV('db/estoque.csv')
//     const sumQuant = rows.reduce((previousSum: number, currentValue: NewRow): number =>{
//         return previousSum + currentValue.quant
//     }, 0)
//     console.log(`Quantidade total de produtos: ${sumQuant}`)
// }

export async function quantItems(): Promise<void> {
    const rows = await readCSV('db/estoque.csv')
    console.log(`Quantidade de produtos diferentes: ${rows.length}`)
}
