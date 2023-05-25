import * as relatorios from '../../types/relatorios'

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
                    console.log('Nenhum Pedido encontrado');
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
                    console.log('Nenhum Evento encontrado');
                    res.json({ meusEventos: [], error: 'Nenhum Evento encontrado' });
                }
                break
            }
            case 'todosEventos': {
                const todosEventos = await relatorios.todosEventos()
                if (todosEventos && todosEventos.length > 0) {
                    const data = todosEventos

                    res.json({ todosEventos: data });
                } else {
                    console.log('Nenhum Evento encontrado');
                    res.json({ todosEventos: [], error: 'Nenhum Evento encontrado' });
                }
                break
            }
        }
    }
}
