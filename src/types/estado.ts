import { query } from '@/lib/db'

export type Estado = {
    id: number,
    nome: string,
    uf: string
}

export async function getAllEstados() {
    const estados: any = await query({
        query: "SELECT * FROM estado",
    })

    if (Object.keys(estados).length > 0) {
        return estados
    } else {
        return null
    }
}
