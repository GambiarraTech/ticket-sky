import { query } from '@/lib/db'

export type Promoter = {
    id: number,
    nome: string,
    senha: string,
    email: string,
    aprovado: number
}

export async function loginPromoter(email: string, senha: string) {

    const promoter: any = await query({
        query: "SELECT * FROM promoter WHERE prmoter.email = (?) AND prmoter.senha = (?)",
        values: [email, senha],
    })

    if (Object.keys(promoter).length > 0) {
        return promoter[0]
    } else {
        return null
    }


}

export async function getPromoter(id: string) {

    const promoter : any = await query({
        query: "SELECT * FROM promoter WHERE promoter.id = (?)",
        values: [id],
    })

    if (Object.keys(promoter).length > 0) {
        return promoter[0]
    } else {
        return null
    }

}
