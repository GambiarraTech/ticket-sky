import { AuthContext } from '@/contexts/AuthContext';
import * as router from '@/pages/api/router';
import styles from '@/styles/cliente/meuPerfil.module.css';
import { useContext, useState } from 'react';
import Modal from '../Modal';
import ModalAlteraSenha from './ModalAlteraSenha';

export default function ModalMeuPerfil() {
  const { user } = useContext(AuthContext);

  const [openModalAltSenha, setOpenModalAltSenha] = useState(false);

  const [cliente] = useState({
    id: user.id,
    nome: user.nome,
    sobrenome: user.sobrenome,
    email: user.email,
    cpf: user.cpf,
    service: 'editarCliente',
  });

  async function editarCliente() {
    const res = await router.apiPost(cliente, 'cliente');
    alert(res.result);
  }

  return (
    <>
      <div className={styles.container}>
        <label>Nome:</label>
        <input type="text" defaultValue={cliente.nome} onChange={(e) => (cliente.nome = e.target.value)} />
        <label>Sobrenome:</label>
        <input type="text" defaultValue={cliente.sobrenome} onChange={(e) => (cliente.sobrenome = e.target.value)} />
        <label>Email:</label>
        <input type="email" defaultValue={cliente.email} onChange={(e) => (cliente.email = e.target.value)} />
        <label>CPF:</label>
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
