/**
Componente MeuCartao.
Este componente exibe um formulário para o usuário cadastrar ou visualizar as informações de um cartão.
O componente utiliza o contexto AuthContext para acessar as informações do usuário logado.
O formulário possui campos para o nome do titular, CPF do titular, número do cartão e validade.
O usuário pode cadastrar um novo cartão ou visualizar as informações do cartão existente.
O usuário também pode deletar o cartão existente.
*/

import { AuthContext } from '@/contexts/AuthContext';
import * as router from '@/pages/api/router';
import style from '@/styles/cliente/meuCartao.module.css';
import { useContext, useEffect, useState } from 'react';

/**
 * Componente para exibir e editar as informações do cartão de crédito do usuário.
 */
export default function MeuCartao() {
  const { user } = useContext(AuthContext);
  const [cartao, setCartao] = useState({
    titular: '',
    cpf: '',
    numero: '',
    vencimento: '',
    id_cliente: '',
    service: '',
  });

  /**
   * Função para cadastrar o cartão de crédito do usuário.
   */
  async function cadastrarCartao() {
    cartao.id_cliente = user.id;
    cartao.service = 'saveCartao';
    await router.apiPost(cartao, 'cartao');
  }

  /**
   * Função para deletar o cartão de crédito do usuário.
   */
  async function deletarCartao() {
    await router.apiPost({ id_cliente: user.id, service: 'deletarCartao' }, 'cartao');
  }

  useEffect(() => {
    router.apiPost({ id_cliente: user.id }, 'cartao').then((value) => {
      if (value.result != null) {
        setCartao(value.result);
      }
    });
  }, []);

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
            defaultValue={cartao.titular}
            onChange={(e) => (cartao.titular = e.target.value)}
          />
        </div>
        <div className={style.inputFormat}>
          CPF do Titular
          <input
            type="text"
            className={style.primaryInputStyle}
            placeholder="CPF do Titular"
            defaultValue={cartao.cpf}
            onChange={(e) => (cartao.cpf = e.target.value)}
          />
        </div>
        <div className={style.inputFormat}>
          Número do Cartão
          <input
            type="text"
            className={style.primaryInputStyle}
            placeholder="Número do Cartão"
            defaultValue={cartao.numero}
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
              defaultValue={cartao.vencimento}
              onChange={(e) => (cartao.vencimento = e.target.value)}
            />
          </div>
        </div>
      </form>
      <div className={style.buttonDiv}>
        <button className={style.buttonDelete} onClick={deletarCartao}>
          Remover
        </button>
        <button className={style.buttonSave} onClick={cadastrarCartao}>
          Salvar
        </button>
      </div>
    </>
  );
}
