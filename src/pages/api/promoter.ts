import md5 from "md5";
import { v4 as uuid } from 'uuid';
import * as promoter from '../../types/promoter';

export default async (req: any, res: any) => {

    const body = req.body;
    const { nome, email, senha, cpf_cnpj } = req.body


    if (body.service) {
        switch (body.service) {
            case 'loginPromoter': {
                const { email, senha } = body;
                const senhaHash = md5(senha)
                const checkLogin: promoter.Promoter = await promoter.loginPromoter(email, senhaHash)

                if (checkLogin != null) {

                    //O token criando aqui segue a seguinte lógica:
                    //os primeiros digitos do token antes do primeiro hifen representa o usuario logado
                    //o primeiro digito representa o tipo do usuario:
                    //1 = admin 2 = promotor e 3 = cliente
                    //e o restante o id dele na sua respectiva tabela
                    const dataUser = '2' + checkLogin.id
                    const encodedData = Buffer.from(dataUser, 'utf8').toString('base64')
                    const token = encodedData + '-' + uuid()
                    const data = {
                        token: token,
                        user: {
                            id: checkLogin.id,
                            email: checkLogin.email,
                            nome: checkLogin.nome,
                            role: 'promoter'
                        }
                    }

                    res.json({ result: data })

                } else {
                    res.json({ error: 'Promoter não encontrado.' })
                }

                break
            }
            case 'cadastroPromoter': {
                const { nome, email, senha, cpf_cnpj } = body
                const verificaCPF_CNPJ = isNumericString(cpf_cnpj)
                if (!verificaCPF_CNPJ || cpf_cnpj.length < 11) {
                    res.json({ error: 'CPF/CNPJ inválido!' })
                }
                const senhaHash = md5(senha)

                const checkCpfCnpj = await promoter.checkCpfCnpj(cpf_cnpj)

                if (checkCpfCnpj == null) {
                    res.json({ error: 'CPF/CNPJ já cadastrado.' })
                    break;
                }

                const checkLogin: promoter.Promoter = await promoter.cadastroPromoter(nome, email, senhaHash, cpf_cnpj)

                if (checkLogin != null) {

                    const dataUser = '2' + checkLogin.id
                    const encodedData = Buffer.from(dataUser, 'utf8').toString('base64')
                    const token = encodedData + '-' + uuid()
                    const data = {
                        token: token,
                        user: {
                            email: checkLogin.email,
                            nome: checkLogin.nome,
                            role: 'promoter'
                        }
                    }

                    res.json({ result: data })

                } else {
                    res.json({ error: 'Promoter já cadastrado.' })
                }

                break
            }

            case 'editarPromoter': {
                const id = req.body.id;
                const editarPromoter = await promoter.editarPromoter(email, nome, cpf_cnpj, id);
                if (editarPromoter != undefined) {

                    res.json({ result: editarPromoter })
                } else {

                    res.json({ error: 'Erro ao editar promoter' })
                }
                break
            }
            case 'alterarSenha': {

                const senhaAntiga = req.body.senhaAntiga;
                const novaSenha = req.body.novaSenha;

                const alteraSenha = await promoter.alterarSenha(email, senhaAntiga, novaSenha);
                res.json({ result: alteraSenha })
                break
            }
            case 'getPerfil': {
                const id = req.body.id;
                const checkLogin: promoter.Promoter = await promoter.getPromoter(id)
                res.json({ result: checkLogin })
                break
            }

            case 'getPromoters': {
                const promoters: promoter.Promoter[] = await promoter.getAllPromoters();

                if (promoters && promoters.length > 0) {
                    const data = promoters

                    res.json({ promoters: data });
                } else {

                    res.json({ promoters: [] });
                }

                break;
            }
            case 'getPromotersAguardandoAprov': {
                const promoters: promoter.Promoter[] = await promoter.getPromotersAguardandoAprov();

                if (promoters && promoters.length > 0) {
                    const data = promoters

                    res.json({ promoters: data });
                } else {
                    res.json({ promoters: [], error: 'Nenhum promoter encontrado' });
                }

                break;

            }
            case 'aprovarPromoter': {
                const id = body.idPromoter
                const aprovarPromoter = await promoter.aprovarPromoter(id)

                if (aprovarPromoter != null) {
                    res.json({ message: aprovarPromoter });

                } else {
                    res.json({ error: 'Houve algum erro durante a aprovação' })
                }

                break
            }
            case 'reprovarPromoter': {
                const id = body.idPromoter
                const reprovarPromoter = await promoter.reprovarPromoter(id)

                if (reprovarPromoter != null) {
                    res.json({ message: reprovarPromoter });

                } else {
                    res.json({ error: 'Houve algum erro durante a reprovação' })
                }
                break
            }
            default: {

                break;
            }
        }
    } else {
        if (req.query.id) {

            const checkLogin: promoter.Promoter = await promoter.getPromoter(req.query.id)

            const data = {
                id: checkLogin.id,
                email: checkLogin.email,
                nome: checkLogin.nome,
                role: 'promoter'
            }

            res.json({ user: data })
        }
    }

}

function isNumericString(str: string): boolean {
    return /^\d+$/.test(str);
}

