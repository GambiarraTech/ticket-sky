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
