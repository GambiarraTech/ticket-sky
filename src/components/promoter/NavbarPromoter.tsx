import IconMenuButton from '@/components/IconMenuButton';
import Modal from '@/components/Modal';
import Navbar from '@/components/Navbar';
import ModalMeuPerfil from '@/components/promoter/ModalMeuPerfil';
import { AuthContext } from '@/contexts/AuthContext';
import { getServerSideProps } from '@/lib/auth';
import Image from 'next/image';
import Link from 'next/link';
import { useContext, useState } from 'react';

export default function NavbarPromoter() {
  const { user, isLogged, logout } = useContext(AuthContext);
  const [openModalMeuPerfil, setOpenModalMeuPerfil] = useState(false);
  return (
    <>
      <Navbar
        backgroundColor="#000D67"
        leftComponent={<Image src="/images/logo-navbar-white.png" alt="TicketSky - Logo" height="120" width="120" />}
        centerComponent={<div></div>}
        rightComponent={
          <IconMenuButton color="#fff">
            <li onClick={() => setOpenModalMeuPerfil(true)}>Meu Perfil</li>
            <li>
              <Link href="/promoter/criarEvento">Criar Eventos</Link>
            </li>
            <li>
              <Link href="/promoter">Meus Eventos</Link>
            </li>
            <li onClick={logout}>Logout</li>
          </IconMenuButton>
        }
      />
      <Modal isOpen={openModalMeuPerfil} onClose={() => setOpenModalMeuPerfil(false)}>
        <ModalMeuPerfil />
      </Modal>
    </>
  );
}

export { getServerSideProps };