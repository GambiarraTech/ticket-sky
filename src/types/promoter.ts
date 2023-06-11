import { query } from '@/lib/db'

export type Promoter = {
    id: number,
    nome: string,
    senha: string,
    email: string,
    cpf_cnpj: string,
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
    try {
        const verificaPromoter = await query({
            query: "SELECT * FROM promoter WHERE promoter.email = (?)",
            values: [email],
        });

        if (Object.keys(verificaPromoter).length > 0) {
            return null;
        }

        await query({
            query: "INSERT INTO promoter (nome, email, senha, cpf_cnpj, aprovado) VALUES (?, ?, ?, ?, ?)",
            values: [nome, email, senha, cpf_cnpj, 0]
        });

        const promoter: any = await query({
            query: "SELECT * FROM promoter WHERE promoter.email = (?)",
            values: [email],
        });

        if (Object.keys(promoter).length > 0) {
            return promoter[0];
        } else {
            throw new Error('Falha ao cadastrar o promoter.');
        }
    } catch (error: any) {
        throw new Error('Erro ao cadastrar o promoter: ' + error.message);
    }
}


export async function editarPromoter(email: string, nome: string, cpf_cnpj: string, id: number) {
    console.log(cpf_cnpj);
    const sql = `
        UPDATE
            promoter
        SET
            email = (?),
            nome = (?),
            cpf_cnpj = (?)
        WHERE
            id = (?)
    `;
    const editaPromoter: any = await query({
        query: sql,
        values: [email, nome, cpf_cnpj, id]
    });

    return "Promoter alterado com sucesso!";
}

export async function alterarSenha(email: string, senhaAntiga: string, novaSenha: string) {

    const confirmaSenha = await loginPromoter(email, senhaAntiga);

    if (confirmaSenha != null) {

        if (novaSenha == senhaAntiga) {
            return 'A nova senha não pode ser igual a atual';
        }
        else {
            const alteraSenha: any = await query({
                query: "UPDATE promoter SET senha = (?) WHERE email = (?)",
                values: [novaSenha, email],
            })

            return "Senha alterada com sucesso!";
        }

    }

    return 'Senha incorreta';
}





export async function getAllPromoters() {

    const promoters: any = await query({
        query: "SELECT id,nome,email,cpf_cnpj,aprovado FROM promoter",
    })

    if (Object.keys(promoters).length > 0) {
        return promoters
    } else {
        return null
    }
}

export async function getPromotersAguardandoAprov() {

    const promoters: any = await query({
        query: "SELECT id,nome,email,cpf_cnpj,aprovado FROM promoter WHERE aprovado = 0",
    })

    if (Object.keys(promoters).length > 0) {
        return promoters
    } else {
        return null
    }
}

export async function aprovarPromoter(id: number) {
    await query({
        query: "UPDATE promoter SET aprovado = 1 WHERE id = (?)",
        values: [id]
    })

    const promoter: any = await query({
        query: "SELECT aprovado FROM promoter WHERE id = (?) AND aprovado = 1",
        values: [id]
    })

    if (Object.keys(promoter).length > 0) {
        return 'Promoter aprovado.'
    } else {
        return null
    }
}

export async function reprovarPromoter(id: number) {
    await query({
        query: "UPDATE promoter SET aprovado = 2 WHERE id = (?)",
        values: [id]
    })

    const promoter: any = await query({
        query: "SELECT * FROM promoter WHERE id = (?)",
        values: [id]
    })

    if (Object.keys(promoter).length > 0) {
        return null
    } else {
        return 'Promoter reprovado.'
    }
}
