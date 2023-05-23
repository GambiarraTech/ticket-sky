import style from '@/styles/IconMenuButton.module.css';
import { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';

export default function IconMenuButton() {
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
              <li>teste</li>
              <li>teste</li>
              <li>teste</li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
