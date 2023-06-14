import styles from '../styles/warningModal.module.css';
import CustomModal from './CustomModal';


interface AlertaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AlertaModal: React.FC<AlertaModalProps> = ({ isOpen, onClose }) => {
  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      haveWarning={true}
      haveAvatar={false}
      title="Aviso"
      haveClose={false}
      leftButton={<button aria-label='Não' className={styles.cancelButton}>Não</button>}
      rightButton={<button aria-label='Sim' className={styles.confirmButton}>Sim</button>}
    >
      <p className={styles.warningText}>Tem certeza que deseja continuar?</p>
    </CustomModal>
  );
};

export default AlertaModal;
