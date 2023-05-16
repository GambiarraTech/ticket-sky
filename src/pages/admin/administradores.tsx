import Layout from '@/components/admin/Layout';
import DataTable from '@/components/table/DataTable';
import { getServerSideProps } from '@/lib/auth';
import { useEffect, useState } from 'react';
import * as router from '../api/router'

export interface IAdminProps {
  id: number;
  nome: string;
  email: string;
  super_admin: number;
}

export default function Administradores() {
    const [admins, setAdmins] = useState<IAdminProps[]>([]);
    const [columns, setColumns] = useState<string[]>([]);
    const [props, setProps] = useState<string[]>([]);

    useEffect(() => {
      router.apiPost({ service: 'getAdmins' }, 'admin')
        .then(data => {
          const adminsData = data.admins;

          const dynamicColumns = adminsData.length > 0 ? Object.keys(adminsData[0]) : [];
          setColumns(dynamicColumns);

          const dynamicProps = dynamicColumns;
          setProps(dynamicProps);

          setAdmins(adminsData);
        })
        .catch(error => {
          console.error('Erro ao obter os administradores:', error);
        });

    }, []);
  return (
    <Layout>
      <DataTable title="Administradores" data={admins} columns={columns} props={props}></DataTable>
    </Layout>
  );
}

export { getServerSideProps }
