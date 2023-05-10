import styles from '@/styles/admin/footer.module.css';

export default function Footer({ bgcolor, color }: { bgcolor?: string; color?: string }) {
  return (
    <footer className={styles.footer} style={{ backgroundColor: `${bgcolor}` }}>
      <p style={{ color: `${color}` }}> &copy; 2023 Copyright: Gambiarra Tech</p>
    </footer>
  );
}
