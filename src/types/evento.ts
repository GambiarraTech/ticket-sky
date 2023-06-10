import { query } from '@/lib/db';

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
        query: "SELECT ev.*, end.*, ev.nome AS evnome, end.nome AS endnome FROM evento AS ev JOIN endereco AS end ON ev.id_endereco = end.id"
    })

    if (Object.keys(itens).length > 0) {
        return itens
    } else {
        return null
    }
}

export async function fillCatalogCat(id: String) {
    const itens = await query({
        query: "SELECT ev.*, end.*, ev.nome AS evnome, end.nome AS endnome FROM evento AS ev JOIN endereco AS end ON ev.id_endereco = end.id JOIN categoria AS cat ON ev.id_categoria = cat.id WHERE ev.id_categoria = (?)",
        values: [id]
    })

    if (Object.keys(itens).length > 0) {
        return itens
    } else {
        return null
    }
}

export async function getEventosPromoter(id: string) {
    const itens = await query({
        query: "SELECT ev.*, end.*, ev.nome AS evnome, end.nome AS endnome FROM evento AS ev JOIN endereco AS end ON ev.id_endereco = end.id AND ev.id_promoter = (?)",
        values: [id]
    })

    if (Object.keys(itens).length > 0) {
        return itens
    } else {
        return null
    }
}


export async function getEventos(id: number) {
    const itens: any = await query({
        query: "SELECT * FROM evento WHERE id=(?)",
        values: [id]
    })

    if (Object.keys(itens).length > 0) {
        return itens[0]
    } else {
        return null
    }
}
