import style from '@/styles/IconMenuButton.module.css';
import { MenuButtons } from '@/types/components/menuButtons';
import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';

type IconMenuButtonProps = {
  menuButtons: MenuButtons[];
};

export default function IconMenuButton(props: IconMenuButtonProps) {
  // Estado para controlar a abertura e fechamento do menu
  const [menuOpen, setMenuOpen] = useState(false);

  // Função para alternar o estado do menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <div className={style.container}>
        {/* Ícone do usuário */}
        <FaUserCircle size="36" color="white" onClick={toggleMenu} cursor="pointer"></FaUserCircle>
        {/* Renderiza o menu apenas se o estado 'menuOpen' for verdadeiro */}
        {menuOpen && (
          <div className={style.menu}>
            <ul>
              {props.menuButtons.map((button) => (
                // A key serve para garantir que cada fragmento tenha uma chave exclusiva com base no input.id
                <React.Fragment key={button.id}>
                  <li>{button.text}</li>
                </React.Fragment>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
