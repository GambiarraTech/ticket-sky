import { query } from "@/lib/db"


export type Categoria ={
    id: number,
    nome: string,
    descricao: string,
}


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

