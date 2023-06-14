import { query } from '@/lib/db';

/**
 * Tipo de dados para um evento.
 */
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

/**
 * Função assíncrona para cadastrar um novo evento.
 * @param nome - O nome do evento.
 * @param descricao - A descrição do evento.
 * @param data_hora - A data e hora do evento.
 * @param banner - O banner do evento.
 * @param id_endereco - O ID do endereço associado ao evento.
 * @param id_categoria - O ID da categoria associada ao evento.
 * @param id_promoter - O ID do promoter associado ao evento.
 * @returns Os dados do evento recém-criado, ou null se ocorrer algum erro.
 */
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

/**
 * Função assíncrona para preencher o catálogo de eventos.
 * @returns Uma lista de objetos contendo os dados de eventos com seus respectivos endereços, ou null se não houver eventos encontrados.
 */
export async function fillCatalog() {
    const itens = await query({
        query: "SELECT ev.id as id_evento, ev.*, end.*, ev.nome AS evnome, end.nome AS endnome FROM evento AS ev JOIN endereco AS end ON ev.id_endereco = end.id"
    })

    if (Object.keys(itens).length > 0) {
        return itens
    } else {
        return null
    }
}

/**
 * Função assíncrona para preencher o catálogo de eventos de uma categoria específica.
 * @param id - O ID da categoria.
 * @returns Uma lista de objetos contendo os dados de eventos com seus respectivos endereços para a categoria fornecida, ou null se não houver eventos encontrados.
 */
export async function fillCatalogCat(id: String) {
    const itens = await query({
        query: "SELECT ev.id as id_evento, ev.*, end.*, ev.nome AS evnome, end.nome AS endnome FROM evento AS ev JOIN endereco AS end ON ev.id_endereco = end.id JOIN categoria AS cat ON ev.id_categoria = cat.id WHERE ev.id_categoria = (?)",
        values: [id]
    })

    if (Object.keys(itens).length > 0) {
        return itens
    } else {
        return null
    }
}

/**
 * Função assíncrona para obter eventos de um promoter específico.
 * @param id - O ID do promoter.
 * @returns Uma lista de objetos contendo os dados de eventos com seus respectivos endereços para o promoter fornecido, ou null se não houver eventos encontrados.
 */
export async function getEventosPromoter(id: string) {
    const itens = await query({
        query: "SELECT ev.id as id_evento, ev.*, end.*, ev.nome AS evnome, end.nome AS endnome FROM evento AS ev JOIN endereco AS end ON ev.id_endereco = end.id AND ev.id_promoter = (?)",
        values: [id]
    })

    if (Object.keys(itens).length > 0) {
        return itens
    } else {
        return null
    }
}

/**
 * Função assíncrona para obter os dados de um evento específico.
 * @param id - O ID do evento.
 * @returns Os dados do evento especificado, ou null se não for encontrado.
 */
export async function getEventos(id: number) {
    const itens: any = await query({
        query: "SELECT ev.*, end.*, ev.nome AS evnome, end.nome AS endnome, pro.nome as pronome FROM evento AS ev JOIN endereco AS end JOIN promoter as pro ON ev.id_endereco = end.id AND ev.id_promoter = pro.id AND ev.id = (?)",
        values: [id]
    })

    if (Object.keys(itens).length > 0) {
        return itens[0]
    } else {
        return null
    }
}
