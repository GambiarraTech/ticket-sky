import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { IoNotificationsSharp } from 'react-icons/io5';
import style from '../../styles/promoter/navbar.module.css';
import Menu from './Menu';

export default function NavBar({ children }: any) {
  const [showmenu, setshowmenu] = useState(false);
  const whenclick = () => {
    setshowmenu(!showmenu);
  };
  return (
    <header aria-label="NavbarPromoter" className={style.header}>
      <div className={style.navbar}>
        <nav className={style.title}>
          <div className={style.logo}>
            <Link href="/promoter">
              <Image src="/images/logo-navbar-white.png" alt="TicketSky - Logo" height="120" width="120" />
            </Link>
          </div>
          <div>
            <h1>Promoter</h1>
          </div>
          <div className={style.buttons}>
            <button className={style.buttonNotification}>
              <IoNotificationsSharp size="18" />
            </button>
            <button className={style.buttonMenu} onClick={whenclick}>
              <FaUserCircle size="32" />
            </button>
          </div>
        </nav>
      </div>
      <Menu showmenu={showmenu} whenclick={whenclick} />
      {children}
    </header>
  );
}
