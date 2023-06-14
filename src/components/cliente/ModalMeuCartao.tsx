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
  async function cadastrarCartao(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    cartao.id_cliente = user.id;
    cartao.service = 'saveCartao';
    const res = await router.apiPost(cartao, 'cartao');
    alert(res.result);
  }

  /**
   * Função para deletar o cartão de crédito do usuário.
   */
  async function deletarCartao() {
    const res = await router.apiPost({ id_cliente: user.id, service: 'deletarCartao' }, 'cartao');

    setCartao({
      titular: '',
      cpf: '',
      numero: '',
      vencimento: '',
      id_cliente: '',
      service: '',
    });

    alert(res.result);
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
      <form onSubmit={cadastrarCartao} className={style.formStyle}>
        <div className={style.inputFormat}>
          Nome do Titular
          <input
            id="titular"
            type="text"
            maxLength={50}
            className={style.primaryInputStyle}
            placeholder="Nome do Titular"
            value={cartao.titular}
            required
            onChange={(e) => setCartao({ ...cartao, titular: e.target.value })}
          />
        </div>
        <div className={style.inputFormat}>
          CPF do Titular
          <input
            id="cpf"
            type="text"
            maxLength={11}
            className={style.primaryInputStyle}
            placeholder="CPF do Titular"
            value={cartao.cpf}
            required
            onChange={(e) => setCartao({ ...cartao, cpf: e.target.value })}
          />
        </div>
        <div className={style.inputFormat}>
          Número do Cartão
          <input
            id="numero"
            type="text"
            maxLength={16}
            className={style.primaryInputStyle}
            placeholder="Número do Cartão"
            value={cartao.numero}
            required
            onChange={(e) => setCartao({ ...cartao, numero: e.target.value })}
          />
        </div>
        <div className={style.secondFormat}>
          <div className={style.inputFormat}>
            Validade (mm/aa)
            <input
              id="validade"
              type="text"
              maxLength={5}
              className={style.secondInputStyle}
              placeholder="Validade"
              value={cartao.vencimento}
              required
              onChange={(e) => setCartao({ ...cartao, vencimento: e.target.value })}
            />
          </div>
        </div>
        <div className={style.buttonDiv}>
          <button type="button" name="remover" className={style.buttonDelete} onClick={deletarCartao}>
            Remover
          </button>
          <button type="submit" name="salvar" className={style.buttonSave}>
            Salvar
          </button>
        </div>
      </form>
    </>
  );
}
