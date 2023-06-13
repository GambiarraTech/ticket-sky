import { AuthContext } from '@/contexts/AuthContext';
import * as router from '@/pages/api/router';
import styles from '@/styles/cliente/meuPerfil.module.css';
import { useContext, useEffect, useState } from 'react';
import Modal from '../Modal';
import ModalAlteraSenha from './ModalAlteraSenha';

export default function MeuPerfil() {
  const { user } = useContext(AuthContext);
  const [openModalAltSenha, setOpenModalAltSenha] = useState(false);

  const [promoter, setPromoter] = useState({
    id: '',
    nome: '',
    email: '',
    cpf_cnpj: '',
    service: 'editarPromoter',
  });

  async function editarPromoter(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    promoter.service = 'editarPromoter';
    const res = await router.apiPost(promoter, 'promoter');
    alert(res.result);
  }

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
        <form onSubmit={editarPromoter}>
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
        <input type="text" defaultValue={promoter.nome} maxLength={20} onChange={(e) => (promoter.nome = e.target.value)} required />
        <label>CPF/CNPJ</label>
        <input
          type="text"
          defaultValue={promoter.cpf_cnpj}
          onChange={(e) => (promoter.cpf_cnpj = e.target.value)}
          readOnly
        />
        <div className={styles.buttonsContainer}>
          <button type='button' className={styles.buttonAlterarSenha} onClick={() => setOpenModalAltSenha(true)}>
            Alterar Senha
          </button>
          <button type='submit' className={styles.buttonSalvar} >
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
