import { query } from '@/lib/db'

export async function fillCatalog() {
    const itens = await query({
        query: "SELECT * FROM evento JOIN endereco ON evento.id_endereco = endereco.id"
    })

    if (Object.keys(itens).length > 0) {
        return itens
    } else {
        return "Catálogo vazio."
    }
}
