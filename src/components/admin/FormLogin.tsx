import { AuthContext } from '@/contexts/AuthContext';
import styles from '@/styles/admin/formLogin.module.css';
import { useContext, useState } from 'react';
import * as router from '../../pages/api/router';

export default function FormLogin() {
  const [admin] = useState({
    email: '',
    senha: '',
    service: '',
  });

  const { login } = useContext(AuthContext);
  const [showErro, setShowErro] = useState(false);

  async function loginAdmin(e: any) {
    admin.service = e.target.name;
    const res = router.apiPost(admin, 'admin');
    let data;
    res.then((value) => {
      data = value.result;
      login(data);
    });

    if(!data){
        setShowErro(true)
    }
  }




  return (
    <div className={styles.cardLogin}>
      <label>Digite seu email:</label>
      <input type="email" onChange={(e) => (admin.email = e.target.value)} />

      <label>Digite sua senha:</label>
      <input type="password" onChange={(e) => (admin.senha = e.target.value)} />
      <a href="">Esqueceu sua senha?</a>
      <p className={styles.mensagemErro}>{showErro ? "Usuario ou senha incorreta!":""}</p>
      <button name="loginAdmin" onClick={loginAdmin}>
        Entrar
      </button>
    </div>
  );
}
