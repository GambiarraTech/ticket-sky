import style from '@/styles/cliente/login.module.css';
import { useState } from 'react';
import { IoClose } from 'react-icons/io5';

interface MeuPerfilProps {
  handleClick: (modal: JSX.Element) => void;
  handleClose: () => void;
}

export default function MeuPerfil({ handleClick, handleClose }: MeuPerfilProps) {
  const [cliente, setCliente] = useState({
    nome: '',
    sobrenome: '',
    email: '',
    senha: '',
    alterPassword: '',
    cpf: '',
  });

  return (
    <>
      <div className={style.modal}>
        <div onClick={handleClose} className={style.bgBlur} aria-hidden="true"></div>
        <div className={style.modalBg}>
          <div className={style.closeButtonPosition}>
            {/* Botão de fechar */}
            <button onClick={handleClose} className={style.closeButton}>
              <span className={style.hideFechar}>Fechar</span>
              <IoClose />
            </button>
          </div>
          <h1>Meu perfil</h1>
          <form onSubmit={handleClose}>
            <div className="">
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
              <input
                className={style.inputSignUp}
                placeholder="CPF"
                type="text"
                onChange={(e) => (cliente.cpf = e.target.value)}
              />
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
                placeholder="Alterar Senha"
                type="alterPassword"
                onChange={(e) => (cliente.alterPassword = e.target.value)}
              />
              <input
                className={style.inputSignUp}
                placeholder="Senha"
                type="password"
                onChange={(e) => (cliente.senha = e.target.value)}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
