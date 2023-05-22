import { AiOutlineWarning } from 'react-icons/ai';
import { FaUserCircle } from 'react-icons/fa';
import { HiX } from 'react-icons/hi';
import styles from '../styles/customModal.module.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  haveClose: boolean;
  haveWarning: boolean;
  haveAvatar: boolean;
  title: string;
  children: React.ReactNode;
  leftButton?: React.ReactNode;
  rightButton: React.ReactNode;
}

export default function CustomModal({
  isOpen,
  onClose,
  haveClose,
  haveAvatar,
  haveWarning,
  title,
  children,
  leftButton,
  rightButton,
}: ModalProps) {
  {
    /* A FUNÇÃO DE FECHAR O MODAL QUE PODE SER USADA EM QUALQUER 'onClick' */
  }
  const closeModal = () => {
    onClose();
  };

  return (
    <>
      {isOpen && (
        <>
          {/* A DIV DO BACKGROUND*/}
          <div className={styles.background} />

          {/* O MODAL EM SI */}
          <div className={styles.cardPos}>
            <div className={styles.cardBody}>
              <div className={styles.warningPos}>
                {!haveAvatar && haveWarning && (
                  <div className={styles.marginTop10}>
                    <AiOutlineWarning className={styles.warningStyle} />
                  </div>
                )}
              </div>

              {/* CABEÇALHO DO CARD, ONDE TEM O AVATAR OPCIONAL, O TÍTULO, E O BOTÃO DE FECHAR */}
              <div className={`${styles.cardHeaderWithClose} ${!haveClose && styles.cardHeaderWithoutClose}`}>
                {/* O AVATAR É OPCIONAL PRO CASO DE SER USADO NO 'MEU PERFIL', DAÍ NOS PARAMETROS DE QUANDO O MODAL FOR CHAMADO, 
                VOCÊ COLOCA O 'haveAvatar' COMO TRUE */}

                {haveAvatar && (
                  <div className={styles.avatar}>
                    <FaUserCircle size={64} />
                  </div>
                )}

                {/* O TITULO DO CARD */}
                <div className={`${styles.titleDiv} ${!haveAvatar && styles.titleCenter}`}>
                  <h2 className={styles.titleStyle}>{title}</h2>
                </div>

                {/* O BOTÃO DE FECHAR O MODAL */}
                {haveClose && (
                  <div className={styles.margin3}>
                    <button onClick={closeModal}>
                      <HiX className={styles.xButton} />
                    </button>
                  </div>
                )}
              </div>

              {/* O CORPO DO CARD ONDE VAI O CHIDREN E TUDO QUE VOCÊ QUISER COLOCAR */}
              <div className={styles.padding4}>{children}</div>
              {leftButton || rightButton ? (
                <div className={styles.buttonDiv}>
                  {leftButton && <div>{leftButton}</div>}
                  {!leftButton && <div className={styles.rightButtonCenter}>{rightButton}</div>}
                  {rightButton && leftButton && <div className={styles.rightButtonCenter}>{rightButton}</div>}
                </div>
              ) : null}
            </div>
          </div>
        </>
      )}
    </>
  );
}
