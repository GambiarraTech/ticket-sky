import { query } from "@/lib/db"

/**
Tipo que representa um ingresso.
*/
export type TipoIngresso = {
    nome: string,
}

/**
Função assíncrona que retorna todos os ingressos.
@returns Uma lista contendo todos os ingressos, ou null caso não haja ingressos.
*/
export async function getAll() {
    const ingressos: any = await query({
        query: "SELECT * FROM tipo_ingresso",
    })

    if (Object.keys(ingressos).length > 0) {
        return ingressos
    } else {
        return null
    }
}
