import { AuthContext } from '@/contexts/AuthContext';
import styles from '@/styles/cliente/MeuPerfil.module.css';
import { useContext, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
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
    email: '',
    senha: '',
    alterPassword: '',
    cpf: '',
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
                <IoClose />
              </button>
            </div>
          </div>
          <form onSubmit={handleClose}>
            <div className={styles.inputPosition}>
              <div className={styles.inputPositionLeft}>
                <div className={styles.row}>
                  <label className={styles.label} htmlFor="Nome">
                    Nome:
                  </label>
                  <input
                    className={styles.input}
                    value={user.nome}
                    type="text"
                    onChange={(e) => (cliente.nome = e.target.value)}
                  />
                </div>
                <div className={styles.row}>
                  <label className={styles.label} htmlFor="Sobrenome">
                    Sobrenome:
                  </label>
                  <input
                    className={styles.input}
                    value={user.sobrenome}
                    type="text"
                    onChange={(e) => (cliente.sobrenome = e.target.value)}
                  />
                </div>
                <div className={styles.row}>
                  <label className={styles.label} htmlFor="Email">
                    E-mail:
                  </label>
                  <input
                    className={styles.input}
                    value={user.email}
                    type="email"
                    onChange={(e) => (cliente.email = e.target.value)}
                  />
                </div>
                <div className={styles.row}>
                  <label className={styles.label} htmlFor="CPF">
                    CPF:
                  </label>
                  <input
                    className={styles.input}
                    value={user.cpf}
                    type="text"
                    onChange={(e) => (cliente.cpf = e.target.value)}
                  />
                </div>
              </div>
              <div className={styles.inputPositionRight}>
                <div className={styles.row}>
                  <label className={styles.label} htmlFor="AlterarSenha">
                    Alterar Senha:
                  </label>
                  <input
                    className={styles.input}
                    type="alterPassword"
                    onChange={(e) => (cliente.alterPassword = e.target.value)}
                  />
                </div>
                <div className={styles.row}>
                  <label className={styles.label} htmlFor="Senha">
                    Senha:
                  </label>
                  <input className={styles.input} type="password" onChange={(e) => (cliente.senha = e.target.value)} />
                </div>
                <div className={styles.row}>
                  <button className={styles.salvarAlt}>Salvar Alterações</button>
                  <a className={styles.cancelar}>Cancelar</a>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
