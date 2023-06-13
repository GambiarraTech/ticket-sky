import { query } from "@/lib/db";

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
