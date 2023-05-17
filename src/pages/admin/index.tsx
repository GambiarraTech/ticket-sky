import Card from '@/components/admin/Card';
import Layout from '@/components/admin/Layout';
import { AuthContext } from '@/contexts/AuthContext';
import { getServerSideProps } from '@/lib/auth';
import * as router from '@/pages/api/router';
import styles from '@/styles/admin/Admin.module.css';
import { useContext, useEffect, useState } from 'react'
import { IPromotersProps } from './promoters';

export default function Admin() {
  const { user, logout } = useContext(AuthContext);
  const [promotersNaoAprovados, setPromotersNaoAprovados] = useState<IPromotersProps[]>([]);

  function aprovarPromoter(id: number){
    router.apiPost({idPromoter: id, service: 'aprovarPromoter'}, 'promoter').then((data) =>{
        console.log(data)
    })
  }

  useEffect(() => {
    router
      .apiPost({ service: 'getPromotersAguardandoAprov' }, 'promoter')
      .then((data) => {
        const promotersData = data.promoters;
        setPromotersNaoAprovados(promotersData);
      })
      .catch((error) => {
        console.error('Erro ao obter os promoters:', error);
      });
  }, []);

  return (
    <Layout>
      <div className={styles.alignCard}>
        <Card
          label="Eventos em Destaque"
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque velit risus, pretium et tincidunt sed, scelerisque vel mauris. Etiam posuere lorem non nunc tempor, eu dapibus dolor porta. Fusce eu congue ipsum. Cras non pretium lorem. Praesent justo massa, condimentum eu enim id, vehicula porttitor metus."
        />
        <Card
          label="Promoters Aguardando Aprovação"
          content={promotersNaoAprovados.map((promoter) => (
            <div>
              {`Nome: ${promoter.nome} Email: ${promoter.email}, CPF/CNPJ: ${promoter.cpf_cnpj}`}
            <br />
            <button onClick={() => aprovarPromoter(promoter.id)}> aprovar</button>
            </div>
          ))}
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

export { getServerSideProps };
