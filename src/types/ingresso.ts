import { query } from "@/lib/db";

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
