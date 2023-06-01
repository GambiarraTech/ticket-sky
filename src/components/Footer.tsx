import styles from '@/styles/footer.module.css';

interface FooterProps {
  color: string;
}

export default function Footer(props: FooterProps) {
  return (
    <>
      <div className={props.color == 'blue' ? styles.footerBlue : styles.footerWhite}>
        <p className={styles.text}> © 2023 Copyright: Gambiarra Tech </p>
      </div>
    </>
  );
}
