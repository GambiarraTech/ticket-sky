import { Cartao, deleteCartao, insertCartao, selectCartao, updateCartao } from '../../types/cartao';

export default async (req: any, res: any) => {
    const { service } = req.body;
    if (service) {
        switch (service) {
            case 'saveCartao': {
                const { titular, cpf, numero, vencimento, id_cliente } = req.body;
                const checkCartao = await selectCartao(id_cliente)

                if (checkCartao != null) {
                    const cartao: boolean = await updateCartao(titular, numero, vencimento, cpf, id_cliente)
                    if (cartao) {
                        res.json({ result: 'Cartão editado com sucesso.' })
                    } else {
                        res.json({ result: 'Erro ao editar o cartão.' });
                    }
                } else {
                    const cartao: Cartao = await insertCartao(titular, numero, vencimento, cpf, id_cliente);
                    if (cartao) {
                        res.json({ result: 'Cartão salvo com sucesso.' });
                    } else {
                        res.json({ result: 'Erro ao cadastrar o cartão.' });
                    }
                }
                break;
            }
            case 'deletarCartao': {
                const { id_cliente } = req.body;
                const result: boolean = await deleteCartao(id_cliente);

                if (result) {
                    res.json({ result: 'Cartão deletado com sucesso.' });
                } else {
                    res.json({ result: 'Erro ao deletar o cartão.' });
                }

                break;
            }
        }
    } else {
        const { id_cliente } = req.body;
        const checkCartao = await selectCartao(id_cliente)
        res.json({ result: checkCartao, success: true });
    }
}
