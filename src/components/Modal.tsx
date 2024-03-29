import styles from '@/styles/modal.module.css';
import { IoClose } from 'react-icons/io5';

/**
 * Propriedades do componente Modal.
 */
interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Componente para exibir um modal ou uma janela de sobreposição.
 */
export default function Modal(props: ModalProps) {
  return (
    <>
      {props.isOpen && (
        <div className={styles.modal}>
          <div onClick={props.onClose} className={styles.bgBlur} aria-hidden="true"></div>
          <div className={styles.modalBg}>
            <div className={styles.closeButtonPosition}>
              <button aria-label='Close' onClick={props.onClose} className={styles.closeButton}>
                <IoClose />
              </button>
            </div>
            {props.children}
          </div>
        </div>
      )}
    </>
  );
}
