import { query } from '@/lib/db'

export type Evento = {
    id: number,
    nome: string,
    descricao: string,
    data_hora: string,
    banner: string,
    id_endereco: number,
    id_categoria: number,
    id_promoter: number
}
export async function cadastroEvento(nome: string, descricao: string, data_hora: string, banner: string, id_endereco: number, id_categoria: number, id_promoter: number) {


        const insertResult = await query({
            query: "INSERT INTO evento (nome, descricao, data_hora, banner, id_endereco, id_categoria, id_promoter) VALUES (?, ?, ?, ?, ?, ?, ?)",
            values: [nome, descricao, data_hora, banner, id_endereco, id_categoria, id_promoter]
        })
        if ('insertId' in insertResult) {
            const idNovoEvento = insertResult.insertId;

            const novoEvento: any = await query({
                query: "SELECT * FROM evento WHERE id = (?)",
                values: [idNovoEvento]
            })

            if (Object.keys(novoEvento).length > 0) {
                return novoEvento[0]
            } else {
                return null
            }
        }


}

export async function fillCatalog() {
    const itens = await query({
        query: "SELECT * FROM evento JOIN endereco ON evento.id_endereco = endereco.id"
    })

    if (Object.keys(itens).length > 0) {
        return itens
    } else {
        return null
    }
}
