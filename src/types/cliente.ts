import { query } from '@/lib/db';
import md5 from 'md5';

/**
 * Tipo de dados para um cliente.
 */
export type Cliente = {

    id: number,
    nome: string,
    sobrenome: string,
    cpf: string,
    email: string,
    senha: string,

}

/**
 * Função assíncrona para cadastrar um novo cliente.
 * @param nome O nome do cliente.
 * @param sobrenome O sobrenome do cliente.
 * @param email O email do cliente.
 * @param senha A senha do cliente.
 * @param cpf O CPF do cliente (opcional).
 * @returns Um objeto contendo o email e a senha do novo cliente cadastrado, ou null se ocorrer algum erro.
 */
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

/**
 * Função assíncrona para excluir um cliente.
 * @param email O email do cliente.
 * @param senha A senha do cliente.
 */
export async function deleteCliente(email: string, senha: string) {
    await query({
        query: "DELETE FROM cliente WHERE cliente.email = (?) AND cliente.senha = (?)",
        values: [email, senha]
    })

}

/**
 * Função assíncrona para realizar o login de um cliente.
 * @param email O email do cliente.
 * @param senha A senha do cliente.
 * @returns Um objeto contendo os dados do cliente logado, ou null se as credenciais estiverem incorretas.
 */
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

/**
 * Função assíncrona para editar os dados de um cliente.
 * @param email O novo email do cliente.
 * @param nome O novo nome do cliente.
 * @param sobrenome O novo sobrenome do cliente.
 * @param cpf O novo CPF do cliente.
 * @param id O ID do cliente a ser editado.
 * @returns Uma mensagem informando que o cliente foi alterado com sucesso.
 */
export async function editarCliente(email: string, nome: string, sobrenome: string, cpf: string, id: number) {
    const sql = `
        UPDATE
            cliente
        SET
            email = (?),
            nome = (?),
            sobrenome = (?),
            cpf = (?)
        WHERE
            id = (?)
    `;
    const editaCliente: any = await query({
        query: sql,
        values: [email, nome, sobrenome, cpf, id]
    });

    return "Cliente alterado com sucesso!";
}

/**
 * Função assíncrona para editar os dados de um cliente.
 * @param email O novo email do cliente.
 * @param nome O novo nome do cliente.
 * @param sobrenome O novo sobrenome do cliente.
 * @param cpf O novo CPF do cliente.
 * @param id O ID do cliente a ser editado.
 * @returns Uma mensagem informando que o cliente foi alterado com sucesso.
 */
export async function alterarSenha(email: string, senhaAntiga: string, novaSenha: string) {
    const senhaHash = md5(senhaAntiga)
    const novaSenhaHash = md5(novaSenha)
    const confirmaSenha = await loginCliente(email, senhaHash);

    if (confirmaSenha != null) {

        if (novaSenha == senhaAntiga) {
            return 'A nova senha não pode ser igual a atual';
        }
        else {
            const alteraSenha: any = await query({
                query: "UPDATE cliente SET senha = (?) WHERE email = (?)",
                values: [novaSenhaHash, email],
            })

            return "Senha alterada com sucesso!";
        }

    }

    return 'Senha incorreta';
}

/**
 * Função assíncrona para obter os dados de um cliente pelo seu ID.
 * @param id O ID do cliente a ser obtido.
 * @returns Um objeto contendo os dados do cliente encontrado, ou null se o cliente não for encontrado.
 */
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


