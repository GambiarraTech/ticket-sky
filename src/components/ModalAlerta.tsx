import styles from '../styles/warningModal.module.css';
import CustomModal from './CustomModal';

/**
 * Propriedades do componente AlertaModal.
 */
interface AlertaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Componente para exibir um modal de aviso ou mensagem de confirmação.
 */
const AlertaModal: React.FC<AlertaModalProps> = ({ isOpen, onClose }) => {
  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      haveWarning={true}
      haveAvatar={false}
      title="Aviso"
      haveClose={false}
      leftButton={<button className={styles.cancelButton}>Não</button>}
      rightButton={<button className={styles.confirmButton}>Sim</button>}
    >
      <p className={styles.warningText}>Tem certeza que deseja continuar?</p>
    </CustomModal>
  );
};

export default AlertaModal;
