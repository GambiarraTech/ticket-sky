import { query } from '@/lib/db';


export async function meusIngressos(idCliente: number) {

    const sql = `
        SELECT
            ev.banner,
            ev.descricao as descricao_evento,
            ev.data_hora,
            ig.valor as valor_ingresso,
            p.quantidade,
            s.descricao as setor,
            ti.descricao as tipo_ingresso
        FROM
            evento ev,
            ingresso ig,
            pedido p,
            setor s,
            tipo_ingresso ti
        WHERE
            p.id_cliente = (?) AND
            ig.id = p.id_ingresso AND
            ti.id = p.id_tipo_ingresso AND
            s.id = ig.id_setor AND
            ev.id = ig.id_evento;
    `;

    const meusIngressos: any = await query({
        query: sql,
        values: [idCliente],
    })

    if (Object.keys(meusIngressos).length > 0) {
        return meusIngressos
    } else {
        return "Nenhum pedido encontrado."
    }
}

export async function meusEventos(idPromoter: number) {
    const sql = `
        SELECT
            ev.id,
            
            ev.descricao as descricao_evento,
            s.descricao as setor,
            SUM(p.quantidade) as quantidade_vendida,
            (ig.quantidade - SUM(p.quantidade)) as quantidade_disponivel,
            (SUM(p.quantidade) * ig.valor) AS quantidade_arrecadada
        FROM
            evento ev,
            ingresso ig,
            setor s,
            pedido p
        WHERE
            ev.id_promoter = 1 AND
            ig.id_evento = ev.id AND
            s.id = ig.id_setor AND
            p.id_ingresso = ig.id      
        GROUP BY 
            p.id_ingresso;
    `;

    const meusEventos: any = await query({
        query: sql,
        values: [idPromoter],
    })

    if (Object.keys(meusEventos).length > 0) {
        return meusEventos
    } else {
        return "Nenhum evento encontrado."
    }
}

export async function todosEventos() {
    const sql = "SELECT * from evento";

    const eventos: any = await query({
        query: sql,
        values: [],
    })

    if (Object.keys(eventos).length > 0) {
        return eventos
    } else {
        return "Nenhum evento encontrado."
    }
}