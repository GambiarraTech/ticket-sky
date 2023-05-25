import style from '@/styles/IconMenuButton.module.css';
import { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';

type IconMenuButtonProps = {
  children: React.ReactNode;
  color: string;
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
        <FaUserCircle size="36" color={props.color} onClick={toggleMenu} cursor="pointer"></FaUserCircle>
        {/* Renderiza o menu apenas se o estado 'menuOpen' for verdadeiro */}
        {menuOpen && (
          <div className={style.menu}>
            <ul>{props.children}</ul>
          </div>
        )}
      </div>
    </>
  );
}