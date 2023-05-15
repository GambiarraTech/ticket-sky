import Layout from '@/components/admin/Layout';
import DataTable from '@/components/table/DataTable';

export interface IAdminProps {
  id: number;
  nome: string;
  email: string;
  super_admin: number;
}

export default function Administradores() {
  const columns = ['Código', 'Nome', 'Email'];
  const props = ['id', 'nome', 'email'];
  const admins: IAdminProps[] = [
    { id: 1, nome: 'Luana', email: 'luana@gmail.com', super_admin: 1 },
    { id: 2, nome: 'Davi', email: 'davi@gmail.com', super_admin: 0 },
    { id: 3, nome: 'João', email: 'joao@gmail.com', super_admin: 0 },
    { id: 4, nome: 'Filipe', email: 'filipe@gmail.com', super_admin: 0 },
    { id: 5, nome: 'Júlia', email: 'julia@gmail.com', super_admin: 0 },
    { id: 6, nome: 'Humberto', email: 'humberto@gmail.com', super_admin: 0 },
    { id: 7, nome: 'Ribeiro', email: 'ribeiro@gmail.com', super_admin: 0 },
    { id: 8, nome: 'Israel', email: 'israel@gmail.com', super_admin: 0 },
    { id: 9, nome: 'Thiago', email: 'thiago@gmail.com', super_admin: 0 },
    { id: 10, nome: 'Luan', email: 'luan@gmail.com', super_admin: 0 },
  ];
  return (
    <Layout>
      <DataTable title="Administradores" data={admins} columns={columns} props={props}></DataTable>
    </Layout>
  );
}
