import Footer from '@/components/admin/Footer';
import Formulario from '@/components/admin/Formulario';
import styles from '@/styles/admin/loginAdmin.module.css';

export default function loginAdmin() {
  return (
    <main className={styles.bg}>
      <div className={styles.centro}>
        <Formulario />
      </div>
      <Footer />
    </main>
  );
}
