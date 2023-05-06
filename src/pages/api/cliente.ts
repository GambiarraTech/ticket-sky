import { cadastroCliente, loginCliente } from '../../types/cliente'

export default async (req: any, res: any) => {

    const { nome, sobrenome, email, senha, cpf, service } = req.body

    switch (service) {
        case 'loginCliente': {
            const checkLogin = await loginCliente(email, senha)
            res.json({ result: checkLogin })
            break
        }
        case 'cadastroCliente': {
            const createCliente = await cadastroCliente(nome, sobrenome, email, senha, cpf)
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
}
