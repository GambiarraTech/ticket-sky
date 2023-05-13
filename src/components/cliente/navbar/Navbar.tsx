import { AuthContext } from '@/contexts/AuthContext';
import Image from 'next/image';
import Link from 'next/link';
import { useContext, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';
import { IoNotificationsSharp } from 'react-icons/io5';
import style from '../../../styles/cliente/navbar.module.css';
import LoginModal from '../login/LoginModal';
import MenuDropDown from '../menu/menu';

export default function NavbarCliente({ children }: any) {
  const [showModal, setShowModal] = useState(false);
  const [showModalMenu, setShowModalMenu] = useState(false);
  const { user, isLogged } = useContext(AuthContext);

  const handleClick = () => {
    setShowModal(!showModal);
  };

  const whenClick = () => {
    setShowModalMenu(!showModalMenu);
  };

  return (
    <header aria-label="NavbarCliente" className={style.header}>
      <nav className={style.navbarFormat}>
        <div className={style.navbarDiv}>
          <Link href="/">
            <Image src="/images/logo-navbar.png" alt="TicketSky - Logo" height="120" width="120" />
          </Link>
        </div>
        <div className={style.searchBarFormat}>
          <div className={style.searchStyle1}>
            <span>
              <FiSearch className={style.searchIcon} />
            </span>
            <input className={style.searchStyle2} type="text" placeholder="Pesquisar" />
          </div>
        </div>
        {isLogged ? (
          <>
            <div className={style.position} />
            <button className={style.positionIcons}>
              <IoNotificationsSharp size="18" className={style.colorIcon} />
            </button>
            <button onClick={whenClick} className={style.positionIcons}>
              <FaUserCircle size="32" className={style.colorIcon} />
              <MenuDropDown showModalMenu={showModalMenu} whenClick={whenClick} />
            </button>
          </>
        ) : (
          <>
            <div className={style.buttonDiv}>
              <Link href="http://localhost:3000/promoter/cadastro">
                <button className={style.promoterButton}>Acesso Promoter</button>
              </Link>
              <button onClick={handleClick} className={style.clienteButton}>
                Fazer Login
              </button>
            </div>
          </>
        )}
      </nav>
      <LoginModal showModal={showModal} handleClick={handleClick} />
      {children}
    </header>
  );
}
