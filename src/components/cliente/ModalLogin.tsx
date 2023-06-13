/**
Componente ModalLogin.
Este componente exibe um formulário de login ou cadastro para o cliente.
O formulário pode alternar entre as variantes 'signIn' (login) e 'signUp' (cadastro).
O usuário preenche os campos necessários (nome, sobrenome, email e senha) dependendo da variante escolhida.
Quando o botão "Fazer Login" ou "Cadastre-se" é clicado, é feita a chamada à API para realizar o login ou cadastro do cliente.
Caso ocorra algum erro, uma mensagem de erro é exibida.
*/

import { AuthContext } from '@/contexts/AuthContext';
import * as router from '@/pages/api/router';
import style from '@/styles/cliente/login.module.css';
import Image from 'next/image';
import { useCallback, useContext, useState } from 'react';

/**
 * Propriedades do componente ModalLogin.
 */
interface ModalLoginProps {
  onSubmit: () => void;
}

/**
 * Componente para exibir um formulário de login e cadastro de usuário em um modal.
 */
export default function ModalLogin(props: ModalLoginProps) {
  const [variant, setVariant] = useState('signIn');

  /**
   * Função para alternar entre as variantes "signIn" e "signUp".
   */
  const changeVariant = useCallback(() => {
    setShowErroLogin(false);
    setVariant((currentvariant) => (currentvariant === 'signIn' ? 'signUp' : 'signIn'));
  }, []);

  const [cliente] = useState({
    nome: '',
    sobrenome: '',
    email: '',
    senha: '',
    service: '',
  });

  const { login } = useContext(AuthContext);
  const [showErroLogin, setShowErroLogin] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  /**
   * Função para realizar o login do cliente.
   */
  async function loginCliente(event: React.FormEvent) {
    cliente.service = 'loginCliente';
    event.preventDefault();
    setShowErroLogin(false);

    const resLogin = router.apiPost(cliente, 'cliente');

    if (cliente.email == '' || cliente.senha == '') {
      setErrorMessage('Preencha todos os campos.');
      setShowErroLogin(true);
    } else {
      resLogin.then((value) => {
        if (!value.error) {
          props.onSubmit();
          login(value.result);
        } else {
          setErrorMessage(value.error);
          setShowErroLogin(true);
        }
      });
    }
  }

  /**
   * Função para cadastrar um novo cliente.
   */
  async function cadastroCliente(event: React.FormEvent) {
    cliente.service = 'cadastroCliente';
    event.preventDefault();
    setShowErroLogin(false);

    const resCadastro = router.apiPost(cliente, 'cliente');

    if (cliente.email == '' || cliente.senha == '' || cliente.nome == '' || cliente.sobrenome == '') {
      setErrorMessage('Preencha todos os campos.');
      setShowErroLogin(true);
    } else {
      resCadastro.then((value) => {
        if (!value.error) {
          cliente.service = 'loginCliente';
          const resLogin = router.apiPost(cliente, 'cliente');

          resLogin.then((value) => {
            props.onSubmit();
            login(value.result);
          });
        } else {
          setErrorMessage(value.error);
          setShowErroLogin(true);
        }
      });
    }
  }

  return (
    <>
      <form action="">
        <div className={style.centerText}>
          <h3 className={style.centerLogo}>
            <Image src="/images/logo-minimal.png" alt="Logo" height="100" width="100" />
          </h3>
          <h4 className={style.title}>{variant === 'signIn' ? 'Faça Login' : 'Faça seu cadastro'}</h4>
          <p className={style.description}>Bem-vindo ao TicketSky, preencha os campos abaixo para continuar.</p>

          <div className="">
            {variant === 'signUp' && (
              <div className={style.inputPosition}>
                <input
                  className={style.inputSignUp}
                  placeholder="Nome"
                  type="text"
                  onChange={(e) => (cliente.nome = e.target.value)}
                  maxLength={20}
                  required
                />
                <input
                  className={style.inputSignUp}
                  placeholder="Sobrenome"
                  type="text"
                  onChange={(e) => (cliente.sobrenome = e.target.value)}
                  maxLength={50}
                  required
                />
              </div>
            )}
            <div className={style.inputPosition}>
              <input
                className={style.inputSignUp}
                placeholder="E-mail"
                type="email"
                onChange={(e) => (cliente.email = e.target.value)}
                maxLength={50}
                required
              />
            </div>
            <div className="">
              <input
                className={style.inputSignUp}
                placeholder="Senha"
                type="password"
                onChange={(e) => (cliente.senha = e.target.value)}
                maxLength={30}
                required
              />
            </div>
          </div>
          <button onClick={variant === 'signIn' ? loginCliente : cadastroCliente} className={style.loginButton}>
            {variant === 'signIn' ? 'Fazer Login' : 'Cadastre-se'}
          </button>
          <p className={style.mensagemErro}>{showErroLogin ? errorMessage : ''}</p>
          <p className={style.positionLinkButton}>
            {variant === 'signIn' ? 'Primeiro Acesso?' : 'Já Possui uma Conta?'}
            <span onClick={changeVariant} className={style.linkButton}>
              {variant === 'signIn' ? 'Criar Conta' : 'Fazer Login'}
            </span>
          </p>
        </div>
      </form>
    </>
  );
}
