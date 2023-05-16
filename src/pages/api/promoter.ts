import { v4 as uuid } from 'uuid';
import { Promoter, cadastroPromoter, getAllPromoters, getPromoter, loginPromoter } from '../../types/promoter';

export default async (req: any, res: any) => {

    const body = req.body

    if (body.service) {
        switch (body.service) {
            case 'loginPromoter': {
                const { email, senha } = body;
                const checkLogin: Promoter = await loginPromoter(email, senha)

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
                    console.log('Não logado')
                }

                break
            }
            case 'cadastroPromoter': {
                const { nome, email, senha, cpf_cnpj } = body
                const checkLogin: Promoter = await cadastroPromoter(nome, email, senha, cpf_cnpj)
                if (checkLogin != null) {

                    const token = '2' + '-' + checkLogin.id + '-' + uuid()

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
                    console.log('Não logado')
                }

                break
            }
            case 'getPromoters': {
                const promoters: Promoter[] = await getAllPromoters();

                if (promoters.length > 0) {
                    const data = promoters

                    console.log(data)

                    res.json({ promoters: data });
                } else {
                    console.log('Nenhum promoter encontrado');
                    res.json({ promoters: [] });
                }

                break;
            }
            default: {
                console.log('Serviço inválido');
                break;
            }
        }
    } else {
        if (req.query.id) {

            const checkLogin: Promoter = await getPromoter(req.query.id)

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
