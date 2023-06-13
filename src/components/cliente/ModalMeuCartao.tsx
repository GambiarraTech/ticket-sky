import * as router from '@/pages/api/router';
import style from '@/styles/cliente/meuCartao.module.css';
import { useState } from 'react';

export default function MeuCartao() {
  const [cartao] = useState({
    titular: '',
    cpf: '',
    numero: '',
    validade: '',
    cvv: '',
  });

  async function cadastrarCartao() {
    const res = await router.apiPost(cartao, 'cartao');

    if (res.success) {
    } else {
    }
  }

  async function deletarCartao(cpf: string, numero: string) {
    try {
      await router.apiDelete(cartao, 'cartao');
      return { success: true };
    } catch (error) {
      console.error('Erro ao remover cartão:', error);
      return { success: false };
    }
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
              onChange={(e) => (cartao.validade = e.target.value)}
            />
          </div>
          <div className={style.inputFormat}>
            CVV
            <input
              type="text"
              className={style.secondInputStyle}
              placeholder="CVV"
              onChange={(e) => (cartao.cvv = e.target.value)}
            />
          </div>
        </div>
      </form>
      <div className={style.buttonDiv}>
        <button className={style.buttonDelete} onClick={() => deletarCartao(cartao.cpf, cartao.numero)}>Remover</button>
        <button className={style.buttonSave} onClick={cadastrarCartao}>
          Salvar
        </button>
      </div>
    </>
  );
}
