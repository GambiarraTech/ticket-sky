import { query } from '@/lib/db'

export async function cadastroCliente(email: string, senha: string) {
    await query({
        query: "INSERT INTO usuario (email, senha) VALUES (? , ?)",
        values: [email, senha]
    })

}

export async function deleteCliente(email: string, senha: string) {
    await query({
        query: "DELETE FROM usuario WHERE usuario.email = (?) AND usuario.senha = (?)",
        values: [email, senha]
    })

}

export async function loginCliente(email: string, senha: string) {

    const cliente = await query({
        query: "SELECT * FROM usuario WHERE usuario.email = (?) AND usuario.senha = (?)",
        values: [email, senha]
    })

    if (Object.keys(cliente).length > 0) {
        return cliente
    } else {
        return "Cliente não encontrado."
    }


}
