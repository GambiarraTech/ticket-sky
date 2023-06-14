import { query } from '@/lib/db'

export type Admin = {
    id: number,
    nome: string,
    senha: string,
    email: string,
    super_adm: number
}

export async function loginAdmin(email: string, senha: string) {

    const admin: any = await query({
        query: "SELECT * FROM administrador WHERE administrador.email = (?) AND administrador.senha = (?)",
        values: [email, senha],
    })

    if (Object.keys(admin).length > 0) {
        return admin[0]
    } else {
        return null
    }


}

export async function getAdmin(id: string) {

    const admin: any = await query({
        query: "SELECT * FROM administrador WHERE administrador.id = (?)",
        values: [id],
    })

    if (Object.keys(admin).length > 0) {
        return admin[0]
    } else {
        return null
    }

}

export async function getAllAdmins() {

    const admins: any = await query({
        query: "SELECT id,nome,email,super_adm FROM administrador",
    })

    if (Object.keys(admins).length > 0) {
        return admins
    } else {
        return null
    }
}
