import Layout from '@/components/admin/Layout';
import DataTable from '@/components/table/DataTable';
import { getServerSideProps } from '@/lib/auth';
import { useEffect, useState } from 'react';
import * as router from '../api/router';

/**
 * Interface que define a estrutura de um administrador.
 */
export interface IAdminProps {
  id: number;
  nome: string;
  email: string;
  super_adm: number;
}

/**
 * Página "Administradores" que exibe uma tabela com a lista de administradores.
 */
export default function Administradores() {
  const [admins, setAdmins] = useState<IAdminProps[]>([]);
  const columns = ['Código', 'Nome', 'Email'];
  const props = ['id', 'nome', 'email'];

  const handleUpdateData = () => {
    fetchData(); // Atualiza os dados da tabela
  };

  const fetchData = () => {
    router
      .apiPost({ service: 'getAdmins' }, 'admin')
      .then((data) => {
        const adminsData = data.admins;
        setAdmins(adminsData);
      })
      .catch((error) => {
        console.error('Erro ao obter os administradores:', error);
      });
  }
  useEffect(() => {
    router
      .apiPost({ service: 'getAdmins' }, 'admin')
      .then((data) => {
        const adminsData = data.admins;
        setAdmins(adminsData);
      })
      .catch((error) => {
        console.error('Erro ao obter os administradores:', error);
      });
  }, []);

  return (
    <Layout>
      <DataTable title="Administradores" data={admins} columns={columns} props={props} endpoint='admin' updateData={handleUpdateData}></DataTable>
    </Layout>
  );
}

export { getServerSideProps };

