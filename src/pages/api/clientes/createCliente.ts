import { cadastroCliente } from '../../../types/cliente'

export default async (req: any, res: any) => {

    const { email, senha } = req.body
    const createCliente = await cadastroCliente(email, senha)

    res.json({ result: createCliente })
}

