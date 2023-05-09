import style from '@/styles/cliente/login.module.css';
import { useCallback, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import * as router from '../../../pages/api/router';
import LogoModal from './LogoModal';

interface LoginModalProps {
  showModal: boolean;
  handleClick: () => void;
}

export default function LoginModal({ showModal, handleClick }: LoginModalProps) {
  const [variant, setVariant] = useState('signIn');
  const [logado, setLogado] = useState(false);

  const changeVariant = useCallback(() => {
    setVariant((currentvariant) => (currentvariant === 'signIn' ? 'signUp' : 'signIn'));
  }, []);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleClick();
  };

  const handleLogado = () => {
    setLogado(true);
  };

  const [cliente, setCliente] = useState({
    nome: '',
    sobrenome: '',
    email: '',
    senha: '',
  });

  return (
    <>
      {showModal && (
        <div className={style.modal}>
          <div onClick={handleClick} className={style.bgBlur} aria-hidden="true"></div>
          <div className={style.modal}>
            <div className={style.modalBg}>
              <div className={style.closeButtonPosition}>
                <button onClick={handleClick} className={style.closeButton}>
                  <span className={style.hideFechar}>Fechar</span>
                  <IoClose />
                </button>
              </div>
              <div className={style.centerText}>
                <h3 className={style.centerLogo}>
                  <LogoModal />
                </h3>
                <h4 className={style.title}>{variant === 'signIn' ? 'Faça Login' : 'Faça seu Cadastro'}</h4>
                <p className={style.description}>Bem-vindo ao TicketSky, preencha os campos abaixo para continuar.</p>
                <form onSubmit={handleLogin}>
                  <div className="">
                    {variant === 'signUp' && (
                      <div className={style.inputPosition}>
                        <input
                          className={style.inputSignUp}
                          placeholder="Nome"
                          type="text"
                          onChange={(e) => (cliente.nome = e.target.value)}
                        />
                        <input
                          className={style.inputSignUp}
                          placeholder="Sobrenome"
                          type="text"
                          onChange={(e) => (cliente.sobrenome = e.target.value)}
                        />
                      </div>
                    )}
                    <input
                      className={style.inputSignUp}
                      placeholder="E-mail"
                      type="email"
                      onChange={(e) => (cliente.email = e.target.value)}
                    />
                  </div>
                  <div className="">
                    <input
                      className={style.inputSignUp}
                      placeholder="Senha"
                      type="password"
                      onChange={(e) => (cliente.senha = e.target.value)}
                    />
                  </div>
                  <button
                    onSubmit={handleLogado}
                    onClick={() => router.apiPost(cliente, 'cadastroCliente')}
                    className={style.loginButton}
                  >
                    {variant === 'signIn' ? 'Fazer Login' : 'Cadastre-se'}
                  </button>
                  <p className={style.positionLinkButton}>
                    {variant === 'signIn' ? 'Primeiro Acesso?' : 'Já Possui uma Conta?'}
                    <span onClick={changeVariant} className={style.linkButton}>
                      {variant === 'signIn' ? 'Criar Conta' : 'Fazer Login'}
                    </span>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
