import { query } from '@/lib/db'

export async function loginAdmin(email: string, senha: string) {

    const admin = await query({
        query: "SELECT * FROM administrador WHERE administrador.email = (?) AND administrador.senha = (?)",
        values: [email, senha]
    })

    if (Object.keys(admin).length > 0) {
        return admin
    } else {
        return null
    }


}
