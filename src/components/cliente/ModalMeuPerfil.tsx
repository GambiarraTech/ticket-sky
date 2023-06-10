import { AuthContext } from '@/contexts/AuthContext';
import * as router from '@/pages/api/router';
import styles from '@/styles/cliente/MeuPerfil.module.css';
import { useContext, useState } from 'react';
import Modal from '../Modal';
import ModalAlteraSenha from './ModalAlteraSenha';

export default function MeuPerfil() {
  const { user } = useContext(AuthContext);
  const [openModalAltSenha, setOpenModalAltSenha] = useState(false);

  const [cliente, setCliente] = useState({
    id: user.id,
    nome: user.nome,
    sobrenome: user.sobrenome,
    email: user.email,
    cpf: user.cpf,
    service: "editarCliente"
  });
  
  async function editaCliente() {
    const res = await router.apiPost(cliente, 'cliente');
    alert(res.result);
  }

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
              defaultValue={user.nome}
              type="text"
              onChange={(e) => (cliente.nome = e.target.value)}
            />
          </div>
          <div className={styles.row}>
            <label className={styles.label} htmlFor="Email">
              E-mail:
            </label>
            <input
              className={styles.input}
              defaultValue={user.email}
              type="text"
              onChange={(e) => (cliente.email = e.target.value)}
            />
          </div>
        </div>
        <div className={styles.inputPositionRight}>
            <div className={styles.row}>
              <label className={styles.label} htmlFor="Sobrenome">
                Sobrenome:
              </label>
              <input
                className={styles.input}
                defaultValue={user.sobrenome}
                type="text"
                onChange={(e) => (cliente.sobrenome = e.target.value)}
              />
            </div>
          
            <div className={styles.row}>
              <label className={styles.label} htmlFor="CPF">
                CPF:
              </label>
              <input
                className={styles.input}
                defaultValue={user.cpf}
                type="text"
                maxLength={11}
                onChange={(e) => (cliente.cpf = e.target.value)}
              />
            </div>
          <div>
            <div className={styles.row}>
              <button className={styles.salvarAlt} onClick={editaCliente}>Salvar Alterações</button>
              <a className={styles.cancelar}>Cancelar</a>
              <button className={styles.salvarAlt} onClick={() => setOpenModalAltSenha(true)}>Alterar Senha</button>
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={openModalAltSenha} onClose={() => setOpenModalAltSenha(false)}>
        <ModalAlteraSenha onSubmit={() => setOpenModalAltSenha(false)} />
      </Modal>
    </>
  );
}
