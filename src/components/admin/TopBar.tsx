import Image from 'next/image';

import styles from '@/styles/admin/TopBar.module.css';

export default function TopBar() {
  return (
    <>
      <nav className={styles.TopBar}>
        <a href="" className={styles.logo}>
          <Image src="/images/logo-ticket-sky-light.png" width="200" height="200" alt="logo"></Image>
        </a>
      </nav>
    </>
  );
}
