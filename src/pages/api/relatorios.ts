import * as relatorios from '../../types/relatorios'

export default async (req: any, res: any) => {

    const { idCliente, service } = req.body

    if (service) {
        switch (service) {
            case 'meusIngressos': {
                const meusPedidos = await relatorios.meusIngressos(idCliente)
                res.json({ result: meusPedidos })
                break
            }
        }
    }
}
