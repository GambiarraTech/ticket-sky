import { AuthContext } from '@/contexts/AuthContext';
import styles from '@/styles/cliente/MeuPerfil.module.css';
import { useContext, useState } from 'react';

export default function MeuPerfil() {
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
    </>
  );
}
