import style from '@/styles/cliente/login.module.css';
import { IoClose } from 'react-icons/io5';

interface MeuPerfilProps {
  showModalPerfil: boolean;
  handleClick: () => void;
}

export default function MeuPerfil({ showModalPerfil, handleClick }: MeuPerfilProps) {
  return (
    <>
      {showModalPerfil && (
        <div className={style.modal}>
          <div onClick={handleClick} className={style.bgBlur} aria-hidden="true"></div>
          <div className={style.modalBg}>
            <div className={style.closeButtonPosition}>
              <button onClick={handleClick} className={style.closeButton}>
                <span className={style.hideFechar}>Fechar</span>
                <IoClose />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
