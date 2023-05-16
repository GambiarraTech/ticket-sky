import { Cartao, deleteCartao, insertCartao } from '../../types/cartao';

export default async (req: any, res: any) => {
  const { service } = req.body;

  if (service) {
    switch (service) {
      case 'criarCartao': {
        const { titular, cpf, numero, validade, cvv } = req.body;
        const cartao: Cartao = await insertCartao(titular, cpf, numero, validade, cvv);
        if (cartao) {
          res.json({ success: true, cartao: cartao });
        } else {
          res.json({ success: false });
        }
        break;
      }
      case 'deletarCartao': {
        const { cpf, numero } = req.body;
        const result: boolean = await deleteCartao(cpf, numero);

        if (result) {
          res.json({ success: true });
        } else {
          res.json({ success: false });
        }

        break;
      }
    }
  }
}