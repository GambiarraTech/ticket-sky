import CardAprovarPromoter from '@/components/admin/CardAprovarPromoter';
import CardEventosAlta from '@/components/admin/CardEventosAlta';
import Layout from '@/components/admin/Layout';
import { getServerSideProps } from '@/lib/auth';
import styles from '@/styles/admin/Admin.module.css';

/**
 * Página "Admin" que exibe os componentes de cartão relacionados às funcionalidades de administração.
 */
export default function Admin() {
  return (
    <Layout>
      <div className={styles.alignCard}>
        <CardEventosAlta />
        <CardAprovarPromoter />
      </div>
    </Layout>
  );
}

export { getServerSideProps };
