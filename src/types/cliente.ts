import { query } from '@/lib/db'

export async function cadastroCliente(email: string, senha: string) {
    await query({
        query: "INSERT INTO usuario (email, senha) VALUES (? , ?)",
        values: [email, senha]
    })

}
