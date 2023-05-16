import { AuthContext } from '@/contexts/AuthContext';
import Image from 'next/image';
import Link from 'next/link';
import { useContext, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { FaUserCircle } from 'react-icons/fa';
import { IoNotificationsSharp } from 'react-icons/io5';
import style from '../../../styles/cliente/navbar.module.css';
import LoginModal from '../login/LoginModal';
import MenuDropDown from '../menu/menu';

interface NavbarClienteProps {
  Logado: boolean;
}

export default function NavbarCliente() {
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
    <div className={style.navbar}>
      <Link className={style.image} href="/">
        <Image src="/images/logo-navbar.png" alt="TicketSky - Logo" height="120" width="120" />
      </Link>
      <nav>
        <div className={style.searchIconPosition}>
          <span className={style.searchBar}>
            <BiSearch className={style.colorIcon} />
          </span>
          <input className={style.input} placeholder="Pesquisar" type="text" />
        </div>
      </nav>
      {isLogged && user.role == 'cliente' ? (
        <div className={style.options}>
          <button className={style.positionIcons}>
            <IoNotificationsSharp size="28" className={style.colorIcon} />
          </button>
          <button onClick={whenClick} className={style.positionIcons}>
            <FaUserCircle size="28" className={style.colorIcon} />
            <MenuDropDown showModalMenu={showModalMenu} whenClick={whenClick} />
          </button>
        </div>
      ) : (
        <div className={style.options}>
          <Link className={style.lightbutton} href="/promoter/login">
            Área do promoter
          </Link>
          <button onClick={handleClick} className={style.bluebutton}>
            Fazer Login
          </button>
          <LoginModal showModal={showModal} handleClick={handleClick} />
        </div>
      )}
    </div>
  );
}
