import { cadastroCliente, deleteCliente } from '../../types/cliente'

export default async (req: any, res: any) => {

    const { email, senha, method } = req.body

    if (method == "createCliente") {

        const createCliente = await cadastroCliente(email, senha)
        res.json({ result: createCliente })

    } else if (method == "deleteCliente") {

        const createCliente = await deleteCliente(email, senha)
        res.json({ result: createCliente })
    }

}





