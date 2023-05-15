import { query } from '@/lib/db';


export async function meusIngressos(idCliente: number) {

    const sql = `
        SELECT
            ev.banner
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
