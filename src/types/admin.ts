import { query } from '@/lib/db'
import md5 from 'md5'

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

export async function getAdminEmail(id: string) {

    const admin: any = await query({
        query: "SELECT * FROM administrador WHERE administrador.email = (?)",
        values: [id],
    })

    if (Object.keys(admin).length > 0) {
        return admin[0]
    } else {
        return null
    }

}

/**
 * Função assíncrona para editar os dados de um admin.
 * @param email O email do admin a ser editado.
 * @param nome O novo nome do admin.
 * @param sobrenome O novo sobrenome do admin.
 * @returns Uma mensagem informando que o admin foi alterado com sucesso.
 */
export async function editarAdmin(email: string, nome: string, sobrenome: string) {
    const sql = `
        UPDATE
            administrador
        SET
            nome = (?),
            sobrenome = (?)
        WHERE
            email = (?)
    `;
    const editarAdmin: any = await query({
        query: sql,
        values: [nome, sobrenome, email]
    });

    return "Administrador alterado com sucesso!";
}

/**
 * Função assíncrona utilizada para alterar a senha de um admin.
 * Verifica se a senha antiga fornecida está correta antes de alterar a senha.
 * @param email - O email do admin.
 * @param senhaAntiga - A senha antiga do admin.
 * @param novaSenha - A nova senha do admin.
 * @returns Uma mensagem informando que a senha foi alterada com sucesso ou uma mensagem de erro.
 */
export async function alterarSenha(email: string, senhaAntiga: string, novaSenha: string) {
    const senhaHash = md5(senhaAntiga)
    const novaSenhaHash = md5(novaSenha)
    const confirmaSenha = await loginAdmin(email, senhaHash);

    if (confirmaSenha != null) {

        if (novaSenha == senhaAntiga) {
            return 'A nova senha não pode ser igual a atual';
        }
        else {
            const alteraSenha: any = await query({
                query: "UPDATE administrador SET senha = (?) WHERE email = (?)",
                values: [novaSenhaHash, email],
            })

            return "Senha alterada com sucesso!";
        }

    }

    return 'Senha incorreta';
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
