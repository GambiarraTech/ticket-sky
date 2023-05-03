import style from '@/styles/promoter/navbar.module.css';
import Link from 'next/link';
import { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { IoNotificationsSharp } from 'react-icons/io5';
import { Menu } from '../menu/menu';
import LogoNavbarPromoter from './LogoNavBar';

export const Navbar = () => {
  const [showmenu, setshowmenu] = useState(false);
  const whenclick = () => {
    setshowmenu(!showmenu);
  };
  return (
    <header aria-label="NavbarPromoter" className={style.header}>
      <div className={style.navbar}>
        <Link href="">
          <LogoNavbarPromoter />
        </Link>
        <nav className={style.title}>Promoter</nav>
        <button className="mr-2.5">
          <IoNotificationsSharp size="18" className="text-white" />
        </button>
        <button className="ml-2.5" onClick={whenclick}>
          <FaUserCircle size="32" className="text-white" />
        </button>
      </div>
      <Menu showmenu={showmenu} whenclick={whenclick} />
    </header>
  );
};
