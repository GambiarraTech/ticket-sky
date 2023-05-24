import { AuthContext } from '@/contexts/AuthContext';
import * as router from '@/pages/api/router';
import style from '@/styles/cliente/login.module.css';
import Image from 'next/image';
import { useCallback, useContext, useState } from 'react';

interface ModalLoginProps {
  onSubmit: () => void;
}

export default function ModalLogin(props: ModalLoginProps) {
  const [variant, setVariant] = useState('signIn');

  const changeVariant = useCallback(() => {
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

  async function loginCliente(e: any) {
    cliente.service = e.target.name;
    const res = router.apiPost(cliente, 'cliente');
    let data;

    res.then((value) => {
      data = value.result;
      setShowErroLogin(false);
      props.onSubmit();
      login(data);
    });

    setShowErroLogin(true);
  }

  async function cadastroCliente(e: any) {
    cliente.service = e.target.name;
    const res = router.apiPost(cliente, 'cliente');
    let data;

    res.then((value) => {
      data = value.result;
      if (data) {
        cliente.service = 'loginCliente';
        const res = router.apiPost(cliente, 'cliente');
        let data;

        res.then((value) => {
          data = value.result;
          props.onSubmit();
          login(data);
        });
      }
    });
  }

  return (
    <>
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
        <button
          name={variant === 'signIn' ? 'loginCliente' : 'cadastroCliente'}
          onClick={variant === 'signIn' ? loginCliente : cadastroCliente}
          className={style.loginButton}
        >
          {variant === 'signIn' ? 'Fazer Login' : 'Cadastre-se'}
        </button>
        <p className={style.mensagemErro}>{showErroLogin ? 'Usuário ou senha incorreta.' : ''}</p>
        <p className={style.positionLinkButton}>
          {variant === 'signIn' ? 'Primeiro Acesso?' : 'Já Possui uma Conta?'}
          <span onClick={changeVariant} className={style.linkButton}>
            {variant === 'signIn' ? 'Criar Conta' : 'Fazer Login'}
          </span>
        </p>
      </div>
    </>
  );
}
