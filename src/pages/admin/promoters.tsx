import Layout from '@/components/admin/Layout';
import DataTable from '@/components/table/DataTable';
import { getServerSideProps } from '@/lib/auth';
import * as router from '../api/router'
import { useEffect, useState } from 'react';

export interface IPromotersProps {
  id: number;
  nome: string;
  email: string;
  cpf_cnpj: string;
  telefone: string;
}

export default function Promoters() {
    const [promoters, setPromoters] = useState<IPromotersProps[]>([]);
    const [columns, setColumns] = useState<string[]>([]);
    const [props, setProps] = useState<string[]>([]);

    useEffect(() => {
      router.apiPost({ service: 'getPromoters' }, 'promoter')
        .then(data => {
          const promotersData = data.promoters;

          const dynamicColumns = promotersData.length > 0 ? Object.keys(promotersData[0]) : [];
          setColumns(dynamicColumns);

          const dynamicProps = dynamicColumns;
          setProps(dynamicProps);

          setPromoters(promotersData);
        })
        .catch(error => {
          console.error('Erro ao obter os promoters:', error);
        });

    }, []);


  return (
    <Layout>
      <DataTable title="Promoters" data={promoters} columns={columns} props={props}></DataTable>
    </Layout>
  );
}

export { getServerSideProps }
