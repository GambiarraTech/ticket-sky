import * as relatorios from '../../types/relatorios'

export default async (req: any, res: any) => {

    // O id equivale ao id do usuario
    const { id, service } = req.body

    if (service) {
        switch (service) {
            case 'meusIngressos': {
                const meusPedidos = await relatorios.meusIngressos(id)
                res.json({ result: meusPedidos })
                break
            }
            case 'meusEventos': {
                const meusEventos = await relatorios.meusEventos(id)
                res.json({ result: meusEventos })
                break
            }
            case 'todosEventos': {
                const eventos = await relatorios.todosEventos()
                res.json({ result: eventos })
                break
            }
        }
    }
}
