import Layout from '@/components/admin/Layout';
import DataTable from '@/components/table/DataTable';

export interface IPromotersProps {
  id: number;
  nome: string;
  email: string;
  cpf_cnpj: string;
  telefone: string;
}

export default function Promoters() {
  const columns = ['Código', 'Nome', 'Email', 'CPF/CNPJ', 'Telefone'];
  const props = ['id', 'nome', 'email', 'cpf_cnpj', 'telefone'];
  const admins: IPromotersProps[] = [
    { id: 1, nome: 'Luana', email: 'luana@gmail.com', cpf_cnpj: '346.294.450-99', telefone: '(67)2891-6416' },
    { id: 2, nome: 'Davi', email: 'davi@gmail.com', cpf_cnpj: '40.539.857/0001-07', telefone: '(24)2698-8164' },
    { id: 3, nome: 'João', email: 'joao@gmail.com', cpf_cnpj: '147.002.320-21', telefone: '(69)2950-2624' },
    { id: 4, nome: 'Filipe', email: 'filipe@gmail.com', cpf_cnpj: '83.344.997/0001-24', telefone: '(49)3850-2311' },
    { id: 5, nome: 'Júlia', email: 'julia@gmail.com', cpf_cnpj: '627.642.030-12', telefone: '(64)3717-2328' },
    { id: 6, nome: 'Humberto', email: 'humberto@gmail.com', cpf_cnpj: '00.317.371/0001-00', telefone: '(27)3654-2876' },
    { id: 7, nome: 'Ribeiro', email: 'ribeiro@gmail.com', cpf_cnpj: '746.287.810-01', telefone: '(22)3727-4432' },
    { id: 8, nome: 'Israel', email: 'israel@gmail.com', cpf_cnpj: '90.701.784/0001-78', telefone: '(67)3840-3881' },
    { id: 9, nome: 'Thiago', email: 'thiago@gmail.com', cpf_cnpj: '596.041.960-22', telefone: '(98)3458-4699' },
    { id: 10, nome: 'Luan', email: 'luan@gmail.com', cpf_cnpj: '68.378.451/0001-09', telefone: '(79) 2114-4618' },
  ];
  return (
    <Layout>
      <DataTable title="Promoters" data={admins} columns={columns} props={props}></DataTable>
    </Layout>
  );
}
