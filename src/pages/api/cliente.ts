import { cadastroCliente, deleteCliente, loginCliente } from '../../types/cliente'

export default async (req: any, res: any) => {

    const { nome, sobrenome, email, senha, cpf } = req.body

    const method = req.method

    switch (method) {
        case 'GET': {
            const checkLogin = await loginCliente(email, senha)
            res.json({ result: checkLogin })
            break
        }
        case 'POST': {
            const createCliente = await cadastroCliente(nome, sobrenome, email, senha, cpf)
            res.json({ result: createCliente })
            break
        }
        case 'PUT': {
            // this is second case block
            // and there can be any number of cases
            break
        }
        case 'DELETE': {
            const deletarCliente = await deleteCliente(email, senha)
            res.json({ result: deletarCliente })
            break
        }
    }
}
