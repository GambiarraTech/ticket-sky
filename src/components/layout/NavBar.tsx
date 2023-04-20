import Image from 'next/image';

import styles from '@/styles/layout/NavBar.module.css';

export default function NavBar() {
  return (
    <nav className={styles.navBar}>
      <div>
        <a href="">
          <Image src="/images/logo-ticket-sky-light.png" width="150" height="150" alt="logo"></Image>
        </a>
      </div>
      <div className={styles.navList}>
        <ul>
          <li>Cadatro</li>
          <li>Login</li>
        </ul>
      </div>
    </nav>
  );
}
