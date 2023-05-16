import styles from '@/styles/admin/sideMenu.module.css';
import Link from 'next/link';
import { FaFolderOpen, FaTicketAlt, FaUserTie, FaUsers } from 'react-icons/fa';
export default function SideMenu({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className={styles.sideMenu}>
        <div className={styles.logo}>
          <Link href="/admin">
            <img src="../images/logo-ticket-sky-light.png" />
          </Link>
        </div>
        <hr className={styles.hr} />

        <div className={styles.optionsList}>
          <div className={styles.optionsItem}>
            <a href="">
              <FaUserTie className={styles.icon} />
              Administradores
            </a>
          </div>

          <div className={styles.optionsItem}>
            <a href="">
              <FaUsers className={styles.icon} />
              Promoters
            </a>
          </div>

          <div className={styles.optionsItem}>
            <a href="">
              <FaTicketAlt className={styles.icon} />
              Eventos
            </a>
          </div>

          <div className={styles.optionsItem}>
            <a href="">
              <FaFolderOpen className={styles.icon} />
              Relatórios
            </a>
          </div>
        </div>
        <hr className={styles.hr} />
      </div>

      <div className={styles.children}>{children}</div>
    </>
  );
}
