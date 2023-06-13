import { query } from '@/lib/db'

/**
 * Definição do tipo para os dados de um promoter.
 */
export type Promoter = {
    id: number,
    nome: string,
    senha: string,
    email: string,
    cpf_cnpj: string,
    aprovado: number
}

/**
 * Função assíncrona utilizada para realizar o login de um promoter.
 * Verifica se o email e a senha fornecidos correspondem a um promoter cadastrado.
 * @param email - O email do promoter.
 * @param senha - A senha do promoter.
 * @returns Os dados do promoter caso o login seja bem-sucedido, caso contrário retorna null.
 */
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

/**
 * Função assíncrona utilizada para obter os dados de um promoter pelo seu ID.
 * @param id - O ID do promoter.
 * @returns Os dados do promoter caso ele seja encontrado, caso contrário retorna null.
 */
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

/**
 * Função assíncrona utilizada para cadastrar um promoter.
 * Verifica se o email fornecido já está sendo usado por outro promoter.
 * @param nome - O nome do promoter.
 * @param email - O email do promoter.
 * @param senha - A senha do promoter.
 * @param cpf_cnpj - O CPF ou CNPJ do promoter.
 * @returns Os dados do promoter caso o cadastro seja bem-sucedido, caso contrário retorna null.
 * @throws Um erro caso ocorra uma falha ao cadastrar o promoter.
 */
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

/**
 * Função assíncrona utilizada para editar os dados de um promoter.
 * Atualiza o email, nome e CPF/CNPJ do promoter pelo ID fornecido.
 * @param email - O novo email do promoter.
 * @param nome - O novo nome do promoter.
 * @param cpf_cnpj - O novo CPF ou CNPJ do promoter.
 * @param id - O ID do promoter a ser editado.
 * @returns Uma mensagem informando que o promoter foi alterado com sucesso.
 */
export async function editarPromoter(email: string, nome: string, cpf_cnpj: string, id: number) {
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

/**
 * Função assíncrona utilizada para alterar a senha de um promoter.
 * Verifica se a senha antiga fornecida está correta antes de alterar a senha.
 * @param email - O email do promoter.
 * @param senhaAntiga - A senha antiga do promoter.
 * @param novaSenha - A nova senha do promoter.
 * @returns Uma mensagem informando que a senha foi alterada com sucesso ou uma mensagem de erro.
 */
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

/**
 * Função assíncrona utilizada para obter todos os promoters cadastrados.
 * @returns Uma lista contendo os dados de todos os promoters cadastrados, ou null caso não haja promoters cadastrados.
 */
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

/**
 * Função assíncrona utilizada para obter todos os promoters que estão aguardando aprovação.
 * @returns Uma lista contendo os dados dos promoters que estão aguardando aprovação, ou null caso não haja promoters nessa situação.
 */
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

/**
 * Função assíncrona utilizada para aprovar um promoter.
 * Atualiza o status de aprovação do promoter para 1.
 * @param id - O ID do promoter a ser aprovado.
 * @returns Uma mensagem informando que o promoter foi aprovado ou null caso ocorra algum erro.
 */
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

/**
 * Função assíncrona utilizada para reprovar um promoter.
 * Atualiza o status de aprovação do promoter para 2.
 * @param id - O ID do promoter a ser reprovado.
 * @returns Uma mensagem informando que o promoter foi reprovado ou null caso ocorra algum erro.
 */
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
