import { query } from '@/lib/db';

/**
 * Tipo de dados para um endereço.
 */
export type Endereco = {
    id: number,
    nome: string,
    cep: string,
    uf_estado: string,
    cidade: string,
    bairro: string,
    rua: string,
    numero: string,
}

/**
 * Função assíncrona para cadastrar um novo endereço.
 * @param nome O nome do endereço.
 * @param cep O CEP do endereço.
 * @param uf_estado A UF ou estado do endereço.
 * @param cidade A cidade do endereço.
 * @param bairro O bairro do endereço.
 * @param rua A rua do endereço.
 * @param numero O número do endereço.
 * @returns Um objeto contendo os dados do novo endereço cadastrado, ou null se ocorrer algum erro.
 */
export async function cadastroEndereco(nome: string, cep: string, uf_estado: string, cidade: string, bairro: string, rua: string, numero: string) {


    const insertResult = await query({
        query: "INSERT INTO endereco (nome, cep, uf, cidade, bairro, rua, numero) VALUES (?, ?, ?, ?, ?, ?, ?)",
        values: [nome, cep, uf_estado, cidade, bairro, rua, numero]
    })
    if ('insertId' in insertResult) {
        const idNovoEndereco = insertResult.insertId;

        const novoEndereco: any = await query({
            query: "SELECT * FROM endereco WHERE id = (?)",
            values: [idNovoEndereco]
        })

        if (Object.keys(novoEndereco).length > 0) {
            return novoEndereco[0]
        } else {
            return null
        }
    }


}
