import { Cartao, deleteCartao, insertCartao, selectCartao, updateCartao } from '../../types/cartao';

export default async (req: any, res: any) => {
  const { service } = req.body;
  if (service) {
    switch (service) {
      case 'saveCartao': {
        const { titular, cpf, numero, vencimento, id_cliente } = req.body;
        const checkCartao = await selectCartao(id_cliente)

        if(checkCartao != null){
            const cartao: boolean = await updateCartao(titular, numero, vencimento, cpf, id_cliente)
            if( cartao == true){
                res.json({ success: true, cartao: cartao })
            }else {
                res.json({ success: false });
            }
        }else{
            const cartao: Cartao = await insertCartao(titular, numero, vencimento, cpf, id_cliente);
            if (cartao) {
              res.json({ success: true, cartao: cartao });
            } else {
              res.json({ success: false });
            }
        }
        break;
      }
      case 'deletarCartao': {
        const { id_cliente } = req.body;
        const result: boolean = await deleteCartao(id_cliente);

        if (result) {
          res.json({ success: true });
        } else {
          res.json({ success: false });
        }

        break;
      }
    }
  }else{
    const { id_cliente } = req.body;
    const checkCartao = await selectCartao(id_cliente)
    res.json({ result: checkCartao, success: true });
  }
}
