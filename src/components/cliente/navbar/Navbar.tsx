import Link from 'next/link';
import { useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { FaUserCircle } from 'react-icons/fa';
import { IoNotificationsSharp } from 'react-icons/io5';
import style from '../../../styles/cliente/navbar.module.css';

import LoginModal from '../login/LoginModal';
import MenuDropDown from '../menu/menu';
import LogoNavbar from './LogoNavbar';

interface NavbarClienteProps {
  Logado: boolean;
}

export default function NavbarCliente({ Logado }: NavbarClienteProps) {
  const [showModal, setShowModal] = useState(false);
  const [showModalMenu, setShowModalMenu] = useState(false);

  const handleClick = () => {
    setShowModal(!showModal);
  };

  const whenClick = () => {
    setShowModalMenu(!showModalMenu);
  };

  return (
    <header aria-label="NavbarCliente" className={style.header}>
      <div className={style.navbar}>
        <Link href="http://localhost:3000/cliente">
          <LogoNavbar />
        </Link>
        <nav className={style.centerNav}>
          <div className={style.searchIconPosition}>
            <span className={style.searchBar}>
              <BiSearch className={style.colorIcon} />
            </span>
            <input className={style.input} placeholder="Pesquisar" type="text" />
          </div>
        </nav>
        {Logado ? (
          <>
            <div className={style.position} />
            <button className={style.positionIcons}>
              <IoNotificationsSharp size="28" className={style.colorIcon} />
            </button>
            <button onClick={whenClick} className={style.positionIcons}>
              <FaUserCircle size="28" className={style.colorIcon} />
              <MenuDropDown showModalMenu={showModalMenu} whenClick={whenClick} />
            </button>
          </>
        ) : (
          <>
            <Link href="http://localhost:3000/promoter/acessopromoter">
              <button className={style.lightbutton}>Torne-se Promoter</button>
            </Link>
            <button onClick={handleClick} className={style.bluebutton}>
              Fazer Login
            </button>
            <LoginModal showModal={showModal} handleClick={handleClick} />
          </>
        )}
      </div>
    </header>
  );
}
