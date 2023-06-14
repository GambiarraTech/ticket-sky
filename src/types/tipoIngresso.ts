import { query } from "@/lib/db"


export type TipoIngresso ={
    nome: string,
}


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
