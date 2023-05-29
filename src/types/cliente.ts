import { query } from '@/lib/db';

export type Cliente = {

    id: number,
    nome: string,
    sobrenome: string,
    cpf: string,
    email: string,
    senha: string,

}


export async function cadastroCliente(nome: string, sobrenome: string, email: string, senha: string, cpf: string | null) {
    if (cpf == undefined) {
        cpf = null;
    }

    try {
        const insertResult = await query({
            query: "INSERT INTO cliente (nome, sobrenome, email, senha, cpf) VALUES (?, ?, ?, ?, ?)",
            values: [nome, sobrenome, email, senha, cpf]
        })
        if ('insertId' in insertResult) {
            const idNovoCliente = insertResult.insertId;

            const novoCliente: any = await query({
                query: "SELECT email, senha FROM cliente WHERE cliente.id = (?)",
                values: [idNovoCliente]
            })

            if (Object.keys(novoCliente).length > 0) {
                return novoCliente[0]
            } else {
                return null
            }
        }
    } catch (err) {
    };

}

export async function deleteCliente(email: string, senha: string) {
    await query({
        query: "DELETE FROM cliente WHERE cliente.email = (?) AND cliente.senha = (?)",
        values: [email, senha]
    })

}

export async function loginCliente(email: string, senha: string) {
    const cliente: any = await query({
        query: "SELECT * FROM cliente WHERE cliente.email = (?) AND cliente.senha = (?)",
        values: [email, senha]
    })

    if (Object.keys(cliente).length > 0) {
        return cliente[0]
    } else {
        return null
    }
}

export async function getCliente(id: string) {

    const cliente: any = await query({
        query: "SELECT * FROM cliente WHERE cliente.id = (?)",
        values: [id],
    })

    if (Object.keys(cliente).length > 0) {
        return cliente[0]
    } else {
        return null
    }

}


