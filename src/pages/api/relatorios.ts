import * as relatorios from '../../types/relatorios'

/**
 * Função que lida com as solicitações relacionadas a relatórios.
 * @param req - O objeto de solicitação HTTP.
 * @param res - O objeto de resposta HTTP.
 */
export default async (req: any, res: any) => {

    // O id equivale ao id do usuario
    const { id, service } = req.body

    if (service) {
        switch (service) {
            case 'meusIngressos': {
                const meusPedidos = await relatorios.meusIngressos(id)
                if (meusPedidos && meusPedidos.length > 0) {
                    const data = meusPedidos

                    res.json({ meusPedidos: data });
                } else {

                    res.json({ meusPedidos: [], error: 'Nenhum Pedido encontrado' });
                }
                break
            }
            case 'meusEventos': {
                const meusEventos = await relatorios.meusEventos(id)
                if (meusEventos && meusEventos.length > 0) {
                    const data = meusEventos

                    res.json({ meusEventos: data });
                } else {
                    res.json({ meusEventos: [], error: 'Nenhum Evento encontrado' });
                }
                break
            }
            case 'eventosAlta': {
                const eventosAlta = await relatorios.eventosAlta()
                if (eventosAlta && eventosAlta.length > 0) {
                    const data = eventosAlta

                    res.json({ eventosAlta: data });
                } else {
                    res.json({ eventosAlta: [], error: 'Nenhum Evento encontrado' });
                }
                break
            }
            case 'todosEventos': {
                const todosEventos = await relatorios.todosEventos()
                if (todosEventos && todosEventos.length > 0) {
                    const data = todosEventos

                    res.json({ todosEventos: data });
                } else {
                    res.json({ todosEventos: [], error: 'Nenhum Evento encontrado' });
                }
                break
            }
        }
    }
}
