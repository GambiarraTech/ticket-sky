import { AuthContext } from '@/contexts/AuthContext';
import * as router from '@/pages/api/router';
import styles from '@/styles/cliente/meuPerfil.module.css';
import { useContext, useEffect, useState } from 'react';
import Modal from '../Modal';
import ModalAlteraSenha from './ModalAlteraSenha';

export default function ModalMeuPerfil() {
  const { user } = useContext(AuthContext);

  const [openModalAltSenha, setOpenModalAltSenha] = useState(false);

  const [cliente, setCliente] = useState({
    id: '',
    nome: '',
    sobrenome: '',
    email: '',
    cpf: '',
    service: '',
  });

  async function editarCliente() {
    cliente.service = 'editarCliente';
    const res = await router.apiPost(cliente, 'cliente');
    alert(res.result);
  }

  useEffect(() => {
    router.apiPost({ service: 'getPerfil', id: user.id }, 'cliente').then((value) => {
      if (value.result != null) {
        setCliente(value.result);
      }
    });
  }, []);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.title}>
          <h1>Meu Perfil</h1>
        </div>
        <label>Email</label>
        <input
          type="email"
          readOnly
          defaultValue={cliente.email}
          onChange={(e) => (cliente.email = e.target.value)}
          required
        />
        <label>Nome</label>
        <input type="text" defaultValue={cliente.nome} onChange={(e) => (cliente.nome = e.target.value)} required />
        <label>Sobrenome</label>
        <input
          type="text"
          defaultValue={cliente.sobrenome}
          onChange={(e) => (cliente.sobrenome = e.target.value)}
          required
        />
        <label>CPF</label>
        <input type="text" defaultValue={cliente.cpf} onChange={(e) => (cliente.cpf = e.target.value)} />
        <div className={styles.buttonsContainer}>
          <button className={styles.buttonAlterarSenha} onClick={() => setOpenModalAltSenha(true)}>
            Alterar Senha
          </button>
          <button className={styles.buttonSalvar} onClick={editarCliente}>
            Salvar Alterações
          </button>
        </div>
      </div>
      <Modal isOpen={openModalAltSenha} onClose={() => setOpenModalAltSenha(false)}>
        <ModalAlteraSenha onSubmit={() => setOpenModalAltSenha(false)} />
      </Modal>
    </>
  );
}
