import Link from 'next/link';
import style from '../../styles/promoter/menu.module.css'
import { AuthContext } from '@/contexts/AuthContext';
import { useContext } from 'react';

interface MenuProps {
  showmenu: Boolean;
  whenclick: () => void;
}

export default function Menu({ showmenu, whenclick }: MenuProps) {
    const { logout } = useContext(AuthContext);
  return (
    <>
      {showmenu && (
        <div className={style.menu}>
          <div
            onClick={whenclick}
            className={style.menuTitulo}
          >
            Menu
          </div>

          <hr className={style.divisao} />

          <Link
            href="#"
            className={style.item}
          >
            Ver perfil
          </Link>
          <hr className={style.divisao} />
          <Link
            href="/promoter/criarEvento"
            className={style.item}
          >
            Criar eventos
          </Link>

          <hr className={style.divisao}/>

          <Link
            href="#"
            className={style.item}
          >
            Meus eventos
          </Link>
          <hr className={style.divisao}/>
          <li
            onClick={logout}
            className={style.item}
          >
            Sair
          </li>
        </div>
      )}
    </>
  );
}
