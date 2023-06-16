/**
Componente ModalCadastroAdmin.
Este componente exibe um formulário cadastro para o admin.
O usuário preenche os campos necessários (nome, sobrenome, email e senha) dependendo da variante escolhida.
Quando o botão "Cadastre-se" é clicado, é feita a chamada à API para realizar o cadastro do admin.
Caso ocorra algum erro, uma mensagem de erro é exibida.
*/

import * as router from '@/pages/api/router';
import style from '@/styles/cliente/login.module.css';
import Image from 'next/image';
import { useState } from 'react';

/**
 * Propriedades do componente ModalLogin.
 */
interface ModalLoginProps {
  onSubmit: () => void;
  updateData: () => void;
}

/**
 * Componente para exibir um formulário de login e cadastro de usuário em um modal.
 */
export default function ModalCadastroAdmin(props: ModalLoginProps) {
  const [admin] = useState({
    nome: '',
    sobrenome: '',
    email: '',
    senha: '',
    service: '',
  });

  const [showErroLogin, setShowErroLogin] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  /**
   * Função para cadastrar um novo admin.
   */
  async function cadastroadmin(event: React.FormEvent) {
    admin.service = 'cadastroAdmin';
    event.preventDefault();
    setShowErroLogin(false);

    const resCadastro = router.apiPost(admin, 'admin');

    if (admin.email == '' || admin.senha == '' || admin.nome == '' || admin.sobrenome == '') {
      setErrorMessage('Preencha todos os campos.');
      setShowErroLogin(true);
    } else {
      resCadastro.then((value) => {
        if (!value.error) {
          props.onSubmit();
          props.updateData();
        } else {
          setErrorMessage(value.error);
          setShowErroLogin(true);
        }
      });
    }
  }

  return (
    <>
      <form onSubmit={cadastroadmin}>
        <div className={style.centerText}>
          <h3 className={style.centerLogo}>
            <Image src="/images/logo-minimal.png" alt="Logo" height="100" width="100" />
          </h3>
          <h4 className={style.title}>Cadastro Administrador</h4>
          <div className="">
            <div className={style.inputPosition}>
              <input
                className={style.inputSignUp}
                placeholder="Nome"
                type="text"
                onChange={(e) => (admin.nome = e.target.value)}
                maxLength={20}
                required
              />
              <input
                className={style.inputSignUp}
                placeholder="Sobrenome"
                type="text"
                onChange={(e) => (admin.sobrenome = e.target.value)}
                maxLength={50}
                required
              />
            </div>
            <div className={style.inputPosition}>
              <input
                className={style.inputSignUp}
                placeholder="E-mail"
                type="email"
                onChange={(e) => (admin.email = e.target.value)}
                maxLength={50}
                required
              />
            </div>
            <div className="">
              <input
                className={style.inputSignUp}
                placeholder="Senha"
                type="password"
                onChange={(e) => (admin.senha = e.target.value)}
                maxLength={30}
                required
              />
            </div>
          </div>
          <button className={style.loginButton}>Cadastro</button>
          <p className={style.mensagemErro}>{showErroLogin ? errorMessage : ''}</p>
        </div>
      </form>
    </>
  );
}
