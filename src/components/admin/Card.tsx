/**
 * @component Card
 * @description Componente de cartão usado na interface de administrador.
 * @param label - Rótulo do cartão.
 * @param content - Conteúdo do cartão.
 * @returns {JSX.Element} Elemento JSX representando o cartão.
 */
import styles from '@/styles/admin/Card.module.css';
export default function Card({ label, content }: { label: string; content: any }) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>{label}</div>
      <div className={styles.body}>{content}</div>
    </div>
  );
}
