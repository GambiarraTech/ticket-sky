import * as pedido from '../../types/pedido';

export default async (req: any, res: any) => {

    const { service, idCliente } = req.body

    if (service) {
        switch (service) {
            case 'contaPedido': {
                const qntdPedidos = await pedido.contaPedidos();
                res.json(qntdPedidos);
                break
            }
            case 'cadastroPedido': {
                const { tipoIngresso, idIngresso, quantidade } = req.body;
                const cadastroPedido = await pedido.cadastroPedido('', idCliente, tipoIngresso, idIngresso, quantidade);
                res.json({ result: cadastroPedido });
                break
            }
            case 'compra': {
                const { idCliente, ingressos } = req.body;
                const cadastroPedido = await pedido.compra(idCliente, ingressos);
                res.json({ result: cadastroPedido });
                break
            }
        }
    }
}