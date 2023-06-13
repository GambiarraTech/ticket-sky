import { AuthContext } from '@/contexts/AuthContext';
import * as router from '@/pages/api/router';
import styles from '@/styles/cliente/meuPerfil.module.css';
import { useContext, useEffect, useState } from 'react';
import Modal from '../Modal';
import ModalAlteraSenha from './ModalAlteraSenha';

/**
 * Componente para exibir o perfil do usuário logado.
 */
export default function MeuPerfil() {
  const { user } = useContext(AuthContext);
  const [openModalAltSenha, setOpenModalAltSenha] = useState(false);

  /**
   * Estado para armazenar os dados do promoter.
   */
  const [promoter, setPromoter] = useState({
    id: '',
    nome: '',
    email: '',
    cpf_cnpj: '',
    service: 'editarPromoter',
  });

  /**
   * Função assíncrona para editar o promoter.
   */
  async function editarPromoter() {
    promoter.service = 'editarPromoter';
    const res = await router.apiPost(promoter, 'promoter');
    alert(res.result);
  }

  /**
   * Efeito colateral para carregar os dados do perfil do promoter.
   */
  useEffect(() => {
    router.apiPost({ service: 'getPerfil', id: user.id }, 'promoter').then((value) => {
      if (value.result != null) {
        setPromoter(value.result);
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
          defaultValue={promoter.email}
          onChange={(e) => (promoter.email = e.target.value)}
          required
        />
        <label>Nome</label>
        <input type="text" defaultValue={promoter.nome} onChange={(e) => (promoter.nome = e.target.value)} required />
        <label>CPF/CNPJ</label>
        <input
          type="text"
          defaultValue={promoter.cpf_cnpj}
          onChange={(e) => (promoter.cpf_cnpj = e.target.value)}
          readOnly
        />
        <div className={styles.buttonsContainer}>
          <button className={styles.buttonAlterarSenha} onClick={() => setOpenModalAltSenha(true)}>
            Alterar Senha
          </button>
          <button className={styles.buttonSalvar} onClick={editarPromoter}>
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
