import styles from '@/styles/admin/NavBar.module.css';
import Link from 'next/link';
import { FaHome, FaUserCircle } from 'react-icons/fa';
import { IoNotificationsSharp } from 'react-icons/io5';
export default function NavBar() {
  return (
    <>
      <div className={styles.navBar}>
        <div className={styles.buttons}>
          <Link href="/admin">
            <FaHome size="30" className={styles.icon} />
          </Link>
        </div>
        <h1>Administrador</h1>
        <div className={styles.buttons}>
          <button className="mr-2.5">
            <IoNotificationsSharp size="20" className={styles.icon} />
          </button>
          <button className="ml-2.5">
            <FaUserCircle size="35" className={styles.icon} />
          </button>
        </div>
      </div>
      <div className={styles.hr}>
        <hr />
      </div>
    </>
  );
}
