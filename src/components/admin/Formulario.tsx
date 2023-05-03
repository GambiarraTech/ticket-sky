import styles from '@/styles/admin/form.module.css';
import Image from 'next/image';
import { useState } from 'react';
import * as router from '../../pages/api/router';

export default function formulario() {
  const [admin] = useState({
    email: '',
    senha: '',
    service: '',
  });

  function loginAdmin(e: any) {
    admin.service = e.target.name;

    router.apiPost(admin, 'admin');
  }

  return (
    <div className={styles.container}>
      <div className={styles.titleBox}>
        <Image src="/images/logo-ticket-sky-light-cropped.png" width="200" height="200" alt="logo"></Image>

        <p>Login de Administador</p>
      </div>
      <div className={styles.formulario}>
        <div className={styles.inputGroup}>
          <label>Digite seu Email:</label>
          <input type="email" onChange={(e) => (admin.email = e.target.value)} />

          <label>Digite sua Senha:</label>
          <input type="password" onChange={(e) => (admin.senha = e.target.value)} />
          <a href="">Esqueceu sua senha?</a>
        </div>

        <button name="loginAdmin" className={styles.buttonCadastro} onClick={loginAdmin}>
          Entrar
        </button>
      </div>
    </div>
  );
}
