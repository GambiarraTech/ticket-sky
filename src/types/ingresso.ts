import { query } from "@/lib/db";


export type Ingresso = {
    id: number,
    quantidade: number,
    valor: number,
    id_evento: number,
    id_setor: number
}

/**
 * Função assíncrona para obter os ingressos de um evento específico.
 * @param idEvento - O ID do evento.
 * @returns Uma lista de objetos contendo os dados dos ingressos para o evento especificado, ou null se não houver ingressos encontrados.
 */
export async function getIngressosEvento(idEvento: string) {

    const ingressos: any = await query({
        query: "SELECT * FROM ingresso WHERE id_evento = (?) ORDER BY id_setor",
        values: [idEvento]
    });

    if (Object.keys(ingressos).length > 0) {
        return ingressos
    } else {
        return null
    }
}

export async function cadastroIngressos(vip: number, backstage: number, camarote: number, preco_vip: number, preco_backstage: number, preco_camarote: number, idEvento: number) {

    const ingressoVip: any = await query({
        query: "INSERT INTO ingresso (quantidade, valor, id_evento, id_setor) VALUES (?, ?, ?, ?)",
        values: [vip, preco_vip, idEvento, 3]
    })

    const ingressoBackstage: any = await query({
        query: "INSERT INTO ingresso (quantidade, valor, id_evento, id_setor) VALUES (?, ?, ?, ?)",
        values: [backstage, preco_backstage, idEvento, 1]
    })

    const ingressoCamarote: any = await query({
        query: "INSERT INTO ingresso (quantidade, valor, id_evento, id_setor) VALUES (?, ?, ?, ?)",
        values: [camarote, preco_camarote, idEvento, 2]
    })

    if ('insertId' in ingressoCamarote && 'insertId' in ingressoBackstage && 'insertId' in ingressoVip) {

        const idVip = ingressoVip.insertId;
        const vip: any = await query({
            query: "SELECT * FROM ingresso WHERE id = (?)",
            values: [idVip]
        })

        const idBackstage = ingressoBackstage.insertId;
        const backstage: any = await query({
            query: "SELECT * FROM ingresso WHERE id = (?)",
            values: [idBackstage]
        })

        const idCamarote = ingressoCamarote.insertId;
        const camarote: any = await query({
            query: "SELECT * FROM ingresso WHERE id = (?)",
            values: [idCamarote]
        })


        if (Object.keys(vip).length > 0 && Object.keys(backstage).length > 0 && Object.keys(camarote).length > 0) {
            return [vip[0], backstage[0], camarote[0]]
        } else {
            return []
        }
    }

    return []
}
