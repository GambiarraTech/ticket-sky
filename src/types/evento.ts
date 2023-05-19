import { query } from '@/lib/db'

export type Evento = {
    id: number,
    descricao: string,
    data_hora: Date,
    banner: string,
    id_endereco: number,
    id_categoria: number,
    id_promoter: number
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
