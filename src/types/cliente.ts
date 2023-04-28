import { query } from '@/lib/db'

export async function cadastroCliente(nome: string, sobrenome: string, email: string, senha: string, cpf: string) {

    if (cpf == undefined) {
        cpf = ""
    }

    await query({
        query: "INSERT INTO cliente (nome, sobrenome, email, senha, cpf) VALUES (?, ?, ?, ?, ?)",
        values: [nome, sobrenome, email, senha, cpf]
    })

}

export async function deleteCliente(email: string, senha: string) {
    await query({
        query: "DELETE FROM cliente WHERE cliente.email = (?) AND cliente.senha = (?)",
        values: [email, senha]
    })

}

export async function loginCliente(email: string, senha: string) {

    const cliente = await query({
        query: "SELECT * FROM cliente WHERE cliente.email = (?) AND cliente.senha = (?)",
        values: [email, senha]
    })

    if (Object.keys(cliente).length > 0) {
        return cliente
    } else {
        return "Cliente não encontrado."
    }


}
