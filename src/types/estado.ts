import { query } from '@/lib/db'

/**
 * Tipo de dados para um estado.
 */
export type Estado = {
    id: number,
    nome: string,
    uf: string
}

/**
 * Função assíncrona para obter todos os estados.
 * @returns Uma lista de objetos contendo os nomes e UF de todos os estados, ou null se não houver estados encontrados.
 */
export async function getAllEstados() {
    const estados: any = await query({
        query: "SELECT nome, uf FROM estado",
    })

    if (Object.keys(estados).length > 0) {
        return estados
    } else {
        return null
    }
}
