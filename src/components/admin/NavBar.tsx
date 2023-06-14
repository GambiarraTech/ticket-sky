/**
Componente NavBar.
Este componente representa a barra de navegação do administrador.
*/

import { AuthContext } from '@/contexts/AuthContext';
import styles from '@/styles/admin/NavBar.module.css';
import Link from 'next/link';
import { useContext } from 'react';
import { FaHome, FaUserCircle } from 'react-icons/fa';
import { IoLogOutOutline } from 'react-icons/io5';
export default function NavBar() {
  const { user, logout } = useContext(AuthContext);
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
          <button className="ml-2.5">
            <FaUserCircle size="35" className={styles.icon} />
          </button>
          <button className="ml-2.5">
            <IoLogOutOutline size="35" onClick={logout} className={styles.icon} />
          </button>
        </div>
      </div>
      <div className={styles.hr}>
        <hr />
      </div>
    </>
  );
}
