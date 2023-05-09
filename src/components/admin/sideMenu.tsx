import styles from '@/styles/admin/sideMenu.module.css';
import Link from 'next/link';
import { FaFolderOpen, FaTicketAlt, FaUserTie, FaUsers } from 'react-icons/fa';
export default function SideMenu({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className={styles.sideMenu}>
        <div className={styles.logo}>
          <img src="../images/logo-ticket-sky-light.png" />
        </div>
        <hr className={styles.hr} />

        <div className={styles.optionsList}>
          <div className={styles.optionsItem}>
            <Link href="/admin/administradores">
              <FaUserTie className={styles.icon} />
              Administradores
            </Link>
          </div>

          <div className={styles.optionsItem}>
            <Link href="/admin/promoters">
              <FaUsers className={styles.icon} />
              Promoters
            </Link>
          </div>

          <div className={styles.optionsItem}>
            <Link href="/admin/eventos">
              <FaTicketAlt className={styles.icon} />
              Eventos
            </Link>
          </div>

          <div className={styles.optionsItem}>
            <Link href="/admin/relatorios">
              <FaFolderOpen className={styles.icon} />
              Relatórios
            </Link>
          </div>
        </div>
        <hr className={styles.hr} />
      </div>

      <div className={styles.children}>{children}</div>
    </>
  );
}
