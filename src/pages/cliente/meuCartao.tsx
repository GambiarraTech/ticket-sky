import NavbarCliente from '@/components/cliente/NavbarCliente';
import style from '@/styles/cliente/telaCartao.module.css';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import { useState } from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import * as router from '../api/router';

const font = Inter({ subsets: ['latin'], weight: '500' });

export default function TelaCartao() {
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
      console.log('Cartão cadastrado com sucesso!');
    } else {
      console.log('Erro ao cadastrar cartão!');
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
    <main className={font.className}>
      <section>
        <NavbarCliente />
        <div className={style.pagePos}>
          <Link href="http://localhost:3000/cliente">
            <AiOutlineArrowLeft size="55" className={style.arrowIconCartao} />
          </Link>
        </div>
        <div className={style.pageFormat}>
          <div className={style.pageStyle}>
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
              <button className={style.buttonDelete}>Remover</button>
              <button className={style.buttonSave} onClick={cadastrarCartao}>
                Salvar
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
