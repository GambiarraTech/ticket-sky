import { v4 as uuid } from 'uuid'
import * as cliente from '../../types/cliente'

export default async (req: any, res: any) => {

    const { nome, sobrenome, email, senha, cpf, service } = req.body

    if (service) {
        switch (service) {
            case 'loginCliente': {
                const checkLogin: cliente.Cliente = await cliente.loginCliente(email, senha)
                if (checkLogin != null) {
                    //O token criando aqui segue a seguinte lógica:
                    //os primeiros digitos do token antes do primeiro hifen representa o usuario logado
                    //o primeiro digito representa o tipo do usuario:
                    //1 = admin 2 = promotor e 3 = cliente
                    //e o restante o id dele na sua respectiva tabela
                    const dataUser = '3' + checkLogin.id

                    const encodedData = Buffer.from(dataUser, 'utf8').toString('base64')

                    const token = encodedData + '-' + uuid()

                    const data = {
                        token: token,
                        user: {
                            id: checkLogin.id,
                            email: checkLogin.email,
                            nome: checkLogin.nome,
                            sobrenome: checkLogin.sobrenome,
                            senha: checkLogin.senha,
                            cpf: checkLogin.cpf,
                            role: 'cliente'
                        }
                    }
                    res.json({ result: data })
                } else {
                    console.log('Não logado')
                }
                break
            }
            case 'cadastroCliente': {
                const createCliente = await cliente.cadastroCliente(nome, sobrenome, email, senha, cpf)
                res.json({ result: createCliente })
                break
            }
            // case 'PUT': {
            //     // this is second case block
            //     // and there can be any number of cases
            //     break
            // }
            // case 'DELETE': {
            //     const deletarCliente = await deleteCliente(email, senha)
            //     res.json({ result: deletarCliente })
            //     break
            // }
        }
    } else {
        if (req.query.id) {

            const checkLogin: cliente.Cliente = await cliente.getCliente(req.query.id)

            const data = {
                id: checkLogin.id,
                email: checkLogin.email,
                nome: checkLogin.nome,
                sobrenome: checkLogin.sobrenome,
                role: 'cliente'
            }

            res.json({ user: data })
        }
    }

}
