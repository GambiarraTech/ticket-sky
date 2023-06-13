import Layout from '@/components/admin/Layout';
import DataTable from '@/components/table/DataTable';
import { getServerSideProps } from '@/lib/auth';
import { useEffect, useState } from 'react';
import * as router from '../api/router';

export interface IPromotersProps {
  id: number;
  nome: string;
  email: string;
  cpf_cnpj: string;
}

/**
 * Página de exibição de promotores.
 */
export default function Promoters() {
  const [promoters, setPromoters] = useState<IPromotersProps[]>([]);
  const columns = ['Código', 'Nome', 'Email', 'CPF/CNPJ'];
  const props = ['id', 'nome', 'email', 'cpf_cnpj'];

  useEffect(() => {
    router
      .apiPost({ service: 'getPromoters' }, 'promoter')
      .then((data) => {
        const promotersData = data.promoters;

        setPromoters(promotersData);
      })
      .catch((error) => {
        console.error('Erro ao obter os promoters:', error);
      });
  }, []);

  return (
    <Layout>
      <DataTable title="Promoters" data={promoters} columns={columns} props={props}></DataTable>
    </Layout>
  );
}

// Exporta a função getServerSideProps para ações de servidor
export { getServerSideProps };
