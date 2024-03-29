/**
Componente NavbarCliente.
Este componente exibe a barra de navegação personalizada para os usuários logados com perfil de cliente.
O componente exibe o logo da empresa TicketSky à esquerda, um menu de ícones no lado direito e oferece funcionalidades como "Meu Perfil", 
"Meu Cartão", "Meus Ingressos" e "Sair".
O componente utiliza o contexto AuthContext para verificar se o usuário está logado e para realizar o logout.
O componente também utiliza os componentes Modal, ModalLogin, ModalMeuPerfil e ModalMeuCartao para exibir modais de login, 
perfil e cartão do cliente.
*/

import Navbar from '@/components/Navbar';
import { AuthContext } from '@/contexts/AuthContext';
import style from '@/styles/cliente/navbarCliente.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useContext, useState } from 'react';
import { HiOutlineLogout } from 'react-icons/hi';
import IconMenuButton from '../IconMenuButton';
import Modal from '../Modal';
import ModalLogin from './ModalLogin';
import ModalMeuCartao from './ModalMeuCartao';
import ModalMeuPerfil from './ModalMeuPerfil';

/**
 * Componente de barra de navegação para usuários do tipo "cliente".
 */
export default function NavbarCliente() {
  const { user, isLogged, logout } = useContext(AuthContext);
  const [openModalLogin, setOpenModalLogin] = useState(false);
  const [openModalMeuPerfil, setOpenModalMeuPerfil] = useState(false);
  const [openModalMeuCartao, setOpenModalMeuCartao] = useState(false);

  return (
    <>
      {isLogged && user.role == 'cliente' ? (
        <Navbar
          backgroundColor="white"
          leftComponent={
            <Link href="/">
              <Image src="/images/logo-navbar.png" alt="TicketSky - Logo" height="120" width="120" />
            </Link>
          }
          centerComponent={<div></div>}
          rightComponent={
            <IconMenuButton color="#0013a6">
              <li onClick={() => setOpenModalMeuPerfil(true)}>Meu Perfil</li>
              <li onClick={() => setOpenModalMeuCartao(true)}>Meu Cartão</li>
              <li>
                <Link href="/cliente/meusIngressos">Meus Ingressos</Link>
              </li>
              <li onClick={logout}>
                <div>
                  Sair
                  <HiOutlineLogout />
                </div>
              </li>
            </IconMenuButton>
          }
        />
      ) : (
        <Navbar
          backgroundColor="#fff"
          leftComponent={
            <Link href="/">
              <Image src="/images/logo-navbar.png" alt="TicketSky - Logo" height="120" width="120" />
            </Link>
          }
          centerComponent={<div></div>}
          rightComponent={
            <div className={style.buttonContainer}>
              <Link className={style.lightButton} href="/promoter/login">
                Área do promoter
              </Link>
              <button className={style.blueButton} onClick={() => setOpenModalLogin(true)}>
                Fazer Login
              </button>
            </div>
          }
        />
      )}
      <Modal isOpen={openModalLogin} onClose={() => setOpenModalLogin(false)}>
        <ModalLogin onSubmit={() => setOpenModalLogin(false)} />
      </Modal>
      <Modal isOpen={openModalMeuPerfil} onClose={() => setOpenModalMeuPerfil(false)}>
        <ModalMeuPerfil />
      </Modal>
      <Modal isOpen={openModalMeuCartao} onClose={() => setOpenModalMeuCartao(false)}>
        <ModalMeuCartao />
      </Modal>
    </>
  );
}
