import { query } from '@/lib/db'

/**
 * Tipo de dados para um administrador.
 */
export type Admin = {
    id: number,
    nome: string,
    senha: string,
    email: string,
    super_adm: number
}

/**
 * Função assíncrona para fazer o login de um administrador.
 * @param email O email do administrador.
 * @param senha A senha do administrador.
 * @returns Um objeto Admin contendo os dados do administrador logado, ou null se o login falhar.
 */
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

/**
 * Função assíncrona para fazer o login de um administrador.
 * @param email O email do administrador.
 * @param senha A senha do administrador.
 * @returns Um objeto Admin contendo os dados do administrador logado, ou null se o login falhar.
 */
export async function deleteAdmin(id: number) {
    await query({
        query: "DELETE FROM administrador WHERE administrador.id = (?)",
        values: [id]
    })

    const admin: any = await query({
        query: "SELECT * FROM administrador WHERE id = (?)",
        values: [id]
    })


    if (Object.keys(admin).length > 0) {
        return null
    } else {
        return 'Administrador removido.'
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

/**
 * Função assíncrona para obter todos os administradores.
 * @returns Um array de objetos Admin contendo os dados de todos os administradores encontrados, ou null se nenhum administrador for encontrado.
 */
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

export async function excluirAdmin(id: string) {
    await query({
        query: "DELETE FROM administrador WHERE administrador.id = (?)",
        values: [id]
    })

    const admin: any = getAdmin(id)

    if (admin == null) {
        return true
    } else {
        return false
    }
}
