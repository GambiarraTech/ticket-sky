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
        query: "SELECT * FROM promoter WHERE promoter.email = (?) AND promoter.senha = (?)",
        values: [email, senha],
    })

    if (Object.keys(promoter).length > 0) {
        return promoter[0]
    } else {
        return null
    }


}

export async function getPromoter(id: string) {

    const promoter: any = await query({
        query: "SELECT * FROM promoter WHERE promoter.id = (?)",
        values: [id],
    })

    if (Object.keys(promoter).length > 0) {
        return promoter[0]
    } else {
        return null
    }

}
export async function cadastroPromoter(nome: string, email: string, senha: string, cpf_cnpj: string) {
    const verificaPromoter: any = await query({
        query: "SELECT * FROM promoter WHERE promoter.email = (?)",
        values: [email],
    })
    if (Object.keys(verificaPromoter).length > 0) {
        return null
    }

    await query({
        query: "INSERT INTO promoter (nome, email, senha, cpf_cnpj, aprovado) VALUES (?, ?, ?, ?, ?)",
        values: [nome, email, senha, cpf_cnpj, 0]
    })
    const promoter: any = await query({
        query: "SELECT * FROM promoter WHERE promoter.email = (?)",
        values: [email],
    })
    if (Object.keys(promoter).length > 0) {
        return promoter[0]
    } else {
        return null
    }

}
