import * as router from '@/pages/api/router';
import style from '@/styles/cliente/meuCartao.module.css';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/contexts/AuthContext';

export default function MeuCartao() {
  const { user } = useContext(AuthContext);
  const [cartao] = useState({
    titular: '',
    cpf: '',
    numero: '',
    vencimento: '',
    id_cliente: '',
    service: ''
  });

  async function cadastrarCartao() {

    cartao.id_cliente = user.id
    cartao.service = 'saveCartao'
    await router.apiPost(cartao, 'cartao');

  }

  async function deletarCartao() {
      await router.apiPost({id_cliente: user.id, service: 'deletarCartao'}, 'cartao');

  }

  return (
    <>
      <div className={style.title}>Meu Cartão</div>
      <form className={style.formStyle}>
        <div className={style.inputFormat}>
          Nome do Titular
          <input
            type="text"
            className={style.primaryInputStyle}
            placeholder="Nome do Titular"
            onChange={(e) => (cartao.titular = e.target.value)}
          />
        </div>
        <div className={style.inputFormat}>
          CPF do Titular
          <input
            type="text"
            className={style.primaryInputStyle}
            placeholder="CPF do Titular"
            onChange={(e) => (cartao.cpf = e.target.value)}
          />
        </div>
        <div className={style.inputFormat}>
          Número do Cartão
          <input
            type="text"
            className={style.primaryInputStyle}
            placeholder="Número do Cartão"
            onChange={(e) => (cartao.numero = e.target.value)}
          />
        </div>
        <div className={style.secondFormat}>
          <div className={style.inputFormat}>
            Validade
            <input
              type="text"
              className={style.secondInputStyle}
              placeholder="Validade"
              onChange={(e) => (cartao.vencimento = e.target.value)}
            />
          </div>
        </div>
      </form>
      <div className={style.buttonDiv}>
        <button className={style.buttonDelete} onClick={deletarCartao}>Remover</button>
        <button className={style.buttonSave} onClick={cadastrarCartao}>
          Salvar
        </button>
      </div>
    </>
  );
}
