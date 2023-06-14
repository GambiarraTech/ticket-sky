import { query } from '@/lib/db'

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
