import { query } from '@/lib/db';

/**
 * Tipo de dados para um cartão de crédito.
 */
export type Cartao = {
    id: number,
    titular: string,
    numero: string,
    vencimento: string,
    cpf: string,
    cvv: string,
}

/**
 * Função assíncrona para inserir um novo cartão de crédito no banco de dados.
 * @param titular O nome do titular do cartão.
 * @param numero O número do cartão de crédito.
 * @param vencimento A data de vencimento do cartão.
 * @param cpf O CPF do titular do cartão.
 * @param id_cliente O ID do cliente associado ao cartão.
 * @returns Um objeto Cartao contendo os dados do novo cartão inserido, ou null se a inserção falhar.
 */
export async function insertCartao(titular: string, numero: string, vencimento: string, cpf: string, id_cliente: string) {

    const insertResult = await query({
        query: "INSERT INTO cartao (numero, vencimento, id_cliente) VALUES (?, ?, ?)",
        values: [numero, vencimento, id_cliente]
    })
    if ('insertId' in insertResult) {
        const idNovoCartao = insertResult.insertId;

        const novoCartao: any = await query({
            query: "SELECT * FROM cartao WHERE cartao.id = (?)",
            values: [idNovoCartao]
        })

        if (Object.keys(novoCartao).length > 0) {
            return novoCartao[0]
        } else {
            return null
        }

    }


}

/**
 * Função assíncrona para excluir um cartão de crédito do banco de dados.
 * @param id_cliente O ID do cliente associado ao cartão a ser excluído.
 * @returns Um booleano indicando se a exclusão foi bem-sucedida (true) ou não (false).
 */
export async function deleteCartao(id_cliente: string): Promise<boolean> {
    try {
        await query({
            query: "DELETE FROM cartao WHERE cartao.id_cliente = (?)",
            values: [id_cliente]
        })
        return true

    } catch (error) {
        console.error(error)
        return false
    }
}

/**
 * Função assíncrona para selecionar um cartão de crédito do banco de dados com base no ID do cliente.
 * @param id_cliente O ID do cliente associado ao cartão.
 * @returns Um objeto Cartao contendo os dados do cartão encontrado, ou null se nenhum cartão for encontrado para o cliente.
 */
export async function selectCartao(id_cliente: string) {
    const cartao: any = await query({
        query: "SELECT * FROM cartao WHERE cartao.id_cliente = (?)",
        values: [id_cliente],
    })

    if (Object.keys(cartao).length > 0) {
        return cartao[0]
    } else {
        return null
    }
}

/**
 * Função assíncrona para selecionar um cartão de crédito do banco de dados com base no ID do cliente.
 * @param id_cliente O ID do cliente associado ao cartão.
 * @returns Um objeto Cartao contendo os dados do cartão encontrado, ou null se nenhum cartão for encontrado para o cliente.
 */
export async function updateCartao(titular: string, numero: string, vencimento: string, cpf: string, id_cliente: string) {
    try {
        const updatedCard: any = await query({
            query: "UPDATE cartao SET titular = (?), numero = (?), vencimento = (?), cpf = (?) WHERE id_cliente = (?)",
            values: [titular, numero, vencimento, cpf, id_cliente],
        })

        const card: any = await selectCartao(id_cliente)
        return card
    } catch {
        return false
    }


}
