/**
Componente ModalMeuPerfil.
Este componente exibe um modal contendo o perfil do usuário logado.
O componente utiliza o contexto AuthContext para acessar as informações do usuário.
O usuário pode editar seu perfil, como nome, sobrenome e CPF.
O usuário também pode alterar sua senha ao clicar no botão "Alterar Senha".
As alterações feitas no perfil são salvas ao clicar no botão "Salvar Alterações".
*/

import { AuthContext } from '@/contexts/AuthContext';
import * as router from '@/pages/api/router';
import styles from '@/styles/cliente/meuPerfil.module.css';
import { useContext, useEffect, useState } from 'react';
import Modal from '../Modal';
import ModalAlteraSenha from './ModalAlteraSenha';

/**
 * Componente para exibir e editar o perfil do usuário logado.
 */
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

  /**
   * Função para editar o perfil do cliente.
   */
  async function editarCliente(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
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
        <form onSubmit={editarCliente}>
          <div className={styles.title}>
            <h1>Meu Perfil</h1>
          </div>
          <label>Email</label>
          <input
            type="email"
            readOnly
            maxLength={30}
            defaultValue={cliente.email}
            onChange={(e) => (cliente.email = e.target.value)}
            required
          />
          <label>Nome</label>
          <input
            type="text"
            defaultValue={cliente.nome}
            maxLength={30}
            required
            onChange={(e) => (cliente.nome = e.target.value)}
          />
          <label>Sobrenome</label>
          <input
            type="text"
            defaultValue={cliente.sobrenome}
            maxLength={20}
            onChange={(e) => (cliente.sobrenome = e.target.value)}
            required
          />
          <label>CPF</label>
          <input
            type="text"
            defaultValue={cliente.cpf}
            maxLength={11}
            minLength={11}
            pattern="[0-9]*"
            inputMode="numeric"
            onChange={(e) => (cliente.cpf = e.target.value)}
          />
          <div className={styles.buttonsContainer}>
            <button type="button" className={styles.buttonAlterarSenha} onClick={() => setOpenModalAltSenha(true)}>
              Alterar Senha
            </button>
            <button type="submit" className={styles.buttonSalvar}>
              Salvar Alterações
            </button>
          </div>
        </form>
        <Modal isOpen={openModalAltSenha} onClose={() => setOpenModalAltSenha(false)}>
          <ModalAlteraSenha onSubmit={() => setOpenModalAltSenha(false)} />
        </Modal>
      </div>
    </>
  );
}
