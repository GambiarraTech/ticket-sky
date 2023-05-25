import { v4 as uuid } from 'uuid';
import * as promoter from '../../types/promoter';

export default async (req: any, res: any) => {

    const body = req.body

    if (body.service) {
        switch (body.service) {
            case 'loginPromoter': {
                const { email, senha } = body;
                const checkLogin: promoter.Promoter = await promoter.loginPromoter(email, senha)

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
                const checkLogin: promoter.Promoter = await promoter.cadastroPromoter(nome, email, senha, cpf_cnpj)

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
            case 'getPromoters': {
                const promoters: promoter.Promoter[] = await promoter.getAllPromoters();

                if (promoters && promoters.length > 0) {
                    const data = promoters

                    res.json({ promoters: data });
                } else {
                    console.log('Nenhum promoter encontrado');
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
                    console.log('Nenhum promoter encontrado');
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
                console.log('Serviço inválido');
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
