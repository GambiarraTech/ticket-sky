import styles from '@/styles/admin/formLogin.module.css';
import { useState } from 'react';
import * as router from '../../pages/api/router';
import Admin from '@/pages/admin';
//import Mensagem from '../mensagem';




export default function FormLogin() {
  const [admin] = useState({
    email: '',
    senha: '',
    service: '',
  });

  let logado:any[];

  function loginAdmin(e: any) {
    admin.service = e.target.name;
    let res = router.apiPost(admin, 'admin');
    res.then((value)=>{
        logado = value.result
    })
    if(!logado){
        setShowErro(true)
    }
  }
  const [showErro, setShowErro] = useState(false);

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
