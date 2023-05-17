import Link from 'next/link';
import { useContext, useState } from 'react';

import style from '@/styles/cliente/menu.module.css';
import CartaoCredito from './cartaoCredito';
import MeuPerfil from './meuPerfil';

import { AuthContext } from '@/contexts/AuthContext';
import { BiCreditCard } from 'react-icons/bi';
import { FaUser } from 'react-icons/fa';
import { IoLogOutOutline, IoTicket } from 'react-icons/io5';

interface MenuButton {
  label: string | JSX.Element; // Nome do botão no menu
  icon: JSX.Element; // Ícone do botão
  type: 'modal' | 'link'; // Tipo do botão
  component: JSX.Element;
}

interface MenuDropDownProps {
  showModalMenu: boolean;
  whenClick: () => void; // Para verificar se clicou no botão de perfil (vem da navbar)
}

export default function MenuDropDown({ showModalMenu, whenClick }: MenuDropDownProps) {
  const [activeModal, setActiveModal] = useState<JSX.Element | null>(null);
  const { user, logout } = useContext(AuthContext);

  const handleClick = (component: JSX.Element) => {
    console.log(component);
    setActiveModal(component);
  };

  const handleClose = () => {
    setActiveModal(null);
  };

  const menuButtons: MenuButton[] = [
    {
      label: 'Ver Perfil',
      icon: <FaUser size={24} className={style.icone} />,
      type: 'modal',
      component: <MeuPerfil handleClick={handleClick} handleClose={handleClose} />,
    },
    {
      label: 'Cartão de crédito',
      icon: <BiCreditCard size={24} className={style.icone} />,
      type: 'modal',
      component: <CartaoCredito handleClick={handleClick} handleClose={handleClose} />,
    },
    {
      label: <Link href="/cliente/meusIngressos">Meus Ingressos</Link>,
      icon: <IoTicket size={24} className={style.icone} />,
      type: 'link',
      component: <Link href="/cliente/meusIngressos"></Link>, //IGNORAR ESSA MERDA
    },
  ];

  return (
    <>
      {showModalMenu && (
        <div className={style.dropdown}>
          <ul>
            {menuButtons.map((button, key) => (
              <li key={key} className={style.button} onClick={() => handleClick(button.component)}>
                {button.icon}
                {button.label}
              </li>
            ))}
            <li className={style.button} onClick={logout}>
              <IoLogOutOutline size={24} className={style.iconeLogout} />
              Logout
            </li>
          </ul>
        </div>
      )}
      {activeModal && (
        <div onClick={handleClose}>
          <div onClick={(e) => e.stopPropagation()}>{activeModal}</div>
        </div>
      )}
    </>
  );
}
