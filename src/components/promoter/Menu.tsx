import Link from 'next/link';
import style from '../../styles/promoter/menu.module.css'

interface MenuProps {
  showmenu: Boolean;
  whenclick: () => void;
}

export default function Menu({ showmenu, whenclick }: MenuProps) {
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
          <Link
            href="#"
            className={style.item}
          >
            Sair
          </Link>
        </div>
      )}
    </>
  );
}
