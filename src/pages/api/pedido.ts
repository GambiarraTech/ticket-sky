import * as pedido from '../../types/pedido';

/**
 * Função que lida com as solicitações relacionadas a pedidos.
 * @param req - O objeto de solicitação HTTP.
 * @param res - O objeto de resposta HTTP.
 */
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
                const { ingressos } = req.body;
                const cadastroPedido = await pedido.cadastroPedido('', idCliente, ingressos);
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