import styles from '@/styles/customModal.module.css';
import { AiOutlineWarning } from 'react-icons/ai';
import { FaUserCircle } from 'react-icons/fa';
import { HiX } from 'react-icons/hi';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  haveClose: boolean;
  haveWarning: boolean;
  haveAvatar: boolean;
  title: string;
  children: React.ReactNode;
  leftButton?: React.ReactNode;
  rightButton?: React.ReactNode;
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
    /* Função de fechar o modal que pode ser usada em qualquer 'onClick' */
  }
  const closeModal = () => {
    onClose();
  };

  return (
    <>
      {isOpen && (
        <>
          {/* Div do background*/}
          <div className={styles.background} />

          {/* O componente modal em si */}
          <div className={styles.cardPos}>
            <div className={styles.cardBody}>
              <div className={styles.warningPos}>
                {!haveAvatar && haveWarning && (
                  <div className={styles.marginTop10}>
                    <AiOutlineWarning className={styles.warningStyle} />
                  </div>
                )}
              </div>

              {/* Cabeçalho do card, onde tem o avatar opcional, o título, e o botão de fechar */}
              <div className={`${styles.cardHeaderWithClose} ${!haveClose && styles.cardHeaderWithoutClose}`}>
                {/* O avatar é opcional pro caso de ser usado no 'meu perfil', daí nos parametros de quando o modal for chamado,
                você coloca o 'haveAvatar' como True */}

                {haveAvatar && (
                  <div className={styles.avatar}>
                    <FaUserCircle size={64} />
                  </div>
                )}

                {/* Título do card */}
                <div className={`${styles.titleDiv} ${!haveAvatar && styles.titleCenter}`}>
                  <h2 className={styles.titleStyle}>{title}</h2>
                </div>

                {/* Botão de fechar do modal */}
                {haveClose && (
                  <div className={styles.margin3}>
                    <button onClick={closeModal}>
                      <HiX className={styles.xButton} />
                    </button>
                  </div>
                )}
              </div>

              {/* O corpo do card onde vai o children e todo conteúdo do modal*/}
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
