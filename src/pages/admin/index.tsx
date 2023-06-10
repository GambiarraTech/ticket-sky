import Card from '@/components/admin/Card';
import CardAprovarPromoter from '@/components/admin/CardAprovarPromoter';
import Layout from '@/components/admin/Layout';
import { getServerSideProps } from '@/lib/auth';
import * as router from '@/pages/api/router';
import styles from '@/styles/admin/Admin.module.css';
import { useEffect, useState } from 'react';
import { IPromotersProps } from './promoters';

export default function Admin() {
  const [promotersNaoAprovados, setPromotersNaoAprovados] = useState<IPromotersProps[]>([]);

  function getPromoter() {
    router
      .apiPost({ service: 'getPromotersAguardandoAprov' }, 'promoter')
      .then((data) => {
        const promotersData = data.promoters;
        setPromotersNaoAprovados(promotersData);
      })
      .catch((error) => {
        console.error('Erro ao obter os promoters:', error);
      });
  }

  useEffect(() => {
    getPromoter();
  }, []);

  return (
    <Layout>
      <div className={styles.alignCard}>
        <Card
          label="Eventos em Destaque"
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque velit risus, pretium et tincidunt sed, scelerisque vel mauris. Etiam posuere lorem non nunc tempor, eu dapibus dolor porta. Fusce eu congue ipsum. Cras non pretium lorem. Praesent justo massa, condimentum eu enim id, vehicula porttitor metus."
        />
        <CardAprovarPromoter />
      </div>
    </Layout>
  );
}

export { getServerSideProps };
