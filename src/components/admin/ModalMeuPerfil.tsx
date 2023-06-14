import { AuthContext } from '@/contexts/AuthContext';
import * as router from '@/pages/api/router';
import styles from '@/styles/cliente/meuPerfil.module.css';
import { useContext, useEffect, useState } from 'react';

export default function MeuPerfil() {
  const { user } = useContext(AuthContext);
  const [admin, setAdmin] = useState({
    id: '',
    nome: '',
    sobrenome: '',
    email: '',
    service: 'editarPromoter',
  });

  async function editarAdmin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    admin.service = 'editarAdmin';
    const res = await router.apiPost(admin, 'admin');
    alert(res.result);
  }

  useEffect(() => {
    router.apiPost({ service: 'getPerfil', email: user.email }, 'admin').then((value) => {
      if (value.result != null) {
        setAdmin(value.result);
      }
    });
  }, []);

  return (
    <>
      <>
        <div className={styles.container}>
          <form onSubmit={editarAdmin}>
            <div className={styles.title}>
              <h1>Meu Perfil</h1>
            </div>
            <label>Email</label>
            <input
              type="email"
              readOnly
              maxLength={30}
              defaultValue={admin.email}
              onChange={(e) => (admin.email = e.target.value)}
              required
            />
            <label>Nome</label>
            <input
              type="text"
              defaultValue={admin.nome}
              maxLength={30}
              required
              onChange={(e) => (admin.nome = e.target.value)}
            />
            <label>Sobrenome</label>
            <input
              type="text"
              defaultValue={admin.sobrenome}
              maxLength={20}
              onChange={(e) => (admin.sobrenome = e.target.value)}
              required
            />
            <div className={styles.buttonsContainer}>
              {/* <button type="button" className={styles.buttonAlterarSenha} onClick={() => setOpenModalAltSenha(true)}>
                Alterar Senha
              </button> */}
              <button type="submit" className={styles.buttonSalvar}>
                Salvar Alterações
              </button>
            </div>
          </form>
          {/* <Modal isOpen={openModalAltSenha} onClose={() => setOpenModalAltSenha(false)}>
          <ModalAlteraSenha onSubmit={() => setOpenModalAltSenha(false)} />
        </Modal> */}
        </div>
      </>
    </>
  );
}
