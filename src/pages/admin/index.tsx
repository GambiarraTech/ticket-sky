import Card from '@/components/admin/Card';
import { AuthContext } from '@/contexts/AuthContext';
import { useContext } from 'react';
import styles from '@/styles/admin/Admin.module.css';
import Layout from '@/components/admin/Layout';

export default function Admin() {
  const { user, logout, autenticar } = useContext(AuthContext);

  autenticar('/admin/login');

  return (
    <Layout>
      <div className={styles.alignCard}>
        <Card
          label="Eventos em Destaque"
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque velit risus, pretium et tincidunt sed, scelerisque vel mauris. Etiam posuere lorem non nunc tempor, eu dapibus dolor porta. Fusce eu congue ipsum. Cras non pretium lorem. Praesent justo massa, condimentum eu enim id, vehicula porttitor metus."
        />
        <Card
          label="Promoters Aguardando Aprovação"
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque velit risus, pretium et tincidunt sed, scelerisque vel mauris. Etiam posuere lorem non nunc tempor, eu dapibus dolor porta. Fusce eu congue ipsum. Cras non pretium lorem. Praesent justo massa, condimentum eu enim id, vehicula porttitor metus."
        />
        <Card
          label="Lorem Ipsum"
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque velit risus, pretium et tincidunt sed, scelerisque vel mauris. Etiam posuere lorem non nunc tempor, eu dapibus dolor porta. Fusce eu congue ipsum. Cras non pretium lorem. Praesent justo massa, condimentum eu enim id, vehicula porttitor metus."
        />
        <Card
          label="Lorem Ipsum"
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque velit risus, pretium et tincidunt sed, scelerisque vel mauris. Etiam posuere lorem non nunc tempor, eu dapibus dolor porta. Fusce eu congue ipsum. Cras non pretium lorem. Praesent justo massa, condimentum eu enim id, vehicula porttitor metus."
        />
        <Card
          label="Lorem Ipsum"
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque velit risus, pretium et tincidunt sed, scelerisque vel mauris. Etiam posuere lorem non nunc tempor, eu dapibus dolor porta. Fusce eu congue ipsum. Cras non pretium lorem. Praesent justo massa, condimentum eu enim id, vehicula porttitor metus."
        />
        <button onClick={logout}> deslogar </button>
      </div>
    </Layout>
  );
}
