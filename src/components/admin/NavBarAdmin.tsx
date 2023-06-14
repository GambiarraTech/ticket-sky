import Modal from '@/components/Modal';
import { AuthContext } from '@/contexts/AuthContext';
import styles from '@/styles/admin/NavBar.module.css';
import Link from 'next/link';
import { useContext, useState } from 'react';
import { FaHome, FaUserCircle } from 'react-icons/fa';
import { IoLogOutOutline } from 'react-icons/io5';
import ModalMeuPerfil from './ModalMeuPerfil';

/**
Componente NavBarAdmin.
Este componente representa a barra de navegação do administrador.
*/
export default function NavBarAdmin() {
  const { user, logout } = useContext(AuthContext);
  const [openModalMeuPerfil, setOpenModalMeuPerfil] = useState(false);

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
          <button className="ml-2.5" onClick={() => setOpenModalMeuPerfil(true)}>
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
      <Modal isOpen={openModalMeuPerfil} onClose={() => setOpenModalMeuPerfil(false)}>
        <ModalMeuPerfil />
      </Modal>
    </>
  );
}
