import styles from '@/styles/admin/titleLogin.module.css';
import Image from 'next/image';

export default function TitleLogin() {
  return (
    <div className={styles.titleBox}>
      <Image src="/images/logo-ticket-sky-light-cropped.png" width="200" height="200" alt="logo"></Image>
      <p>Login de Administador</p>
    </div>
  );
}
