import { query } from "@/lib/db"

/**
 * Tipo de dados para uma categoria.
 */
export type Categoria = {
    id: number,
    nome: string,
    descricao: string,
}

/**
 * Função assíncrona para obter todas as categorias do banco de dados.
 * @returns Um array de objetos Categoria contendo todas as categorias encontradas, ou null se nenhuma categoria for encontrada.
 */
export async function getAll() {


    const categorias: any = await query({
        query: "SELECT * FROM categoria",
    })

    if (Object.keys(categorias).length > 0) {
        return categorias
    } else {
        return null
    }
}
