import { AuthContext } from '@/contexts/AuthContext';
import style from '@/styles/cliente/login.module.css';
import styles from '@/styles/cliente/meuPerfil.module.css';
import { useContext, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { useContext, useState } from 'react';
import { IoClose } from 'react-icons/io5';

interface MeuPerfilProps {
  handleClick: (modal: JSX.Element) => void;
  handleClose: () => void;
}

export default function MeuPerfil({ handleClick, handleClose }: MeuPerfilProps) {
  const { user } = useContext(AuthContext);
  const [cliente, setCliente] = useState({
    nome: '',
    sobrenome: '',
    cpf: '',
    email: '',
    senha: '',
    alterPassword: '',
  });

  return (
    <>
      <div className={styles.modal}>
        <div onClick={handleClose} className={styles.bgBlur} aria-hidden="true"></div>
        <div className={styles.modalBg}>
          <div className={styles.head}>
            <FaUserCircle size={68} className={styles.icone} />
            <h1 className={styles.meuperfil}>Meu Perfil</h1>
            <div className={styles.closeButtonPosition}>
              {/* Botão de fechar */}
              <button onClick={handleClose} className={styles.closeButton}>
                <span className={style.hideFechar}>Fechar</span>
                <IoClose />
              </button>
            </div>
          </div>
          <form onSubmit={handleClose}>
            <div className={styles.inputPosition}>
              <div className={styles.inputPositionLeft}>
                <label className={styles.label} htmlFor="Nome">
                  Nome:
                </label>
                <input className={styles.input} type="text" onChange={(e) => (cliente.nome = e.target.value)} />
                <label className={styles.label} htmlFor="Sobrenome">
                  Sobrenome:
                </label>
                <input className={styles.input} type="text" onChange={(e) => (cliente.sobrenome = e.target.value)} />
                <label className={styles.label} htmlFor="Email">
                  E-mail:
                </label>
                <input className={styles.input} type="email" onChange={(e) => (cliente.email = e.target.value)} />
                <label className={styles.label} htmlFor="CPF">
                  CPF:
                </label>
                <input className={styles.input} type="text" onChange={(e) => (cliente.cpf = e.target.value)} />
              </div>
              <div className={styles.inputPositionRight}>
                <label className={styles.label} htmlFor="AlterarSenha">
                  Alterar Senha:
                </label>
                <input
                  className={styles.input}
                  type="alterPassword"
                  onChange={(e) => (cliente.alterPassword = e.target.value)}
            <div className="">
              <div className={style.inputPosition}>
                <input
                  className={style.inputSignUp}
                  placeholder={user?.nome}
                  type="text"
                  onChange={(e) => (cliente.nome = e.target.value)}
                />
                <input
                  className={style.inputSignUp}
                  placeholder={user?.sobrenome}
                  type="text"
                  onChange={(e) => (cliente.sobrenome = e.target.value)}
                />
                <label className={styles.label} htmlFor="Senha">
                  Senha:
                </label>
                <input className={styles.input} type="password" onChange={(e) => (cliente.senha = e.target.value)} />
                <button className={styles.salvarAlt}>Salvar Alterações</button>
                <button className={styles.cancelar}>Cancelar</button>
              </div>
              <input
                className={style.inputSignUp}
                placeholder={user?.cpf}
                type="text"
                onChange={(e) => (cliente.cpf = e.target.value)}
              />
              <input
                className={style.inputSignUp}
                placeholder={user?.email}
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
