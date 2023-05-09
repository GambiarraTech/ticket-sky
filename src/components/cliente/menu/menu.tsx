import style from '@/styles/cliente/menu.module.css';

import { useState } from 'react';
import { BiCreditCard } from 'react-icons/bi';
import { FaUser } from 'react-icons/fa';
import { IoLogOutOutline, IoTicket } from 'react-icons/io5';
import MeuPerfil from './MeuPerfil';

interface MenuDropDownProps {
  showModalMenu: boolean;
  whenClick: () => void;
}

export default function MenuDropDown({ showModalMenu, whenClick }: MenuDropDownProps) {
  const [showModalPerfil, setShowModalPerfil] = useState(false);

  const handleClick = () => {
    setShowModalPerfil(!setShowModalPerfil);
  };

  return (
    <>
      <MeuPerfil showModalPerfil={showModalPerfil} handleClick={handleClick} />
      {showModalMenu && (
        <div className={style.dropdown} onClick={() => setShowModalPerfil(true)}>
          <ul className={style.menu}>
            <span className={style.positionIcons}>
              <button className={style.button}>
                <FaUser size={24} className={style.icone} />
                Ver Perfil
              </button>
            </span>

            <span className={style.positionIcons}>
              <BiCreditCard size={24} className={style.icone} />
              <li>Cartão de Crédito</li>
            </span>

            <span className={style.positionIcons}>
              <IoTicket size={24} className={style.icone} />
              <li>Meus Ingressos</li>
            </span>

            <span className={style.positionIcons}>
              <IoLogOutOutline size={24} className={style.iconeLogout} />
              <li>Logout</li>
            </span>
          </ul>
        </div>
      )}
    </>
  );
}
