import Footer from '@/components/admin/Footer';
import TitleLogin from '@/components/admin/TitleLogin';
import styles from '@/styles/admin/loginAdmin.module.css';
import FormLogin from '../../components/admin/FormLogin';

export default function loginAdmin() {
  return (
    <main className={styles.background}>
      <div className={styles.container}>
        <TitleLogin />
        <FormLogin />
      </div>
      <Footer />
    </main>
  );
}
