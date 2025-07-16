const user_input = require('prompt-sync')({sigint: true})


interface NewRow {
    nome: string,
    peso: number,
    valor: number,
    quantidade: number
}


function readNewRow(): NewRow {
    const new_row = {
        nome: user_input('Digite o nome: '),
        peso: user_input('Digite o peso: '),
        valor: user_input('Digite o valor: '),
        quantidade: user_input('Digite a quantidade: ')
    }
    return new_row
}